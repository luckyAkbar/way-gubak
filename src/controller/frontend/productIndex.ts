import ProductUMKM from '../../class/ProductUMKM';
import { Request, Response } from 'express';
import errorPageRenderer from '../error';

const productIndexController = async (req: Request, res: Response ): Promise<void> => {
  try {
    const productIndexPageData = await ProductUMKM.getProductIndexPageData();

    res.render('pages/product-index', productIndexPageData);
  } catch (e: unknown) {
    errorPageRenderer(res, 500, 'Maaf, sistem kami mengalami gangguan, silahkan coba lagi nanti');
  }
};

export default productIndexController;
