import dotenv from 'dotenv';
dotenv.config();

import { Request, Response } from 'express';
import HomePageData from '../../interface/pageRenderingData/homepage';

const homeController = (req: Request, res: Response): void => {
  const homepageData: HomePageData = {
    villageName: process.env.VILLAGE_NAME,
    villageYoutubeTrailerLink: process.env.VILLAGE_YOUTUBE_TRAILER_LINK,
    districtName: process.env.DISTRICT_NAME,
    copyrightYear: process.env.COPYRIGHT_YEAR,
    provinceName: process.env.PROVINCE_NAME,
    phoneContact: process.env.PHONE_CONTACT,
    villageEmailAddress: process.env.VILLAGE_EMAIL_ADDRESS,
    postalCode: process.env.POSTAL_CODE,
  };

  res.status(200).render('pages/home', homepageData);
};

export default homeController;
