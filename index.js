import express from 'express';
import cron from 'node-cron';
import mongoose from 'mongoose';
import { config } from 'dotenv';

import launchBrowser from './fast-api/api';

config();

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MLAB_URI);
mongoose.connection
  .once('open', () => console.log('Connected to MongoLab instance.'))
  .on('error', error => console.log('Error connecting to MongoLab:', error));

cron.schedule('*/10 * * * *', launchBrowser, null, true, 'America/Chicago');

cron.schedule('00 * * * *', () => { console.log('need to run stats here'); }, null, true, 'America/Chicago');

app.get('/', async (req, res) => {
  launchBrowser(res);
});

app.listen(3000, () => console.log('Listening on 3000.'));
