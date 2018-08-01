import Sped from '../models/sped';

const oneHour = 3600000;
const oneDay = 86400000;

const getSpedsFromPast = time => Sped.find({ timestamp: { $gte: new Date() - (time === 'hour' ? oneHour : oneDay) } });

export default getSpedsFromPast;
