const { exec } = require('child_process');
const { promisify } = require('util');
const { insertSpeed } = require('../db/index');

const execAsync = promisify(exec);

const measureSpeed = async () => {
  const { stdout } = await execAsync('speedtest');
  const speed = stdout.split('\n')
    .find(line => line.startsWith('Download:'))
    .split(' ')[1];

  return insertSpeed(+speed);
};

module.exports = measureSpeed;
