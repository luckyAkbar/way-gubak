import mongoose, { Schema } from 'mongoose';
import UMKM from '../interface/profileUMKM';

const umkm: Schema = new mongoose.Schema<UMKM>({
  id: {
    type: Number,
    required: true,
    index: true,
  },
  featuredImageName: {
    type: String,
    required: true,
  },
  featuredImageAlt: {
    type: String,
    default: 'Featured image from this UMKM.',
  },
  tags: {
    type: [String],
    default: ['UMKM Unggulan desa Pinang Jaya'],
  },
  logoName: {
    type: String,
    default: '150x150.png',
  },
  logoAlt: {
    type: String,
    default: 'Logo UMKM.',
  },
  name: {
    type: String,
    required: [true, 'UMKM name must be defined on creation.'],
  },
  contacts: {
    type: [],
    required: true,
  },
  descriptions: {
    type: [String],
    required: true,
  }, // displayed as p tags for each index
}, { timestamps: true });

const ProfileUMKM = mongoose.model<UMKM>('UMKM', umkm);

export default ProfileUMKM;
