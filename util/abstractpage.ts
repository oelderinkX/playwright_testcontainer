import { expect, type Locator, type Page } from '@playwright/test';
import { IPage } from '../interfaces/ipage'

export abstract class AbstractPage implements IPage {
    protected readonly page: Page;
    protected readonly url?: string;

    private html: Locator;

    constructor(page: Page, url?: string) {
        this.page = page;
        this.url = url;
    }

    async pageLoad(): Promise<void> {
        if (typeof this.url !== 'undefined') {
            console.log('Navigating to url ' + this.url);
            await this.page.goto(this.url);
        }   

        console.log('loading Html...');
        this.html = this.page.locator('html');
        await expect(this.html).toBeVisible();
    }

    async getCookieValue(cookieName: string): Promise<string> {
        const cookies = await this.page.context().cookies();
        const value = cookies.find((cookie) => cookie.name === cookieName);

        return value?.value || '';
    }
}