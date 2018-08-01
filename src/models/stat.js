import mongoose, { Schema } from 'mongoose';

const StatSchema = new Schema({
  mean: {
    type: Number,
    required: true,
  },
  median: {
    type: Number,
    required: true,
  },
  std: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
});

export default mongoose.model('stat', StatSchema);
