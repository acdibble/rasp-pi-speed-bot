const { assert } = require('chai');
const cron = require('node-cron');
const sinon = require('sinon');
const app = require('../../src');
const cronjobs = require('../../src/cronjobs');

describe('App', () => {
  it('starts two cron jobs with the required schedules and functions', () => {
    const spy = sinon.spy(cron, 'schedule');
    app();

    assert.equal(spy.args[0][0], '*/10 * * * *');
    assert.equal(spy.args[0][1], cronjobs.measureSpeed);

    assert.equal(spy.args[1][0], '0 * * * *');
    assert.equal(spy.args[1][1], cronjobs.sendHourlyTweet);

    spy.restore();
  });
});
