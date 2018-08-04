import { mean, std, median } from 'mathjs';
import getSpedsFromPast from '../helpers/queries';
import { Stat } from '../models';

const getStatsForPast = time => new Promise(async (resolve, reject) => {
  let speds;
  try {
    speds = await getSpedsFromPast(time);
  } catch (e) {
    reject(e);
  }

  const speeds = speds.map(({ speed }) => speed).sort((a, b) => a - b);

  const stats = {
    mean: mean(speeds),
    std: std(speeds),
    min: speeds[0],
    median: median(speeds),
    max: speeds[speeds.length - 1],
    sampleSize: speeds.length,
    timestamp: new Date(),
  };

  Stat.create(stats);

  resolve(stats);
});

export default getStatsForPast;
