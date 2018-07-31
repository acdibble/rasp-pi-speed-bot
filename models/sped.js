import mongoose, { Schema } from 'mongoose';

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

export default mongoose.model('sped', SpedSchema);
