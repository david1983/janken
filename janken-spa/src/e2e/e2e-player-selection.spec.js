const puppeteer = require('puppeteer');

describe('the player selection page', () => {
  it('should render without crashing', async () => {
    const browser = await puppeteer.launch({ headless: true }); // default is true
    const page = await browser.newPage();
    await page.goto('http://localhost:3000');
    const dimensions = await page.evaluate(() => ({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      deviceScaleFactor: window.devicePixelRatio,
    }));
    expect(dimensions.width).toBe(800);
    expect(dimensions.height).toBe(600);
    expect(dimensions.deviceScaleFactor).toBe(1);
    await browser.close();
  });

  it('should renders the app bar', async () => {
    const browser = await puppeteer.launch({ headless: true }); // default is true
    const page = await browser.newPage();
    await page.goto('http://localhost:3000');
    const AppBar = await page.evaluate(() => document.querySelectorAll('header'));
    console.log(AppBar);
    await browser.close();
  });
});
