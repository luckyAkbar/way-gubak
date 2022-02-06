import { Request, Response } from "express";
import Dashboard from '../../class/Dashboard';
import AgendaPageData from "../../interface/pageResource/dashboard/agenda/agendaPageData";
import errorPageRenderer from "../error";

const getAgenda = async (req: Request, res: Response): Promise<void> => {
  try {
    const listAgenda = await Dashboard.getAgenda();
    const agendaPageData: AgendaPageData = {
      listAgenda,
    };

    res.render('pages/dashboard/agenda/index', agendaPageData);
  } catch (e: unknown) {
    errorPageRenderer(res, 500, 'Internal ServerError');
  }
};

export default getAgenda;
