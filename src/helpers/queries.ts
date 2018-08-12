import { Sped } from '../models';

const conversions: { [key: string]: number } = {
  hour: 3600000,
  day: 86400000,
};

const getSpedsFromPast = (time: string) => Sped.find({ timestamp: { $gte: Date.now() - conversions[time] } });

const createNewSped = (speed: number): void => {
  Sped.create({ speed })
};

export {
  getSpedsFromPast,
  createNewSped,
};
