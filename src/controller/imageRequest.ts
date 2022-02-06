import { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const imageRequestHandler = (req: Request, res: Response): void => {
  const { imageName } = req.params;

  if (!imageName) {
    res.sendStatus(404);

    return;
  }

  res.sendFile(imageName, {
    root: process.env.IMAGE_STORAGE_PATH,
  });
};

export default imageRequestHandler;
