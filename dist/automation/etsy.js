"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Sentencer = require('sentencer');
let MARKETING_MESSAGE = 'Hello! Saw that we have some common interests';
MARKETING_MESSAGE = Sentencer.make('This is {{ an_adjective }} {{ noun }}.');
/**
 * Logs in the user using given credentials
 */
exports.loginEtsyUser = (credentials) => (page) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = credentials;
    const SELECTORS = {
        SIGNIN_HEADER_CLASSNAME: '.signin-header-action',
        SIGNIN_FORM_USERNAME_INPUT: 'form#join-neu-form input[name=email]',
        SIGNIN_FORM_PASSWORD_INPUT: 'form#join-neu-form input[name=password]',
        SIGNIN_FORM_SUBMIT: 'form#join-neu-form button[type=submit]',
        SIGNIN_WELCOME_SELECTOR: '[data-appears-component-name*="WelcomeRow"]',
    };
    let signInSignal = yield page.$(SELECTORS.SIGNIN_HEADER_CLASSNAME);
    if (signInSignal) {
        yield Promise.all([
            page.click(SELECTORS.SIGNIN_HEADER_CLASSNAME),
            page.waitForSelector(SELECTORS.SIGNIN_FORM_USERNAME_INPUT),
        ]);
        /* Enter email */
        yield page.focus(SELECTORS.SIGNIN_FORM_USERNAME_INPUT);
        yield page.keyboard.type(email);
        /* Enter password */
        yield page.focus(SELECTORS.SIGNIN_FORM_PASSWORD_INPUT);
        yield page.keyboard.type(password);
        /* Submit login form */
        yield Promise.all([
            page.click(SELECTORS.SIGNIN_FORM_SUBMIT),
            page.waitForFunction(`document.querySelector(${SELECTORS.SIGNIN_WELCOME_SELECTOR}).innerText.includes("Welcome back")`),
        ]);
    }
    else {
        console.info('ALREADY LOGGED IN...');
        yield page.waitForFunction(`document.querySelector('[data-appears-component-name*="WelcomeRow"]').innerText.includes("Welcome back")`);
    }
});
const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};
/**
 * Navigates from the Home page to the Profile page
 */
exports.navigateToEtsyPeoplePage = (etsyPerson) => (page) => __awaiter(void 0, void 0, void 0, function* () {
    const SELECTORS = {
        CONVO_TRIGGER_SELECTOR: '.wt-show-md .convo-overlay-trigger',
        CONVO_COMPOSER_SELECTOR: 'form#chat-ui-composer textarea',
    };
    let WAIT_RANDOM = randomIntFromInterval(2000, 5000);
    yield Promise.all([
        page.waitFor(WAIT_RANDOM),
        page.waitForNavigation(),
        page.goto(`https://etsy.com/people/${etsyPerson.username}`),
    ]);
    const convoTriggerElement = yield page.waitForSelector(SELECTORS.CONVO_TRIGGER_SELECTOR);
    convoTriggerElement.click();
    yield page.waitForSelector(SELECTORS.CONVO_COMPOSER_SELECTOR);
    yield page.focus(SELECTORS.CONVO_COMPOSER_SELECTOR);
    yield page.waitFor(WAIT_RANDOM), yield page.keyboard.type(MARKETING_MESSAGE);
});
exports.submitEtsyMarketingMessage = (marketingOptions) => (page) => __awaiter(void 0, void 0, void 0, function* () {
    const ELEMENTS = {
        CONVO_COMPOSER_SUBMIT_SELECTOR: 'form#chat-ui-composer button[aria-label="Send chat message"]',
        CONVO_THREAD_SELECTOR: '.convo-details .thread',
    };
    if (marketingOptions.CONVO_SUBMIT_FLAG) {
        let convoSubmitElement = yield page.waitForSelector(ELEMENTS.CONVO_COMPOSER_SUBMIT_SELECTOR);
        yield convoSubmitElement.click();
        yield page.waitForSelector(ELEMENTS.CONVO_THREAD_SELECTOR);
        yield page.waitForFunction(`document.querySelector('.convo-details .thread').innerText.includes('${MARKETING_MESSAGE}')`);
    }
});
//# sourceMappingURL=etsy.js.map