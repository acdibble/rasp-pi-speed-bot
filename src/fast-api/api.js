import puppeteer from 'puppeteer';
import { Sped } from '../models';

const checkForSucceeded = async (res, browser, page) => {
  const bodyHandle = await page.$('#speed-value.succeeded');
  if (bodyHandle) {
    const speed = await page.evaluate(body => body.innerHTML, bodyHandle);
    await browser.close();

    if (res) {
      return res.send({ timestamp: new Date().toISOString(), speed });
    }

    return Sped.create({ speed: +speed, timestamp: new Date() });
  }

  return setTimeout(checkForSucceeded, 5000, res, browser, page);
};

const launchBrowser = async (res) => {
  const opts = process.env.NODE_ENV === 'production'
    ? { args: ['--no-sandbox', '--disable-setuid-sandbox', '--headless', '--disable-gpu'], executablePath: '/usr/bin/chromium-browser' }
    : {};
  const browser = await puppeteer.launch(opts);
  const page = await browser.newPage();
  await page.goto('https://fast.com/');
  checkForSucceeded(res, browser, page, Sped);
};

export default launchBrowser;
