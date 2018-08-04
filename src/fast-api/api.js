import puppeteer from 'puppeteer';
import { createNewSped } from '../helpers/queries';

const checkForSucceeded = async (browser, page) => {
  const elHandle = await page.$('#speed-value.succeeded');
  if (elHandle) {
    const speed = await page.evaluate(el => el.innerHTML, elHandle);
    await browser.close();

    return createNewSped(+speed);
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
