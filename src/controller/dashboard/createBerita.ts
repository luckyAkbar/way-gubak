import { Request, Response } from 'express';
import Dashboard from '../../class/Dashboard';
import UserRequestError from '../../class/Error/UserRequestError';

const createBerita = async (req: Request, res: Response): Promise<void> => {
  const { title, content, filename } = req.body;
  const dashboard = new Dashboard(1);

  try {
    await dashboard.createNewBerita(title, content, filename);

    res.sendStatus(201);
  } catch (e: unknown) {
    if (e instanceof UserRequestError) {
      res.status(e.HTTPErrorStatus).json({ message: e.message + e.hint });

      return;
    }

    res.sendStatus(500);
  }
};

export default createBerita;
