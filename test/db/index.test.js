const { assert } = require('chai');
const { calculateStatsForPast, insertSpeed } = require('../../src/db');
const { dropRecords, seedRecords } = require('../helpers/db');

describe('db', () => {
  before(() => dropRecords().then(seedRecords));

  after(() => dropRecords());

  describe('calculateStatsForPast', () => {
    it('calculates stats for the past hour', () => calculateStatsForPast('hour')
      .then(({ mean, sampleSize }) => {
        assert.equal(mean, 124.826);
        assert.equal(sampleSize, 5);
      }));

    it('calculates stats for the past day', () => calculateStatsForPast('day')
      .then(({ mean, sampleSize }) => {
        assert.equal(mean, 121.753);
        assert.equal(sampleSize, 10);
      }));
  });

  describe('insertSpeed', () => {
    it('inserts new speed records', () => insertSpeed(867.52).then((val) => {
      assert.deepEqual(val, []);
    }));

    it('returns errors', () => insertSpeed().catch((err) => {
      assert.exists(err);
      assert.equal(err.code, 'SQLITE_ERROR');
    }));
  });
});
