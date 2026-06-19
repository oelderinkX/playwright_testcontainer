import { type Locator, type Page } from '@playwright/test'
import { AbstractPage } from '../util/abstractpage'

export class GoogleResultsPage extends AbstractPage {
    private searchResults: Locator;
    private resultsArea: Locator;

    constructor(page: Page, url?: string) {
        super(page, url);

        this.searchResults = page.locator('#search');
        this.resultsArea = page.locator('#rso');
    }

    override async pageLoad(): Promise<void> {
        await super.pageLoad();
        console.log('loading GoogleResultsPage...');

        await this.searchResults.waitFor();
        await this.resultsArea.waitFor();
    }

    async hasResults(): Promise<boolean> {
        return await this.resultsArea.locator('h3').count() > 0;
    }

    async getResults(): Promise<string[]> {
        let results: string[] = [];

        const resultElements = this.resultsArea.locator('h3')

        for(let i = 0; i < await resultElements.count(); i++) {
            const r2: string = await resultElements.nth(i).innerText();
            results.push(r2);
        }

        return results;
    }
}