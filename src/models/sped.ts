import mongoose from 'mongoose';
import { ISped } from '../../types';

const { Schema } = mongoose;

const SpedSchema = new Schema({
  speed: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
});

export default mongoose.model<ISped>('sped', SpedSchema);


