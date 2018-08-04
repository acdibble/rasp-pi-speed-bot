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

  test.on('done', ({ downloadSpeed: ds, uploadSpeed: us }) => {
    const downloadSpeed = ds * 8 / 1000000;
    const uploadSpeed = us * 8 / 1000000;
    console.info(`Test complete. DL: ${downloadSpeed}, UL: ${uploadSpeed}`);
    Sped.create({
      downloadSpeed,
      uploadSpeed,
      timestamp: new Date(),
    });
  });
};

export default runTest;
