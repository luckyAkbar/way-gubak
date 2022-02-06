import { Request, Response } from 'express';
import Dashboard from '../../class/Dashboard';
import UserRequestError from '../../class/Error/UserRequestError';

const deleteAgenda = async (req: Request, res: Response): Promise<void> => {
  const { agendaID } = req.body;

  try {
    const dashboard = new Dashboard(1);

    await dashboard.deleteAgenda(agendaID);
    res.sendStatus(204);
  } catch (e: unknown) {
    if (e instanceof UserRequestError) {
      res.status(e.HTTPErrorStatus).json({ message: e.message + e.hint });
      return;
    }

    res.status(500).json({ message: (e as Error).message });
  }
};

export default deleteAgenda;
