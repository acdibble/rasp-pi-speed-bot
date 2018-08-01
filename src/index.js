import cron from 'node-cron';
import mongoose from 'mongoose';

import composeTweet from './twitter-api/index';
import launchBrowser from './fast-api/api';
import getStatsForPast from './statistics/stats';

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MLAB_URI, { useNewUrlParser: true });
mongoose.connection
  .once('open', () => console.log('Connected to MongoLab instance.'))
  .on('error', error => console.log('Error connecting to MongoLab:', error));

cron.schedule('*/10 * * * *', launchBrowser, null, true, 'America/Chicago');

cron.schedule('0 * * * *', () => {
  getStatsForPast('hour')
    .then((stats) => {
      composeTweet({ speed: stats.mean, timestamp: stats.timestamp });
    }, (err) => {
      console.log('Could get stats:', err);
    });
}, null, true, 'America/Chicago');
