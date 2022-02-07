import { Request, Response, NextFunction } from 'express';
import Auth from '../class/Auth';
import UserRequestError from '../class/Error/UserRequestError';
import errorPageRenderer from '../controller/error';

const loginChecker = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { loginToken } = req.cookies;

  try {
    const auth = new Auth(loginToken);

    await auth.createLoginCheckerMiddleware();

    next();
  } catch (e: unknown) {
    if (e instanceof UserRequestError) {
      errorPageRenderer(res, e.HTTPErrorStatus, e.message + e.hint);

      return;
    }

    res.sendStatus(500);
  }
};

export default loginChecker;
