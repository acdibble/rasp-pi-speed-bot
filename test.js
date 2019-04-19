const db = require('./src/db');

const fn = () => db.calculateStatsForPast('\';').then(console.log).catch(console.log);

setTimeout(fn, 100);
