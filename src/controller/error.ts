import { Response } from 'express';

const errorPageRenderer = (
    res: Response,
    HTTPErrorStatus: number = 404,
    message: string = 'Halaman ini tidak dapat ditemukan. Silahkan ulangi atau kembali ke halaman utama.',
  ) => {
    res.status(HTTPErrorStatus).render('pages/error', {
      HTTPErrorStatus,
      message,
    });
};

export default errorPageRenderer;
