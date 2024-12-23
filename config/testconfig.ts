import { GoogleConfig } from './googleconfig';
import { DotEnvConfig } from './dotenvconfig';
import { ApiConfig } from './apiconfig';

export class TestConfig {
    static #instance: TestConfig;

    private constructor() { }

    public static get instance(): TestConfig {
        if (!TestConfig.#instance) {
            TestConfig.#instance = new TestConfig();
        }

        return TestConfig.#instance;
    }

    public google: GoogleConfig = new GoogleConfig();
    public dotenv: DotEnvConfig = new DotEnvConfig();
    public api: ApiConfig = new ApiConfig();
}