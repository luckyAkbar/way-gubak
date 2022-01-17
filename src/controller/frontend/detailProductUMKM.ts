import { Request, Response } from 'express';
import ProductUMKM from '../../class/ProductUMKM';
import UMKMProductsPageData from '../../interface/pageRenderingData/UMKMProduct';
import UserRequestError from '../../class/Error/UserRequestError';
import CustomError from '../../class/Error/CustomError';

const detailProductUMKMController = async (req: Request, res: Response): Promise<void> => {
  const { ID } = req.params;

  try {
    const productUMKM = new ProductUMKM(ID);
    const productDetail: UMKMProductsPageData = await productUMKM.getProductPageData();

    res.render('pages/product-page-umkm', productDetail);
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

export default detailProductUMKMController;
