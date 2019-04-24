// eslint-disable-next-line prefer-destructuring
const childProcess = require('child_process');
const db = require('../db');
const composeTweet = require('../twitter-api');

const execAsync = cmd => new Promise((resolve, reject) => {
  childProcess.exec(cmd, (err, stdout) => {
    if (err) return reject(err);

    return resolve({ stdout });
  });
});

const sendHourlyTweet = async () => {
  const stats = await db.calculateStatsForPast('hour');

  if (stats.sampleSize < 5) {
    console.log('Sample size too small');
    return null;
  }

  try {
    await composeTweet(stats, 'pastHour');
    return null;
  } catch (e) {
    console.error('Error sending tweet', e);
    return null;
  }
};

const measureSpeed = async () => {
  try {
    const { stdout } = await execAsync('speedtest');
    const speed = stdout.split('\n')
      .find(line => line.startsWith('Download:'))
      .split(' ')[1];

    return db.insertSpeed(+speed);
  } catch (e) {
    console.error('Error measuring speed', e);
    return null;
  }
};

module.exports = { measureSpeed, sendHourlyTweet };
