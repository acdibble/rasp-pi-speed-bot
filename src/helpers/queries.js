import Sped from '../models';

const conversions = {
  hour: 3600000,
  day: 86400000,
};

const getSpedsFromPast = time => Sped.find({ timestamp: { $gte: new Date() - conversions[time] } });

export default getSpedsFromPast;
