const cron = require('node-cron');
const mongoose = require('mongoose');

const getSpeed = require('./fast-api');
const composeTweet = require('./twitter-api/index');
const calculateStatsForPast = require('./statistics/stats');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MLAB_URI, { useNewUrlParser: true });
mongoose.connection
  .once('open', () => console.log('Connected to MongoLab instance.'))
  .on('error', error => console.log('Error connecting to MongoLab:', error));

cron.schedule('*/10 * * * *', getSpeed);

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
