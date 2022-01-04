import { Request, Response } from "express";
import SaranaPrasarana from "../../interface/pageRenderingData/saranaPrasarana";

const saranaPrasaranaController = (req: Request, res: Response): void => {
  const saranaPrasarana: SaranaPrasarana = {
    villageName: process.env.VILLAGE_NAME,
    districtName: process.env.DISTRICT_NAME,
    copyrightYear: process.env.COPYRIGHT_YEAR,
    provinceName: process.env.PROVINCE_NAME,
    phoneContact: process.env.PHONE_CONTACT,
    villageEmailAddress: process.env.VILLAGE_EMAIL_ADDRESS,
    postalCode: process.env.POSTAL_CODE,
  };

  res.render('pages/saranaPrasarana', saranaPrasarana);
};

export default saranaPrasaranaController;
