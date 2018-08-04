import FastSpeedtest from 'fast-speedtest-api';
import { createNewSped } from '../helpers/queries';

const speedtest = new FastSpeedtest({
  token: process.env.FAST_TOKEN,
  verbose: false,
  timeout: 20000,
  unit: FastSpeedtest.UNITS.Mbps,
});

export default () => speedtest.getSpeed().then(speed => createNewSped(speed));
