import { Request, Response } from 'express';
import Dashboard from '../../class/Dashboard';
import UserRequestError from '../../class/Error/UserRequestError';

const updateBerita = async (req: Request, res: Response): Promise<void> => {
  const { title, content, filename, beritaID } = req.body;
  const dashboard = new Dashboard(1);

  try {
    await dashboard.updateBerita(beritaID, title, content, filename);

    res.sendStatus(202);
  } catch (e: unknown) {
    if (e instanceof UserRequestError) {
      res.status(e.HTTPErrorStatus).json({ message: e.message + e.hint });
      return;
    }

    res.sendStatus(500);
  }
};

export default updateBerita;
