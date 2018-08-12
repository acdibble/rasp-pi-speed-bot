import mongoose from 'mongoose';
import { IStat } from '../../types';

const { Schema } = mongoose;

const StatSchema = new Schema({
  mean: {
    type: Number,
    required: true,
  },
  std: {
    type: Number,
    required: true,
  },
  min: {
    type: Number,
    required: true,
  },
  median: {
    type: Number,
    required: true,
  },
  max: {
    type: Number,
    required: true,
  },
  sampleSize: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

export default mongoose.model<IStat>('stat', StatSchema);
