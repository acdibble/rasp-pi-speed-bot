import cron from 'node-cron';
import mongoose from 'mongoose';
import { config } from 'dotenv';

import Sped from './models/sped';
import composeTweet from './twitter-api';
import launchBrowser from './fast-api/api';
import getStatsForPast from './statistics/stats';

config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MLAB_URI, { useNewUrlParser: true });
mongoose.connection
  .once('open', () => console.log('Connected to MongoLab instance.'))
  .on('error', error => console.log('Error connecting to MongoLab:', error));

cron.schedule('*/10 * * * *', launchBrowser, null, true, 'America/Chicago');

cron.schedule('0 * * * *', () => { getStatsForPast('hour'); }, null, true, 'America/Chicago');

setInterval(() => {
  Sped.find({}).sort({ timestamp: -1 }).exec((err, res) => {
    if (res) {
      const { speed, timestamp } = res[0];
      if (speed < (1000 * 0.75)) {
        composeTweet({
          speed,
          timestamp,
        });
      }
    } else {
      console.log('Error fetching data:', err);
    }
  });
}, 60 * 60 * 1000);
