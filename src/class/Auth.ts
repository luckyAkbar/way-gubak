import { strict as assert } from 'assert';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import CustomError from './Error/CustomError';
import UserRequestError from './Error/UserRequestError';
import Session from '../models/session';
import LoginTokenPayload from '../interface/loginTokenPayload';
import UserSession from '../interface/userSession';

dotenv.config();

export default class Auth {
  loginToken: string;
  JWTSecretToken: string;

  constructor(loginToken: string) {
    this.loginToken = loginToken;
    this.JWTSecretToken = process.env.SECRET_JWT_TOKEN!; 
    
    assert.notStrictEqual(this.loginToken, undefined, new UserRequestError('You are not logged in. ', 'Please login first', 403));
  }

  getJWTTokenPayload(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const result = jwt.verify(this.loginToken, this.JWTSecretToken, {
          complete: true,
        });
        
        resolve(result.payload);
      } catch (e: unknown) {
        reject('Login token invalid');
      }
    });
  }

  async getPayloadFromLoginToken<T>(): Promise<T> {
    try {
      const payload: T = await this.getJWTTokenPayload();

      if (payload === undefined) throw new Error();
      
      return payload;
    } catch (e: unknown) {
      throw new UserRequestError('Your token is invalid.', 'Please try again using valid token.');
    }
  }

  async getSessionIDFromTokenPayload(): Promise<string> {
    try {
      const { sessionID } = await this.getPayloadFromLoginToken<LoginTokenPayload>();

      return sessionID;
    } catch (e: unknown) {
      throw new UserRequestError('Your token is invalid.', 'Please try again using valid token.'); 
    }
  }

  async getSessionInfo(): Promise<UserSession> {
    try {
      const sessionID = await this.getSessionIDFromTokenPayload();
      const sessionInfo = await Session.findOne({ sessionID });
      
      if (sessionInfo === null) throw new Error();

      return sessionInfo;
    } catch (e: unknown) {
      throw new UserRequestError('Your session is invalid.', 'Please try again or try to login'); 
    }
  }

  async createLoginCheckerMiddleware(): Promise<void> {
    try {
      const { expiredAt } = await this.getSessionInfo();
      const now = new Date();

      if (expiredAt < now) throw new UserRequestError('Your session is expired ', 'Please login first');
    } catch (e: unknown) {
      throw e;
    }
  }

  static async hash(text: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt(Number(process.env.HASH_ROUND));
      const hashed = await bcrypt.hash(text, salt);

      return hashed;
    } catch (e: unknown) {
      const err = new CustomError('System failed to create hash', 'Maybe hash_round env not defined');
      await err.logError();

      throw err;
    }
  }

  static async verifyHash(text: string, hashed: string): Promise<void> {
    const result = await bcrypt.compare(text, hashed);
    assert.notStrictEqual(result, false);
  }

  static createLoginToken(sessionID: string): string {
    return jwt.sign({
      sessionID,
    }, String(process.env.SECRET_JWT_TOKEN), {
      expiresIn: Number(process.env.SESSION_EXPIRED_MS) / 1000,
    });
  }
}