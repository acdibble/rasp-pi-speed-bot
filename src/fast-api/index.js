const { exec } = require('child_process');
const { promisify } = require('util');
const { Sped } = require('../models');

const execAsync = promisify(exec);

const getSpeed = async () => {
  console.log('starting test');

  const { stdout } = await execAsync('speedtest');
  const speed = stdout.split('\n')
    .find(line => line.startsWith('Download:'))
    .split(' ')[1];

  console.log('Got speed', speed);

  return Sped.create({ speed: +speed, timestamp: new Date() });
};

module.exports = getSpeed;
