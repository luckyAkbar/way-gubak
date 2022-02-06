import { Request, Response } from 'express';
import Dashboard from '../../class/Dashboard';

const deleteBerita = async(req: Request, res: Response): Promise<void> => {
  const { beritaID } = req.body;
  const dashboard = new Dashboard(1);

  try {
    await dashboard.deleteBerita(String(beritaID));

    res.sendStatus(204);
  } catch (e: unknown) {
    res.sendStatus(404);
  }
};

export default deleteBerita;
