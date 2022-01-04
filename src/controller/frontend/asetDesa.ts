import dotenv from 'dotenv';
dotenv.config();

import { Request, Response } from 'express';
import AsetDesa from '../../interface/pageRenderingData/asetDesa';

const asetDesaController = (req: Request, res: Response): void => {
  const asetDesa: AsetDesa = {
    villageName: process.env.VILLAGE_NAME,
    districtName: process.env.DISTRICT_NAME,
    copyrightYear: process.env.COPYRIGHT_YEAR,
  };

  res.render('pages/aset-desa', asetDesa);
};

export default asetDesaController;
