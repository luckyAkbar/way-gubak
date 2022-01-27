import { Request, Response } from 'express';
import UMKM from '../../class/UMKM';
import UMKMIndexPageData from '../../interface/pageRenderingData/UMKMIndex';

const UMKMIndexController = async (req: Request, res: Response): Promise<void> => {
  const umkmIndexPageData: UMKMIndexPageData = await UMKM.getIndexPageData();
  
  res.render('pages/umkm-index', umkmIndexPageData);
}

export default UMKMIndexController;
