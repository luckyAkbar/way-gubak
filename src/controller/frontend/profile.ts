import { Request, Response } from 'express';
import Profile from '../../interface/pageRenderingData/profile';

const profileController = (req: Request, res: Response): void => {
  const profile: Profile = {
    villageName: process.env.VILLAGE_NAME,
    districtName: process.env.DISTRICT_NAME,
    copyrightYear: process.env.COPYRIGHT_YEAR,
    provinceName: process.env.PROVINCE_NAME,
    phoneContact: process.env.PHONE_CONTACT,
    villageEmailAddress: process.env.VILLAGE_EMAIL_ADDRESS,
    postalCode: process.env.POSTAL_CODE,
  };

  res.render('pages/profile', profile);
};

export default profileController;
