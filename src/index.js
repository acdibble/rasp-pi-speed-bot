const cron = require('node-cron');
const { sendHourlyTweet, measureSpeed } = require('./cronjobs');

const app = () => {
  cron.schedule('*/10 * * * *', measureSpeed);

  cron.schedule('0 * * * *', sendHourlyTweet);
};

module.exports = app; // for testing purposes
