import { Request, Response } from 'express';
import Dashboard from '../../class/Dashboard';
import UserRequestError from '../../class/Error/UserRequestError';

const updateAgenda = async (req: Request, res: Response): Promise<void> => {
  const { title, date, time, location, agendaID } = req.body;

  try {
    const dashboard = new Dashboard(1);
    await dashboard.updateAgenda(agendaID, title, date, time, location);

    res.sendStatus(202);

    return;
  } catch (e: unknown) {
    if (e instanceof UserRequestError) {
      res.status(e.HTTPErrorStatus).json({ message: e.message + e.hint });
      return;
    }

    res.sendStatus(500);
  }
};

export default updateAgenda;
