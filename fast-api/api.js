import puppeteer from 'puppeteer';

const checkForSucceeded = async (res, browser, page, array) => {
  const bodyHandle = await page.$('#speed-value.succeeded');
  if (bodyHandle) {
    const speed = await page.evaluate(body => body.innerHTML, bodyHandle);
    await browser.close();
    const record = { timestamp: new Date().toISOString(), speed };
    if (res) {
      return res.send(record);
    }

    console.log('Adding record to array:', record);
    return array.push(record);
  }

  return setTimeout(checkForSucceeded, 5000, res, browser, page);
};

const launchBrowser = async (res, array) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://fast.com/');
  checkForSucceeded(res, browser, page, array);
};

export default launchBrowser;
