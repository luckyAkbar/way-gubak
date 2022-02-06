import mongoose from 'mongoose';
import Agenda from '../interface/agenda';

const agenda = new mongoose.Schema<Agenda>({
  title: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    required: true,
    get: function(date: Date) {
      return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    }
  },

  time: {
    type: String,
    required: true,
  },

  creatorID: {
    type: Number,
    required: true,
    min: 1,
  },

  creatorName: {
    type: String,
    required: true,
  },

  location: {
    type: String,
    required: true,
  }
}, { timestamps: true });

const Agenda = mongoose.model('agenda', agenda);

export default Agenda;
