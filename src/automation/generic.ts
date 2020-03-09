// puppeteer-extra is a drop-in replacement for puppeteer,
// it augments the installed puppeteer with plugin functionality
import puppeteer from 'puppeteer-extra';

// add stealth plugin and use defaults (all evasion techniques)
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { Browser, Page, LaunchOptions } from 'puppeteer';

puppeteer.use(StealthPlugin());

/**
 * Spawns a browser instance
 */
export const launchBrowser = async (
  options: LaunchOptions,
): Promise<Browser> => {
  const browser = await puppeteer.launch({
    userDataDir: './user_data',
    args: [
      '--disable-notifications',
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ],
    ...options,
  });

  return browser;
};

/**
 * Destroys the browser instance
 */
export const closeBrowser = async (browser: Browser): Promise<void> => {
  await browser.close();
};

/**
 * Opens a new browser tab on given URL
 */
export const openNewPage = (url: string) => async (
  browser: Browser,
): Promise<Page> => {
  const page = await browser.newPage();
  await page.goto(url);

  return page;
};

/**
 * Reloads page
 */
export const reloadPage = async (page: Page): Promise<void> => {
  await page.reload();
};
