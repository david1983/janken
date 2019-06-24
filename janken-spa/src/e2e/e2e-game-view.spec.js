import puppeteer from 'puppeteer';

let browser;
let page;

describe('the player selection page', () => {
  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  it('should redirect to / if the players are not defined', async () => {
    await page.goto('http://localhost:3000/game');
    await page.evaluate(() => document);
    expect(page.url()).toBe('http://localhost:3000/');
  });

  it('should renders the app bar', async () => {
    const AppBar = await page.$('header');
    expect(AppBar).toBeTruthy();
    const appBarText = await page.$('.MuiTypography-h6');
    expect(appBarText).toBeTruthy();
  });
});
