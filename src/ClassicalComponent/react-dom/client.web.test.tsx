import test, { I } from "testeranto/src/SubPackages/react-dom/component/web";
import { IPartialWebInterface, ITestImplementation } from "testeranto/src/Types";

import { assert } from "chai";

import { ClassicalComponent, IProps } from "..";
import { O } from "../static.spec";

import { IStore } from "testeranto/src/SubPackages/react-dom/component/web";

type M = {
  givens: {
    [K in keyof O["givens"]]: IProps;
  };

  whens: {
    [K in keyof O["whens"]]: (
      ...x
    ) => (s: IStore) => Promise<any>;
  };

  thens: {
    [K in keyof O["thens"]]: (expectation: any) => (s: IStore) => Promise<void>;
  };

  // checks: {
  //   [K in keyof bddout["checks"]]: IStoreShape;
  // };


}

const ClassicalComponentReactDomImplementation: ITestImplementation<I, O, M> = {
  suites: {
    Default: "Classical Component, react-dom, client.web",
  },
  givens: {
    AnEmptyState: { foo: "bar" },
  },
  whens: {
    IClickTheHeader: () =>
      async ({ htmlElement }) => {
        const e = htmlElement.querySelector("#theHeader") as HTMLButtonElement;
        assert(e);
        e.click()
      },
    IClickTheButton:
      () =>
        async ({ htmlElement }) => {
          const e = htmlElement.querySelector("#theButton") as HTMLButtonElement;
          assert(e);
          e.click();
        }

  },
  thens: {
    ThePropsIs:
      (expectation) =>
        async ({ htmlElement }) => {
          const elem = htmlElement.querySelector("#theProps")
          assert(elem)
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
          assert(elem)
          const found = elem.innerHTML;
          assert.deepEqual(
            found,
            JSON.stringify(expectation)
          );

        }
  },
  checks: {
    AnEmptyState: () => () => {
      return { props: {} };
    },
  },
};

const testInterface: IPartialWebInterface<I> = {
  // afterEach: async function (store, ndx, utils) {
  //   // const p = await utils.page() as string;
  //   // await utils.writeFileSync("pageUid.txt", p);
  //   // await utils.customScreenShot({ path: "result.png" }, p)
  //   return
  // },
};

export default test<O, M>(
  ClassicalComponent,
  ClassicalComponentSpec,
  ClassicalComponentReactDomImplementation,
  testInterface,
);
