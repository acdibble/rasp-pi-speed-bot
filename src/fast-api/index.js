const puppeteer = require('puppeteer');
const { Sped } = require('../models');

const checkForSucceeded = async (browser, page) => {
  const elHandle = await page.$('#speed-value.succeeded');
  if (elHandle) {
    const speed = await page.evaluate(el => el.innerHTML, elHandle);
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

module.exports = launchBrowser;
