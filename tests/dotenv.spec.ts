import { test } from '../util/testcontainer.ts';
import { expect } from '@playwright/test';
import { TestConfig } from '../config/testconfig';

test('verify .env file has been set up', { tag: '@p1'}, async ({ container }) => {
    if (process.platform.startsWith('win')) {
      console.log(`Using .env from ${process.env.USERPROFILE}\\.env`);
    } else {
      console.log(`Using .env from /Users/${process.env.USER}/.env`);
    }

    await expect(TestConfig.instance.dotenv.pass, 'Have you set up the .env in the expected folder ?').toEqual('Passed!');
});