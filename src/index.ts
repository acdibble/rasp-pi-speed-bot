import cron from 'node-cron';
import mongoose from 'mongoose';

import launchBrowser from './fast-api';
import composeTweet from './twitter-api';
import calculateStatsForPast from './statistics/stats';
import { IRawStats } from '../types';

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MLAB_URI!, { useNewUrlParser: true });
mongoose.connection
  .once('open', () => console.log('Connected to MongoLab instance.'))
  .on('error', error => console.log('Error connecting to MongoLab:', error));

cron.schedule('*/10 * * * *', launchBrowser);

cron.schedule('0 * * * *', () => {
  calculateStatsForPast('hour')
    .then((stats: IRawStats) => {
      if (stats.sampleSize < 5) {
        console.log('Not enough samples');
      } else {
        composeTweet(stats, 'pastHour');
      }
    }, (err: Error) => {
      console.debug('Could get stats:', err);
    });
});
