import { Request, Response } from 'express';
import dotenv from 'dotenv';
import UserRequestError from '../class/Error/UserRequestError';
import LoginHandler from '../class/LoginHandler';
import errorPageRenderer from './error';

dotenv.config();

const loginHandler = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  try {
    const login = new LoginHandler(username, password);

    await login.validateCredentials();

    const loginToken = await login.createLoginToken();

    res.status(200).cookie('loginToken', loginToken, {
      maxAge: Number(process.env.SESSION_EXPIRED_MS),
    }).redirect('/dashboard');
  } catch (e: unknown) {
    if (e instanceof UserRequestError) {
      errorPageRenderer(res, e.HTTPErrorStatus, e.message + e.hint);
      return;
    }

    res.sendStatus(500);
  }
};

export default loginHandler;
