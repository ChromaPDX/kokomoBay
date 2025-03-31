import test from "testeranto/src/SubPackages/react-dom/component/web";
import { IPartialWebInterface } from "testeranto/src/Types";

import { ReactElement } from "react";
import ReactDom from "react-dom/client";
import { assert } from "chai";

import { ClassicalComponent } from "..";
import { ClassicalComponentSpec } from "../test.specification";

type IStore = {
  htmlElement: HTMLElement;
  reactElement: ReactElement;
  domRoot: ReactDom.Root;
};

const ClassicalComponentReactDomImplementation = {
  suites: {
    Default: "Classical Component, react-dom, client.web",
  },
  givens: {
    AnEmptyState: { foo: "bar" },
  },
  whens: {
    IClickTheHeader: () =>
      async ({ htmlElement }) => {
        htmlElement.querySelector("#theHeader").click()
      },
    IClickTheButton:
      () =>
        async ({ htmlElement }) => {
          htmlElement.querySelector("#theButton").click()
        }

  },
  thens: {
    ThePropsIs:
      (expectation) =>
        async ({ htmlElement, reactElement }) => {
          const elem = htmlElement.querySelector("#theProps")
          const found = elem.innerHTML;
          assert.deepEqual(
            JSON.parse(found),
            expectation
          );
        },

    TheStatusIs:
      (expectation) =>
        async ({ htmlElement }) => {
          const elem = htmlElement.querySelector("#theStat")
          const found = elem.innerHTML;
          assert.deepEqual(
            found,
            JSON.stringify(expectation)
          );

        }
  },
  checks: {
    AnEmptyState: () => () => {
      return {};
    },
  },
};

const testInterface: IPartialWebInterface<any> = {
  afterEach: async function (store: IStore, ndx, artificer, utils) {
    const p = await utils.page() as string;
    await utils.writeFileSync("pageUid.txt", p);
    await utils.customScreenShot({ path: "result.png" }, p)
  },
};

export default test(
  ClassicalComponent,
  ClassicalComponentSpec,
  ClassicalComponentReactDomImplementation,
  testInterface,
);
