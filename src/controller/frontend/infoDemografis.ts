import dotenv from 'dotenv';

import { Request, Response } from 'express';
import BasicPage from '../../class/BasicPage';
import InfoDemografis from '../../interface/pageRenderingData/infoDemografis';

dotenv.config();

const infoDemografisController = async (req: Request, res: Response): Promise<void> => {
  const infoDemografis: InfoDemografis = {
    villageName: process.env.VILLAGE_NAME,
    districtName: process.env.DISTRICT_NAME,
    copyrightYear: process.env.COPYRIGHT_YEAR,
    provinceName: process.env.PROVINCE_NAME,
    phoneContact: process.env.PHONE_CONTACT,
    villageEmailAddress: process.env.VILLAGE_EMAIL_ADDRESS,
    postalCode: process.env.POSTAL_CODE,
    footerLinks: await BasicPage.getFooterLinks(),
  };

  res.render('pages/info-demografis', infoDemografis);
};

export default infoDemografisController;
