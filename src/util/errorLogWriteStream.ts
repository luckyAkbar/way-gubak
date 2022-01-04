import dotenv from 'dotenv';

import fs from 'fs';
import path from 'path';

dotenv.config();

const getErrorLogPath = (): string => {
  const errorLogPath: string | undefined = process.env.ERROR_LOG_PATH;

  if (errorLogPath === undefined) throw new Error('ERROR_LOG_PATH is undefined. Please specify one in your .env file');

  return errorLogPath;
};

const errorLogWriteStream = (errorComponent: string[]): Promise<void | Error> => new Promise((reject, resolve) => {
  const testStream = fs.createWriteStream(path.join(getErrorLogPath(), 'error.log'), {
    flags: 'a',
  });

  testStream.on('error', (error) => {
    reject(error);
  });

  for (let i = 0; i < errorComponent.length; i++) {
    testStream.write(`${errorComponent[i]}\n`);
  }

  testStream.end();

  resolve();
});

export default errorLogWriteStream;
