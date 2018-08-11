const mongoose = require('mongoose');

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
    type: Date,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('stat', StatSchema);
