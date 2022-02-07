import mongoose from 'mongoose';

const user = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },

  username: {
    type: String,
    required: true,
    minLength: 5,
  },

  password: {
    type: String,
    required: true,
    minLength: 8,
  },
}, { timestamps: true });

const User = mongoose.model('user', user);

export default User;
