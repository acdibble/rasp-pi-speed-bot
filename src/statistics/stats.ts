import { mean, std, median } from 'mathjs';
import { getSpedsFromPast } from '../helpers/queries';
import { Stat } from '../models';
import { ISped, IRawStats } from '../../types';

const calculateStatsForPast = (time: string): PromiseLike<IRawStats> => new Promise(async (resolve, reject) => {
  let speds: ISped[];
  let speeds: number[] = [];

  try {
    speds = await getSpedsFromPast(time);
    speeds = speds.map(({ speed }) => speed).sort((a, b) => a - b);
  } catch (e) {
    reject(e);
  }


  if (speeds) {
    const stats: IRawStats = {
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
  } else {
    reject(Error('Empty array'));
  }
});

export default calculateStatsForPast;
