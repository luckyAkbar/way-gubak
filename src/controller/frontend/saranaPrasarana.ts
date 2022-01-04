import { Request, Response } from "express";
import SaranaPrasarana from "../../interface/pageRenderingData/saranaPrasarana";

const saranaPrasaranaController = (req: Request, res: Response): void => {
  const saranaPrasarana: SaranaPrasarana = {
    villageName: process.env.VILLAGE_NAME,
    districtName: process.env.DISTRICT_NAME,
    copyrightYear: process.env.COPYRIGHT_YEAR,
  };

  res.render('pages/saranaPrasarana', saranaPrasarana);
};

export default saranaPrasaranaController;
