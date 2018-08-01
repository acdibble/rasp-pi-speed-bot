import { mean, std, median } from 'mathjs';
import { getSpedsFromPastHour, getSpedsFromPastDay } from '../helpers/queries';

const getStatsForPast = async (time) => {
  const speds = time === 'hour'
    ? await getSpedsFromPastHour()
    : await getSpedsFromPastDay();

  const speeds = speds.map(({ speed }) => speed);

  const average = mean(speeds);
  const stdDev = std(speeds);
  const middle = median(speeds);

  console.log(average, stdDev, middle);

  return { mean: average, std: stdDev, median: middle };
};

export default getStatsForPast;
