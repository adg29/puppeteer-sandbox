import { Page } from 'puppeteer';
import { Credentials, EtsyPerson, EtsyMarketingOptions } from '../types';
import consolaGlobalInstance from 'consola';
const Sentencer = require('sentencer');

let MARKETING_MESSAGE = 'Hello! Saw that we have some common interests';
MARKETING_MESSAGE = Sentencer.make('This is {{ an_adjective }} {{ noun }}.');
/**
 * Logs in the user using given credentials
 */
export const loginEtsyUser = (credentials: Credentials) => async (
  page: Page,
): Promise<void> => {
  const { email, password } = credentials;

  const SELECTORS = {
    SIGNIN_HEADER_CLASSNAME: '.signin-header-action',
    SIGNIN_FORM_USERNAME_INPUT: 'form#join-neu-form input[name=email]',
    SIGNIN_FORM_PASSWORD_INPUT: 'form#join-neu-form input[name=password]',
    SIGNIN_FORM_SUBMIT: 'form#join-neu-form button[type=submit]',
    SIGNIN_WELCOME_SELECTOR: '[data-appears-component-name*="WelcomeRow"]',
  };

  let signInSignal = await page.$(SELECTORS.SIGNIN_HEADER_CLASSNAME);
  if (signInSignal) {
    await Promise.all([
      page.click(SELECTORS.SIGNIN_HEADER_CLASSNAME),
      page.waitForSelector(SELECTORS.SIGNIN_FORM_USERNAME_INPUT),
    ]);

    /* Enter email */
    await page.focus(SELECTORS.SIGNIN_FORM_USERNAME_INPUT);
    await page.keyboard.type(email);

    /* Enter password */
    await page.focus(SELECTORS.SIGNIN_FORM_PASSWORD_INPUT);
    await page.keyboard.type(password);

    let WAIT_RANDOM = randomIntFromInterval(2000, 5000);
    /* Submit login form */
    await Promise.all([
      page.click(SELECTORS.SIGNIN_FORM_SUBMIT),
      page.waitFor(WAIT_RANDOM),
    ]);
  } else {
    console.info('ALREADY LOGGED IN...');
    await page.waitForFunction(
      `document.querySelector('[data-appears-component-name*="WelcomeRow"]').innerText.includes("Welcome back")`,
    );
  }
};

const randomIntFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * Navigates from the Home page to the Profile page
 */
export const navigateToEtsyPeoplePage = (etsyPerson: EtsyPerson) => async (
  page: Page,
): Promise<void> => {
  const SELECTORS = {
    CONVO_TRIGGER_SELECTOR: '.wt-show-md .convo-overlay-trigger',
    CONVO_COMPOSER_SELECTOR: 'form#chat-ui-composer textarea',
  };

  let WAIT_RANDOM = randomIntFromInterval(2000, 5000);

  await Promise.all([
    page.waitFor(WAIT_RANDOM),
    page.waitForNavigation(),
    page.goto(`https://etsy.com/people/${etsyPerson.username}`),
  ]);

  const convoTriggerElement = await page.waitForSelector(
    SELECTORS.CONVO_TRIGGER_SELECTOR,
  );
  convoTriggerElement.click();

  await page.waitForSelector(SELECTORS.CONVO_COMPOSER_SELECTOR);
  await page.focus(SELECTORS.CONVO_COMPOSER_SELECTOR);
  await page.waitFor(WAIT_RANDOM), await page.keyboard.type(MARKETING_MESSAGE);
};

export const submitEtsyMarketingMessage = (
  marketingOptions: EtsyMarketingOptions,
) => async (page: Page): Promise<void> => {
  const ELEMENTS = {
    CONVO_COMPOSER_SUBMIT_SELECTOR:
      'form#chat-ui-composer button[aria-label="Send chat message"]',
    CONVO_THREAD_SELECTOR: '.convo-details .thread',
  };

  if (marketingOptions.CONVO_SUBMIT_FLAG) {
    let convoSubmitElement = await page.waitForSelector(
      ELEMENTS.CONVO_COMPOSER_SUBMIT_SELECTOR,
    );
    await convoSubmitElement.click();

    await page.waitForSelector(ELEMENTS.CONVO_THREAD_SELECTOR);
    await page.waitForFunction(
      `document.querySelector('.convo-details .thread').innerText.includes('${MARKETING_MESSAGE}')`,
    );
  }
};
