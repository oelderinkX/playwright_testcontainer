If you are new to Playwright like me, hopefully this small test suite might help a bit.  I'm using a test container that contains all the functionality I need when making my test cases, specifically Api client definitions, the initial method to call to open up the desired page (in my case google) and a dedicate async method to set up my environment.  This test suite also uses a singleton to access configurations, either based off the default value or an environment variable.  Of course, I'm using dotenv to load the .env file to set any extra environment variables I need (see playwright.config.ts)

# Install / Setup
`npm install`
`npx playwright install`

# Run all tests
`npx playwright test --headed`

# .env values
```
google_base_url=
dotnet_pass=Passed!
```