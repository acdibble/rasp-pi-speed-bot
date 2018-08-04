import mongoose, { Schema } from 'mongoose';

const SpedSchema = new Schema({
  downloadSpeed: {
    type: Number,
    required: true,
  },
  uploadSpeed: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
});

export default mongoose.model('sped', SpedSchema);
