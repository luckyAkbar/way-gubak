import dotenv from 'dotenv';
dotenv.config();

import { Request, Response } from 'express';
import morgan from 'morgan';

const requestLogger = morgan('short', {
  skip: function(req: Request, res: Response): boolean {
    const { path } = req;
    const skippedReqLoggingRoutes: string[] | undefined = process.env.SKIPPED_REQ_LOGGING_PATHS?.split(',');

    if (skippedReqLoggingRoutes === undefined) return false;
    return (skippedReqLoggingRoutes.includes(path));
  }
});

export default requestLogger;
