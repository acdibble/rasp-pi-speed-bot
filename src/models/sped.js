const mongoose = require('mongoose');

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

module.exports = mongoose.model('sped', SpedSchema);
