import { test } from '../util/testcontainer.ts';
import { expect } from '@playwright/test';

test('verify cat facts work', { tag: '@p1'}, async ({ container }) => {
    const factAboutACat: string = await container.catFacts.getACatFact();

    console.log(factAboutACat);

    await expect(factAboutACat, 'some kind of cat fact should have been returned').not.toBeNull();
});