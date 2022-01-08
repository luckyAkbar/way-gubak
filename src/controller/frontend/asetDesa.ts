import dotenv from 'dotenv';

import { Request, Response } from 'express';
import BasicPage from '../../class/BasicPage';
import AsetDesa from '../../interface/pageRenderingData/asetDesa';

dotenv.config();

const asetDesaController = async (req: Request, res: Response): Promise<void> => {
  const asetDesa: AsetDesa = {
    villageName: process.env.VILLAGE_NAME,
    districtName: process.env.DISTRICT_NAME,
    copyrightYear: process.env.COPYRIGHT_YEAR,
    provinceName: process.env.PROVINCE_NAME,
    phoneContact: process.env.PHONE_CONTACT,
    villageEmailAddress: process.env.VILLAGE_EMAIL_ADDRESS,
    postalCode: process.env.POSTAL_CODE,
    footerLinks: await BasicPage.getFooterLinks(),
    navbarItems: await BasicPage.getNavbarItems(),
    activateMainNavbar: 'Aset',
    sideNavItems: await BasicPage.getAsetSideNavItems(),
    activateSideNav: 'Aset Desa',
  };

  res.render('pages/aset-desa', asetDesa);
};

export default asetDesaController;
