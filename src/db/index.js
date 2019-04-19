const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const { NODE_ENV } = process.env;

const db = new sqlite3.Database(path.join(__dirname, '..', '..', `${NODE_ENV}.db`), (err) => {
  /* istanbul ignore if */
  if (err) {
    console.log('Error connecting to DB.');
  } else {
    console.log('Connected to DB.');
  }
});

/**
 * @param {number} speed
 */

const insertSpeed = speed => new Promise((resolve, reject) => {
  db.all(`INSERT INTO speeds(speed) VALUES(${speed})`, (err, rows) => {
    if (err) return reject(err);
    return resolve(rows);
  });
});

/**
 * @param {"hour"|"day"} time
 * @returns {Promise<{mean: number, sampleSize: number}>}
 */

const calculateStatsForPast = time => new Promise((resolve, reject) => {
  db.all(`SELECT avg(speed) as "mean", count(speed) as "sampleSize"
  FROM speeds
  WHERE timestamp > datetime('now', '-1 ${time}')`, (err, [rows]) => {
    /* istanbul ignore if */
    if (err) return reject(err);
    return resolve(rows);
  });
});

module.exports = {
  db,
  insertSpeed,
  calculateStatsForPast,
};
