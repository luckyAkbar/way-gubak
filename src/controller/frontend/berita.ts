import dotenv from 'dotenv';

import { Request, Response } from 'express';
import BasicPage from '../../class/BasicPage';
import Berita from '../../interface/pageRenderingData/berita';

dotenv.config();

const beritaController = async (req: Request, res: Response): Promise<void> => {
  const berita: Berita = {
    villageName: process.env.VILLAGE_NAME,
    districtName: process.env.DISTRICT_NAME,
    copyrightYear: process.env.COPYRIGHT_YEAR,
    provinceName: process.env.PROVINCE_NAME,
    phoneContact: process.env.PHONE_CONTACT,
    villageEmailAddress: process.env.VILLAGE_EMAIL_ADDRESS,
    postalCode: process.env.POSTAL_CODE,
    footerLinks: await BasicPage.getFooterLinks(),
    navbarItems: await BasicPage.getNavbarItems(),
    activateMainNavbar: 'Informasi',
    sideNavItems: await BasicPage.getInfoSideNavItems(),
    activateSideNav: 'Berita',
  };

  res.render('pages/berita', berita);
};

export default beritaController;
