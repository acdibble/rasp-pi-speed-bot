const { db } = require('../../src/db');

const dropRecords = () => new Promise((resolve) => {
  db.all('DELETE FROM speeds', (err) => {
    if (err) throw err;
    resolve();
  });
});

const seedRecords = () => new Promise((resolve) => {
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
    resolve();
  });
});

module.exports = {
  dropRecords,
  seedRecords,
};
