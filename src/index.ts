import consola from 'consola';
import {
  launchBrowser,
  openNewPage,
  reloadPage,
  loginEtsyUser,
  navigateToEtsyPeoplePage,
  closeBrowser,
} from './automation';
import { Credentials, EtsyMarketingOptions } from './types';
import { submitEtsyMarketingMessage } from './automation/etsy';

const defaultMarketingOptions: EtsyMarketingOptions = {
  personUsername: process.env.ETSY_MARKETING_USERNAME,
  CONVO_SUBMIT_FLAG: Boolean(
    parseInt(process.env.ETSY_MARKETING_CONVO_SUBMIT_FLAG),
  ),
};

export const marketEtsyPerson = (
  marketingOptions: EtsyMarketingOptions = defaultMarketingOptions,
) => (credentials: Credentials): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    const operationalOptions = {
      ...defaultMarketingOptions,
      ...marketingOptions,
    };

    const { email, password } = credentials;

    const browser = await launchBrowser({ headless: true });
    const page = await openNewPage('https://etsy.com')(browser);

    consola.info('LOGGING IN...');
    await loginEtsyUser({ email, password })(page);

    consola.info(`NAVIGATING TO people/${marketingOptions.personUsername}...`);
    await navigateToEtsyPeoplePage({
      username: marketingOptions.personUsername,
    })(page);
    consola.info(`SUBMITTING MESSAGE TO ${marketingOptions.personUsername}...`);
    await submitEtsyMarketingMessage(operationalOptions)(page);

    await closeBrowser(browser);

    resolve();
  });
};
