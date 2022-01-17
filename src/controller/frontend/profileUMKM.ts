import { Request, Response } from 'express';
import UMKM from '../../class/UMKM';
import UserRequestError from '../../class/Error/UserRequestError';
import ProfileUMKM from '../../interface/profileUMKM';
import UMKMPage from '../../interface/pageRenderingData/UMKMPage';
import CustomError from '../../class/Error/CustomError';

const UMKMProfileController = async (req: Request, res: Response): Promise<void> => {
  const { ID } = req.params;

  try {
    const umkm: UMKM = new UMKM(ID);
    const UMKMPageData: UMKMPage = await umkm.getProfilePageData();

    res.render('pages/profile-umkm', UMKMPageData);
  } catch (e: unknown) {
    if (e instanceof UserRequestError) {
      res.status(e.HTTPErrorStatus).json({
        message: e.message,
        hint: e.hint,
      });
      
      return;
    }

    const err = new CustomError('Internal Server Error', (e as Error).message, false, 'high');
    await err.logError();

    res.status(500).json({ message: `Server error due to: ${err.message}` })
  }
};

export default UMKMProfileController;
