import { Request, Response } from 'express';
import Dashboard from '../../class/Dashboard';
import UpdateAgenda from '../../interface/pageResource/dashboard/agenda/updateAgenda';
import errorPageRenderer from '../error';

const updateAgenda = async (req: Request, res: Response): Promise<void> => {
  const { agendaID } = req.query;

  try {
    const agenda = await Dashboard.getAgendaFromAgendaID(String(agendaID));
    const updateAgendaPageData: UpdateAgenda = {
      agenda,
    };

    res.render('pages/dashboard/agenda/update-agenda', updateAgendaPageData);

  } catch (e: unknown) {
    errorPageRenderer(res, 500, (e as Error).message)
  }
};

export default updateAgenda;
