import dotenv from 'dotenv';

import { Request, Response } from 'express';
import BasicPage from '../../class/BasicPage';
import InfoGeografis from '../../interface/pageRenderingData/infoGeografis';

dotenv.config();

const infoGeografisController = async (req: Request, res: Response): Promise<void> => {
  const infoGeografis: InfoGeografis = {
    villageName: process.env.VILLAGE_NAME,
    districtName: process.env.DISTRICT_NAME,
    copyrightYear: process.env.COPYRIGHT_YEAR,
    provinceName: process.env.PROVINCE_NAME,
    phoneContact: process.env.PHONE_CONTACT,
    villageEmailAddress: process.env.VILLAGE_EMAIL_ADDRESS,
    postalCode: process.env.POSTAL_CODE,
    footerLinks: await BasicPage.getFooterLinks(),
  };

  res.render('pages/info-geografis', infoGeografis);
};

export default infoGeografisController;
