import express from 'express';
import cron from 'node-cron';

import launchBrowser from './fast-api/api';
import writeFileAsync from './helpers/writeFileAsync';

const app = express();

const speeds = [];

cron.schedule('*/10 * * * *', () => { launchBrowser(null, speeds); }, null, true, 'America/Chicago');

cron.schedule('00 * * * *', () => { console.log('need to run stats here'); }, null, true, 'America/Chicago');

cron.schedule('00 00 * * *',
  () => {
    writeFileAsync(`${__dirname}/logs/${new Date().toISOString().slice(0, 10)}.json`, JSON.stringify(speeds))
      .then(() => {
        console.log('File written');
        speeds.splice(0);
      });
  }, null, true, 'America/Chicago');

app.get('/shutdown', (req, res) => {
  if (speeds.length) {
    writeFileAsync(`${__dirname}/logs/${new Date().toISOString()}.json`, JSON.stringify(speeds))
      .then(() => {
        res.send('Good bye');
        process.exit(0);
      }, () => {
        res.send('Error writing file');
        process.exit(1);
      });
  }

  res.send('Good bye');
  process.exit(0);
});

app.get('/', async (req, res) => {
  launchBrowser(res);
});

app.listen(3000, () => console.log('Listening on 3000.'));
