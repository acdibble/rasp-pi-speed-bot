const { assert } = require('chai');
const { db, calculateStatsForPast, insertSpeed } = require('../../src/db');

describe('db', () => {
  before((done) => {
    const now = new Date().toISOString().replace('T', ' ');
    const hourAndHalfAgo = new Date(Date.now() - (1.5 * 60 * 60 * 1000))
      .toISOString()
      .replace('T', ' ');
    db.all(`INSERT INTO speeds (speed, timestamp)
    VALUES
      (100, '${now}'),
      (200.5, '${now}'),
      (143.23, '${now}'),
      (123.4, '${now}'),
      (57, '${now}'),
      (108.5, '${hourAndHalfAgo}'),
      (69.69, '${hourAndHalfAgo}'),
      (312.21, '${hourAndHalfAgo}'),
      (101, '${hourAndHalfAgo}'),
      (2, '${hourAndHalfAgo}')
    `, (err) => {
      if (err) throw err;
      done();
    });
  });

  after((done) => {
    db.all('DELETE FROM speeds', (err) => {
      if (err) throw err;
      done();
    });
  });

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
