import { Request, Response } from 'express';

const loginPageRenderer = (req: Request, res: Response): void => {
  res.render('pages/login');
};

export default loginPageRenderer;
