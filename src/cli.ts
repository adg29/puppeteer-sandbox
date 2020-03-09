#!/usr/bin/env node

import inquirer from 'inquirer';
import consola from 'consola';
import { marketEtsyPerson } from '.';

(async () => {
  const { email, password, etsyPersonUsername } = await inquirer.prompt([
    {
      type: 'input',
      name: 'email',
      message: 'Enter email:',
      default: process.env.ETSY_USERNAME,
    },
    {
      type: 'password',
      name: 'password',
      message: 'Enter password:',
      mask: '*',
      default: process.env.ETSY_PASSWORD,
    },
    {
      type: 'input',
      name: 'etsyPersonUsername',
      message: 'Enter Etsy Person Username:',
      default: process.env.ETSY_MARKETING_USERNAME,
    },
  ]);

  try {
    await marketEtsyPerson({
      personUsername: etsyPersonUsername,
      CONVO_SUBMIT_FLAG: Boolean(process.env.ETSY_MARKETING_CONVO_SUBMIT_FLAG),
    })({
      email,
      password,
    });
  } catch (error) {
    consola.error(error);
    process.exitCode = 1;
  }
})();
