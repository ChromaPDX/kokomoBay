import { assert } from "chai";

import { PuppeteerHttpTesteranto } from "./puppeteer-http.testeranto.test";
import { serverFactory } from "./server";

export class ServerHttpPuppeteerTesteranto extends PuppeteerHttpTesteranto<
  {
    suites: {
      Default: string;
    };
    givens: {
      AnEmptyState;
    };
    whens: {
      PostToStatus: [string];
      PostToAdd: [number];
    };
    thens: {
      TheStatusIs: [string];
      TheNumberIs: [number];
    };
    checks: {
      AnEmptyState;
    };
  },
  any
> {
  constructor() {
    super(
      {
        Suites: {
          Default: "some default Suite",
        },
        Givens: {
          /* @ts-ignore:next-line */
          AnEmptyState: () => {},
        },
        Whens: {
          PostToStatus: (status: string) => () => {
            return ["put_status", status];
          },
          PostToAdd: (n: number) => () => ["put_number", n.toString()],
        },
        Thens: {
          TheStatusIs: (status: string) => () => ["get_status", status],
          TheNumberIs: (number: number) => () => ["get_number", number],
        },
        Checks: {
          /* @ts-ignore:next-line */
          AnEmptyState: () => {},
        },
      },

      (Suite, Given, When, Then, Check) => {
        return [
          Suite.Default(
            "Testing the Server with Puppeteer",
            [
              Given.AnEmptyState(
                "a Puppeteer boringfeature",
                [],
                [Then.TheStatusIs("some great status")]
              ),
              Given.AnEmptyState(
                "a Puppeteer feature",
                [When.PostToStatus("hello")],
                [Then.TheStatusIs("hello")]
              ),
              Given.AnEmptyState(
                "a Puppeteer feature",
                [When.PostToStatus("hello"), When.PostToStatus("aloha")],
                [Then.TheStatusIs("aloha")]
              ),
              Given.AnEmptyState("a feature", [], [Then.TheNumberIs(0)]),
              Given.AnEmptyState(
                "a Puppeteer feature",
                [When.PostToAdd(1), When.PostToAdd(2)],
                [Then.TheNumberIs(3)]
              ),
              Given.AnEmptyState(
                "another Puppeteer feature",
                [
                  When.PostToStatus("aloha"),
                  When.PostToAdd(4),
                  When.PostToStatus("hello"),
                  When.PostToAdd(3),
                ],
                [Then.TheStatusIs("hello"), Then.TheNumberIs(7)]
              ),
            ],
            [
              Check.AnEmptyState(
                "puppeteer imperative style",
                async ({ PostToAdd }, { TheNumberIs }) => {
                  await PostToAdd(2);
                  await PostToAdd(3);
                  await TheNumberIs(5);
                  await PostToAdd(2);
                  await TheNumberIs(7);
                  await PostToAdd(3);
                  await TheNumberIs(10);
                }
              ),
              Check.AnEmptyState(
                "puppeteer imperative style II",
                async ({ PostToAdd }, { TheNumberIs }) => {
                  const a = await PostToAdd(2);
                  const b = parseInt(await PostToAdd(3));
                  await TheNumberIs(b);
                  await PostToAdd(2);
                  await TheNumberIs(7);
                  await PostToAdd(3);
                  await TheNumberIs(10);
                  assert.equal(await PostToAdd(-15), -5);
                  await TheNumberIs(-5);
                }
              ),
            ]
          ),
        ];
      },

      serverFactory
    );
  }
}