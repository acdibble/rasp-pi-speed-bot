const { Sped } = require('../models');

const conversions = {
  hour: 3600000,
  day: 86400000,
};

const getSpedsFromPast = time => Sped.find({ timestamp: { $gte: new Date() - conversions[time] } });

const createNewSped = speed => Sped.create({ speed, timestamp: new Date() });

module.exports = {
  getSpedsFromPast,
  createNewSped,
};
