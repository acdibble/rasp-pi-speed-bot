const { assert } = require('chai');
const childProcess = require('child_process');
const nock = require('nock');
const sinon = require('sinon');
const { dropRecords, seedRecords } = require('../helpers/db');
const { sendHourlyTweet, measureSpeed } = require('../../src/cronjobs');
const db = require('../../src/db');


describe('sendHourlyTweet', () => {
  let scope;

  beforeEach(() => {
    nock.cleanAll();
    scope = nock('https://api.twitter.com')
      .post('/1.1/statuses/update.json')
      .reply(200);

    return dropRecords().then(seedRecords);
  });

  afterEach(() => {
    dropRecords();
  });

  it('sends a tweet for past hour', async () => {
    await sendHourlyTweet();
    assert.isTrue(scope.isDone());
  });

  it('does not send a tweet with fewer than 5 samples', async () => {
    const sandbox = sinon.createSandbox();
    const stub = sandbox.stub(db, 'calculateStatsForPast');
    stub.resolves({ sampleSize: 4, mean: 100 });
    await sendHourlyTweet();
    stub.restore();
    assert.isFalse(scope.isDone());
  });

  it('gets stats for past hour before sending tweet', async () => {
    const spy = sinon.spy(db, 'calculateStatsForPast');
    await sendHourlyTweet();
    spy.restore();
    assert.equal(spy.args[0], 'hour');
  });

  it('handles error composing tweet', async () => {
    const spy = sinon.spy(console, 'error');
    nock.cleanAll();
    scope = nock('https://api.twitter.com')
      .post('/1.1/statuses/update.json')
      .reply(403);

    await sendHourlyTweet();
    scope.done();
    spy.restore();
    sinon.assert.calledOnce(spy);
  });
});

describe('measureSpeed', () => {
  const msg = `Testing download speed.....
Download: 1000 Mbit/s
Testing upload speed.....
Upload: 100 Mbit/s`;

  let stub;

  before(() => {
    const sandbox = sinon.createSandbox();
    stub = sandbox.stub(childProcess, 'exec');
  });

  after(() => {
    stub.restore();
  });

  it('uses exec to run speedtest and inserts speed into db', async () => {
    stub.yields(undefined, msg);
    await measureSpeed();
    sinon.assert.calledOnce(stub);
  });

  it('handles errors inserting speed into db', async () => {
    const spy = sinon.spy(console, 'error');
    stub.yields(Error('err'));
    await measureSpeed();
    spy.restore();
    sinon.assert.calledOnce(spy);
  });
});
