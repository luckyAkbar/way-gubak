import { Request, Response } from 'express';
import mongoSanitizer from 'mongo-sanitize';
import Dashboard from '../../class/Dashboard';
import UserRequestError from '../../class/Error/UserRequestError';

const createAgenda = async (req: Request, res: Response) => {
  const { title, date, time, location } = mongoSanitizer(req.body);
  const dashboard = new Dashboard(1);

  try {
    await dashboard.createAgenda(title, date, time, location);

    res.status(201).json({ message: `Agenda: ${title} successfully created` });
  } catch (e: unknown) {
    res.status((e as UserRequestError).HTTPErrorStatus).json({
      message: (e as UserRequestError).message + (e as UserRequestError).hint
    });
  }
};

export default createAgenda;
