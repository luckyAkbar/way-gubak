import { Request, Response } from 'express';
import Dashboard from '../../class/Dashboard';
import UserRequestError from '../../class/Error/UserRequestError';
import UpdateBerita from '../../interface/pageResource/dashboard/berita/updateBerita';
import errorPageRenderer from '../error';

const renderUpdateBeritaPage = async (req: Request, res: Response): Promise<void> => {
  const { beritaID } = req.query;

  try {
    const berita = await Dashboard.getBeritaFromBeritaID(String(beritaID));
    const updateBeritaPageData: UpdateBerita = {
      berita,
    };

    res.render('pages/dashboard/berita/update-berita', updateBeritaPageData);
  } catch (e: unknown) {
    if (e instanceof UserRequestError) {
      res.status(e.HTTPErrorStatus).json({ message: e.message + e.hint });
      return;
    }
    
    errorPageRenderer(res, 500, 'Internal Server Error');
  }
};

export default renderUpdateBeritaPage;
