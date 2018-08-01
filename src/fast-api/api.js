import puppeteer from 'puppeteer';
import { Sped } from '../models';

const checkForSucceeded = async (browser, page) => {
  const bodyHandle = await page.$('#speed-value.succeeded');
  if (bodyHandle) {
    const speed = await page.evaluate(body => body.innerHTML, bodyHandle);
    await browser.close();

    return Sped.create({ speed: +speed, timestamp: new Date() });
  }

  return setTimeout(checkForSucceeded, 5000, browser, page);
};

const launchBrowser = async () => {
  const opts = process.env.NODE_ENV === 'production'
    ? { args: ['--no-sandbox', '--disable-setuid-sandbox', '--headless', '--disable-gpu'], executablePath: '/usr/bin/chromium-browser' }
    : {};
  const browser = await puppeteer.launch(opts);
  const page = await browser.newPage();
  await page.goto('https://fast.com/');
  checkForSucceeded(browser, page);
};

export default launchBrowser;
