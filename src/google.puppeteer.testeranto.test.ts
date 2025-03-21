import { assert } from "chai";

import { PuppeteerTesteranto } from "../myTests/puppeteer.testeranto.test";

export default PuppeteerTesteranto<{
  suites: {
    Default: string;
  };
  givens: {
    AnEmptyState: [];
  };
  whens: {
    IGoto: [string];
  };
  thens: {
    WaitForXPath: [string];
  };
  checks: {
    AnEmptyState: [];
  };
}>(
  {
    headless: true,
    slowMo: 1,
  },
  {
    suites: {
      Default: "some default Suite.",
    },
    givens: {
      AnEmptyState: async () => {
        // await driver.manage().deleteAllCookies();
      },
    },
    whens: {
      IGoto: (url) => async (store) => {
        await store.page.goto(url);
      },
    },
    thens: {
      WaitForXPath:
        (someString) =>
          async ({ page }) => {
            try {
              await page.waitForXPath(`//*[text()="${someString}"]`, { timeout: 1000 });
              return [assert.equal, true, false];
            } catch {
              return [assert.equal, true, true];
            }
          }
    },
    checks: {
      AnEmptyState: () => {
        return;
      },
    },
  },

  (Suite, Given, When, Then, Check) => {
    return [
      Suite.Default(
        "Testing the AOF portal.",
        {
          "test0": Given.AnEmptyState(
            [],
            [
              When.IGoto("https://www.google.com")
            ],
            [
              Then.WaitForXPath(`//*[@value="I'm Feeling Lucky"]`)
            ]
          )
        },
        []
      ),
    ];
  }
);
