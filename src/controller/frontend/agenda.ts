import dotenv from 'dotenv';

import { Request, Response } from 'express';
import BasicPage from '../../class/BasicPage';
import AgendaPageData from '../../interface/pageRenderingData/agenda';

dotenv.config();

const agendaController = async (req: Request, res: Response): Promise<void> => {
  const agendaPageData: AgendaPageData = {
    villageName: process.env.VILLAGE_NAME,
    districtName: process.env.DISTRICT_NAME,
    copyrightYear: process.env.COPYRIGHT_YEAR,
    provinceName: process.env.PROVINCE_NAME,
    phoneContact: process.env.PHONE_CONTACT,
    villageEmailAddress: process.env.VILLAGE_EMAIL_ADDRESS,
    postalCode: process.env.POSTAL_CODE,
    footerLinks: await BasicPage.getFooterLinks(),
  };

  res.render('pages/agenda', agendaPageData);
};

export default agendaController;
