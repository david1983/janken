import puppeteer from 'puppeteer';

jest.setTimeout(100000);
let browser;
let page;

describe('the player selection page', () => {
  beforeEach(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto('http://localhost:3000');
  });

  afterEach(async () => {
    await browser.close();
  });

  it('should render without crashing', async () => {
    const dimensions = await page.evaluate(() => ({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      deviceScaleFactor: window.devicePixelRatio,
    }));
    expect(dimensions.width).toBe(800);
    expect(dimensions.height).toBe(600);
    expect(dimensions.deviceScaleFactor).toBe(1);
  });


  it('should renders the app bar', async () => {
    const AppBar = await page.$('header');
    expect(AppBar).toBeTruthy();
    const appBarText = await page.$('.MuiTypography-h6');
    expect(appBarText).toBeTruthy();
  });

  it('should renders the player inputs', async () => {
    const PlayerSelectionInputs = await page.$$('.player-selection');
    expect(PlayerSelectionInputs).toBeTruthy();
    expect(PlayerSelectionInputs.length).toBe(2);
  });

  it('should render the start button', async () => {
    const StartButton = await page.$('.MuiButtonBase-root.MuiButton-root.player-selection-form-submit.MuiButton-contained.MuiButton-containedPrimary');
    expect(StartButton).toBeTruthy();
  });

  it('should start the game when start button is pressed', async () => {
    await page.goto('http://localhost:3000');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    await page.keyboard.type('a');
    await page.keyboard.press('Tab');
    await page.keyboard.type('b');
    await page.click('.player-selection-form-submit');

    expect(page.url()).toBe('http://localhost:3000/game');
  });
});
