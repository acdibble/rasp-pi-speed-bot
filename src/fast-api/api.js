import puppeteer from 'puppeteer';
import Sped from '../models/sped';

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
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://fast.com/');
  checkForSucceeded(res, browser, page, Sped);
};

export default launchBrowser;
