import { Request, Response } from "express";
import VisiMisi from "../../interface/pageRenderingData/visiMisi";

const visiMisiController = (req: Request, res: Response): void => {
  const visiMisi: VisiMisi = {
    villageName: process.env.VILLAGE_NAME,
    districtName: process.env.DISTRICT_NAME,
    copyrightYear: process.env.COPYRIGHT_YEAR,
  };

  res.render('pages/visiMisi', visiMisi);
};

export default visiMisiController;
