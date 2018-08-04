import cron from 'node-cron';
import mongoose from 'mongoose';

import runSpeedTest from './fast-api';
import composeTweet from './twitter-api/index';
import calculateStatsForPast from './statistics/stats';

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MLAB_URI, { useNewUrlParser: true });
mongoose.connection
  .once('open', () => console.log('Connected to MongoLab instance.'))
  .on('error', error => console.log('Error connecting to MongoLab:', error));

cron.schedule('*/10 * * * *', runSpeedTest, null, true, 'America/Chicago');

cron.schedule('0 * * * *', () => {
  calculateStatsForPast('hour')
    .then((stats) => {
      composeTweet(stats, 'pastHour');
    }, (err) => {
      console.debug('Could get stats:', err);
    });
}, null, true, 'America/Chicago');
