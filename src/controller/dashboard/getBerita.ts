import { Request, Response } from 'express';
import Dashboard from '../../class/Dashboard';
import ListBerita from '../../interface/pageResource/dashboard/listBerita';
import errorPageRenderer from '../error';

const getBerita = async (req: Request, res: Response): Promise<void> => {
  try {
    const listBerita = await Dashboard.getBerita();

    const beritaPageData: ListBerita = {
      listBerita,
    };

    res.render('pages/dashboard/berita/index', beritaPageData);
  } catch (e: unknown) {
    errorPageRenderer(res, 500, 'Internal Server Error');
  }
};

export default getBerita;
