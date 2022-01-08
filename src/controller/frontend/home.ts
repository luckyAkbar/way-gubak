import dotenv from 'dotenv';

import { Request, Response } from 'express';
import BasicPage from '../../class/BasicPage';
import HomePageData from '../../interface/pageRenderingData/homepage';

dotenv.config();

const homeController = async (req: Request, res: Response): Promise<void> => {
  const homepageData: HomePageData = {
    villageName: process.env.VILLAGE_NAME,
    villageYoutubeTrailerLink: process.env.VILLAGE_YOUTUBE_TRAILER_LINK,
    districtName: process.env.DISTRICT_NAME,
    copyrightYear: process.env.COPYRIGHT_YEAR,
    provinceName: process.env.PROVINCE_NAME,
    phoneContact: process.env.PHONE_CONTACT,
    villageEmailAddress: process.env.VILLAGE_EMAIL_ADDRESS,
    postalCode: process.env.POSTAL_CODE,
    footerLinks: await BasicPage.getFooterLinks(),
    navbarItems: await BasicPage.getNavbarItems(),
    activateMainNavbar: 'Beranda',
  };

  res.status(200).render('pages/home', homepageData);
};

export default homeController;
