import mongoose from 'mongoose';

const admin = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Admin = mongoose.model('admin', admin);

export default Admin;
