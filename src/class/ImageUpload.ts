import { Request } from 'express';
import crypto from 'crypto';
import multer, { Multer } from 'multer';
import dotenv from 'dotenv';
import UserRequestError from './Error/UserRequestError';

dotenv.config();

export default class ImageUpload {
  fieldName: string;
  maxFiles: number;
  imageExtention: string = 'jpg';
  storage: multer.StorageEngine;

  constructor(req: Request, fieldname: string) {
    this.fieldName = fieldname;
    this.maxFiles = 1;
    this.storage = multer.diskStorage({
      destination: function(req, file, cb) {
        cb(null, process.env.IMAGE_STORAGE_PATH || '/home/project/kkn/');
      }, 
      filename: function(req, file: Express.Multer.File & { extention: string }, cb) {
        const uniqueFileName = `${crypto.randomUUID()}.${file.extention}`;

        cb(null, uniqueFileName);
      },
    });
  }

  fileFilter(req: Request, file: Express.Multer.File & { extention: string }, cb: CallableFunction) {
    const mimetypeFilter = (mimetype: string) => {
      const acceptedMimetype = process.env.ACCEPTED_IMAGE_MIMETYPE!.split(',');
      for (let i = 0; i < acceptedMimetype.length; i++) {
        if (mimetype === acceptedMimetype[i]) return;
      }

      throw new UserRequestError('Your image does not have proper mimetype.', 'Please include proper mimetype in image');
    };

    const extFilter = (filename: string) => {
      const acceptedExtention = process.env.ACCEPTED_IMAGE_EXTENTION!.split(',');

      for (let i = 0; acceptedExtention.length; i++) {
        if (filename.endsWith(acceptedExtention[i])) return;
      }

      throw new UserRequestError('Your iamge extention if forbidden.', 'Try to upload image with correct extention');
    };

    try {
      mimetypeFilter(file.mimetype);
      extFilter(file.originalname);

      file.extention = file.originalname.substring(file.originalname.lastIndexOf('.') + 1);

      cb(null, true);
    } catch (e: unknown) {
      cb(e, false);
    }
  }

  createUploadHandler() {
    return multer({
      storage: this.storage,
      fileFilter: this.fileFilter,
      limits: {
        files: this.maxFiles,
        fileSize: Number(process.env.MAX_UPLOADED_IMAGE_SIZE),
      },
    }).single(this.fieldName);
  }
}