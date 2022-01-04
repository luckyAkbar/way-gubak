import dotenv from 'dotenv';
dotenv.config();

import { Request, Response } from 'express';
import AsetDesa from '../../interface/pageRenderingData/asetDesa';

const asetDesaController = (req: Request, res: Response): void => {
  const asetDesa: AsetDesa = {
    villageName: process.env.VILLAGE_NAME,
    districtName: process.env.DISTRICT_NAME,
    copyrightYear: process.env.COPYRIGHT_YEAR,
    provinceName: process.env.PROVINCE_NAME,
    phoneContact: process.env.PHONE_CONTACT,
    villageEmailAddress: process.env.VILLAGE_EMAIL_ADDRESS,
    postalCode: process.env.POSTAL_CODE,
  };

  res.render('pages/aset-desa', asetDesa);
};

export default asetDesaController;
