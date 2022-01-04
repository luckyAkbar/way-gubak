import dotenv from 'dotenv';
dotenv.config();

import { Request, Response } from 'express';
import InfoGeografis from '../../interface/pageRenderingData/infoGeografis';

const infoGeografisController = (req: Request, res: Response): void => {
  const infoGeografis: InfoGeografis = {
    villageName: process.env.VILLAGE_NAME,
    districtName: process.env.DISTRICT_NAME,
    copyrightYear: process.env.COPYRIGHT_YEAR,
  };

  res.render('pages/info-geografis', infoGeografis);
};

export default infoGeografisController;
