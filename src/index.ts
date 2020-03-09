import consola from 'consola';
import {
  launchBrowser,
  openNewPage,
  reloadPage,
  loginEtsyUser,
  navigateToEtsyPeoplePage,
} from './automation';
import { Credentials, EtsyMarketingOptions } from './types';

const defaultMarketingOptions: EtsyMarketingOptions = {
  personUsername: 'alangalan',
};

export const marketEtsyPerson = (
  marketingOptions: EtsyMarketingOptions = defaultMarketingOptions,
) => async (credentials: Credentials): Promise<void> => {
  const operationalOptions = {
    ...defaultMarketingOptions,
    ...marketingOptions,
  };

  const { email, password } = credentials;

  const browser = await launchBrowser({ headless: false });
  const page = await openNewPage('https://etsy.com')(browser);

  consola.info('LOGGING IN...');
  await loginEtsyUser({ email, password })(page);

  consola.info(`NAVIGATING TO people/${marketingOptions.personUsername}...`);
  await navigateToEtsyPeoplePage({ username: marketingOptions.personUsername })(
    page,
  );
};
