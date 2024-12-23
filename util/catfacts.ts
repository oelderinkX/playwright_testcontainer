import type { APIRequestContext } from '@playwright/test';
import { AbstractApiClient } from './abstractapiclient';

export class CatFacts extends AbstractApiClient {
    private readonly baseUrl: string;

    constructor(context : APIRequestContext, baseUrl: string) {
        super(context);

        this.baseUrl = baseUrl;
    }

    async getACatFact(): Promise<string> {
        const response = await this.context.get(`${this.baseUrl}`, { 
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json();

        return json.data[0];
    }
}