import { test } from '../util/testcontainer.ts';
import { expect } from '@playwright/test';
import { GooglePage } from '../pageobjects/googlepage.ts'
import { GoogleResultsPage } from '../pageobjects/googleresultspage.ts';

test('verify google loads', { tag: '@p1'}, async ({ container }) => {
    const googlePage: GooglePage = await container.gotoGooglePage();

    await expect(await googlePage.hasDoodle(), 'Google should have a doodle').toBeTruthy();
});

test('verify google can search', { tag: '@p2'}, async ({ container }) => {
    const googlePage: GooglePage = await container.gotoGooglePage();

    const googleResultsPage: GoogleResultsPage = await googlePage.search('manage my cafe');

    await expect(googleResultsPage.hasResults(), "Some results should have returned").toBeTruthy();
});

test('verify google search returns expected results', { tag: '@p2'}, async ({ container }) => {
    const googlePage: GooglePage = await container.gotoGooglePage();

    const googleResultsPage: GoogleResultsPage = await googlePage.search('manage my cafe');

    const results: string[] = await googleResultsPage.getResults();

    await expect(results.length, 'Should be more than 0').toBeGreaterThan(0);

    await expect(results, 'missing results').toContain('Manage My Cafe');
});