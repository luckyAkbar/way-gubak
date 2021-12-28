import dotenv from 'dotenv';
dotenv.config();

import { Request, Response } from 'express';
import AgendaPageData from '../interface/pageRenderingData/agenda';

const agendaController = (req: Request, res: Response): void => {
  const agendaPageData: AgendaPageData = {
    villageName: process.env.VILLAGE_NAME,
    districtName: process.env.DISTRICT_NAME,
    copyrightYear: process.env.COPYRIGTH_YEAR,
  };

  res.render('pages/agenda', agendaPageData);
};

export default agendaController;
