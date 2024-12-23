import { expect, type Locator, type Page } from '@playwright/test'
import { AbstractPage } from '../util/abstractpage'

export class GoogleResultsPage extends AbstractPage {
    private searchResults: Locator;
    private resultsArea: Locator;

    constructor(page: Page, url?: string) {
        super(page, url);

        this.searchResults = this.page.locator('#search');
        this.resultsArea = this.page.locator('#rso');
    }

    override async pageLoad(): Promise<void> {
        await super.pageLoad();
        console.log('loading GoogleResultsPage...');

        await expect(this.searchResults).toBeVisible();
        await expect(this.resultsArea).toBeVisible();
    }

    async hasResults(): Promise<boolean> {
        return await this.resultsArea.locator('h3').count() > 0;
    }

    async getResults(): Promise<string[]> {
        let results: string[] = [];

        const resultElements = await this.resultsArea.locator('h3')

        for(let i = 0; i < await resultElements.count(); i++) 
        {
            const r2 = await resultElements.nth(i).innerText();
            results.push(r2);
        }

        return results;
    }
}