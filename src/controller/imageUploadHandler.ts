import { Request, Response } from 'express';
import ImageUpload from '../class/ImageUpload';

const imageUploadHandler = (req: Request, res: Response): void => {
  const imageUpload = new ImageUpload(req, 'image');
  const uploadHandler = imageUpload.createUploadHandler();

  uploadHandler(req, res, async (err) => {
    if (err || req.file === undefined) {
      res.sendStatus(400);
      return;
    }

    res.status(202).json({ filename: req.file.filename });
  });
};

export default imageUploadHandler;
