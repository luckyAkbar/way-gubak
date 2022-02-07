import User from "../models/user";
import Auth from "./Auth";
import UserRequestError from "./Error/UserRequestError";
import CustomError from './Error/CustomError';
import Validator from "./Validator";
import Session from "../models/session";

export default class LoginHandler {
  username: string;
  password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;

    this.validate();
  }

  validate() {
    Validator.isValidEmailAddres(this.username);
    if (this.password.length < 8) throw new Error();
  }

  async validateCredentials() {
    try {
      const user = await User.findOne({ username: this.username });
      await Auth.verifyHash(this.password, user.password);
    } catch (e: unknown) {
      throw new UserRequestError('Credentials mismatch', ' Try again', 403);
    }
  }

  async createLoginToken(): Promise<string> {
    try {
      const res = await this.registerNewSession();
      const loginToken = await Auth.createLoginToken(res.sessionID);

      return loginToken;
    } catch (e: unknown) {
      const err = new CustomError('System failed to create login token', '');
      await err.logError();

      throw err;
    }
  }

  async registerNewSession(): Promise<any> {
    try {
      const session = new Session({
        userID: await this.getUserID(),
      });

      return await session.save();
    } catch (e: unknown) {
      const err = new CustomError('System failed to register new session');
      await err.logError();

      throw err;
    }
  }

  async getUserID(): Promise<string> {
    try {
      const user = await User.findOne({ username: this.username });

      return user.id;
    } catch (e: unknown) {
      const err = new CustomError('System failed to create hash', 'Maybe hash_round env not defined');
      await err.logError();

      throw err;
    }
  }
}