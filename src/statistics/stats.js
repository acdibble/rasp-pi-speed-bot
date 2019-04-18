const { mean, std, median } = require('mathjs');
const { getSpedsFromPast } = require('../helpers/queries');
const { Stat } = require('../models');

const calculateStatsForPast = async time => {
  const speds = await getSpedsFromPast(time);

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

  return stats;
};

module.exports = calculateStatsForPast;
