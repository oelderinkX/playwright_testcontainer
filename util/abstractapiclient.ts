import type { APIRequestContext } from '@playwright/test';

export abstract class AbstractApiClient {
    protected readonly context: APIRequestContext;

    constructor(context : APIRequestContext) {
        this.context = context;
    }
}