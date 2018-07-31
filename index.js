import express from 'express';
import puppeteer from 'puppeteer';

const app = express();

const speeds = [];

const checkForSucceeded = async (res, browser, page) => {
  const bodyHandle = await page.$('#speed-value.succeeded');
  if (bodyHandle) {
    const speed = await page.evaluate(body => body.innerHTML, bodyHandle);
    await browser.close();

    if (res) {
      return res.send({ timestamp: new Date().toISOString(), speed });
    }

    return speeds.push({ timestamp: new Date().toISOString(), speed });
  }

  return setTimeout(checkForSucceeded, 5000, res, browser, page);
};

const launchBrowser = async (res) => {
  await puppeteer.launch().then(async (browser) => {
    const page = await browser.newPage();
    await page.goto('https://fast.com/');
    checkForSucceeded(res, browser, page);
  });
};

app.get('/', async (req, res) => {
  launchBrowser(res);
});

app.listen(3000, () => console.log('Listening on 3000.'));
