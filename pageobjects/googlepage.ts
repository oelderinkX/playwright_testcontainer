import { expect, type Locator, type Page } from '@playwright/test'
import { AbstractPage } from '../util/abstractpage'
import { GoogleResultsPage } from '../pageobjects/googleresultspage'

export class GooglePage extends AbstractPage {
    private searchTextBox: Locator;
    private doodle: Locator;
    private searchButton: Locator;

    constructor(page: Page, url?: string) {
        super(page, url);

        this.searchTextBox = this.page.locator("css=textarea[title='Search']");
        this.doodle = this.page.locator("#hplogo");
        this.searchButton = this.page.locator("input[aria-label='Google Search']").last();
    }

    override async pageLoad(): Promise<void> {
        await super.pageLoad();
        console.log('loading GooglePage...');

        await expect(this.searchTextBox).toBeVisible();
    }

    async hasDoodle(): Promise<boolean> {
        return await this.doodle.isVisible();
    }

    async search(search: string): Promise<GoogleResultsPage> {
        await this.searchTextBox.fill(search);
        await this.searchButton.click();

        const page: GoogleResultsPage = new GoogleResultsPage(this.page);
        await page.pageLoad();
        
        return page;
    }
}