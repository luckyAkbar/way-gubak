import dotenv from 'dotenv';

import mongoose from 'mongoose';
import ServerConfigError from '../class/ServerConfigError';

dotenv.config();

const mongoConnect = async (): Promise<void> => {
  const mongodbURI: string | undefined = process.env.MONGODB_URI;

  try {
    if (mongodbURI === undefined) throw new ServerConfigError('Please supply MongoDB URI in .env file');

    console.log('Connnecting to MongoDB...');

    await mongoose.connect(mongodbURI);

    console.log('MongoDB connected.');
  } catch (e: unknown) {
    if (e instanceof ServerConfigError) await e.logError();

    throw e;
  }
};

export default mongoConnect;
