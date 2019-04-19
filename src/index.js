const cron = require('node-cron');

const { calculateStatsForPast } = require('./db');
const measureSpeed = require('./speedtest');
const composeTweet = require('./twitter-api/index');

cron.schedule('*/10 * * * *', measureSpeed);

cron.schedule('0 * * * *', () => {
  calculateStatsForPast('hour')
    .then((stats) => {
      if (stats.sampleSize < 5) {
        console.log('Not enough samples');
      } else {
        composeTweet(stats, 'pastHour');
      }
    }, (err) => {
      console.debug('Could get stats:', err);
    });
});
