import speedTest from 'speedtest-net';
import { Sped } from '../models';

const runTest = () => {
  console.info('Starting test.');
  const test = speedTest({ maxTime: 20000 });

  test.on('data', () => {
    console.info('Getting data...');
  });

  test.on('error', (err) => {
    console.debug('Speed test error:', err);
  });

  test.on('done', ({ downloadSpeed, uploadSpeed }) => {
    console.info('Test complete.');
    Sped.create({
      downloadSpeed: downloadSpeed * 8 / 1000000,
      uploadSpeed: uploadSpeed * 8 / 1000000,
      timestamp: new Date(),
    });
  });
};

export default runTest;
