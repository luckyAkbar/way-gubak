import mongoose from 'mongoose';
import IBerita from '../interface/berita';

const berita = new mongoose.Schema<IBerita>({
  title: {
    type: String,
    required: true,
    minLength: 1,
  },

  content: {
    type: String,
    required: true,
    minLength: 1,
  },

  filename: {
    type: String,
    required: true,
    minLength: 1,
  },
}, { timestamps: true });

const Berita = mongoose.model('berita', berita);

export default Berita;
