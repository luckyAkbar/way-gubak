import crypto from 'crypto';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import UserSession from '../interface/userSession';

dotenv.config();

const session = new mongoose.Schema<UserSession>({
  sessionID: {
    type: String,
    default: crypto.randomUUID(),
  },

  userID: {
    type: Number,
    required: true,
  },

  expiredAt: {
    type: Date,
    default: new Date(Date.now() + Number(process.env.SESSION_EXPIRED_MS)),
  },
});

const Session = mongoose.model('session', session);

export default Session;
