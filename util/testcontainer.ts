import { test as base } from '@playwright/test';
import type { Page } from '@playwright/test';
import { request } from '@playwright/test';
import type { APIRequestContext } from '@playwright/test';

import { CatFacts } from './catfacts';
import { ITestContainer } from '../interfaces/itestcontainer';

import { TestConfig } from '../config/testconfig';

import { GooglePage } from '../pageobjects/googlepage.ts';

export class TestContainer implements ITestContainer {
    private readonly page: Page;
    private readonly context: APIRequestContext;

    public catFacts: CatFacts;

    constructor(page: Page, context: APIRequestContext)
    {
        this.page = page;
        this.context = context;
    }

    async initialize()
    {
        this.catFacts = new CatFacts(this.context, TestConfig.instance.api.catFactsBaseUrl);
    }

    getContext()
    {
        return this.context;
    }

    getPage()
    {
        return this.page;
    }

    async gotoGooglePage(): Promise<GooglePage>
    {
        const page: GooglePage = new GooglePage(this.page, TestConfig.instance.google.baseUrl);
        await page.pageLoad();
        
        return page;
    }
}

export const test = base.extend<{ container: TestContainer }>({
    container: async ({ page }, use) => {
        const context = await request.newContext();
        const container = new TestContainer(page, context);

        await container.initialize();

        await use(container);
    }
});