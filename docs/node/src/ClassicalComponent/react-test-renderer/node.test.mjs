import { createRequire } from 'module';const require = createRequire(import.meta.url);
import {
  require_react_test_renderer
} from "../../../chunk-6FWMRXFT.mjs";
import {
  ClassicalComponent
} from "../../../chunk-I2AXMH3H.mjs";
import {
  Node_default
} from "../../../chunk-5WIVDWJL.mjs";
import {
  assert
} from "../../../chunk-BFDDKUUP.mjs";
import {
  __toESM
} from "../../../chunk-M7BKJ4RF.mjs";

// ../testeranto/dist/module/src/SubPackages/react-test-renderer/component/interface.js
var import_react_test_renderer = __toESM(require_react_test_renderer(), 1);
import React from "react";
var testInterface = {
  beforeEach: function(CComponent, propsAndChildren) {
    function Link(proper) {
      return React.createElement(CComponent, proper(), []);
    }
    return new Promise((res, rej) => {
      (0, import_react_test_renderer.act)(async () => {
        const testRenderer = await import_react_test_renderer.default.create(Link(propsAndChildren));
        res(testRenderer);
      });
    });
  },
  andWhen: async function(renderer2, whenCB) {
    await (0, import_react_test_renderer.act)(() => whenCB(renderer2));
    return renderer2;
  },
  // andWhen: function (s: Store, whenCB): Promise<Selection> {
  //   return whenCB()(s);
  // },
  butThen: async function(s, thenCB, tr) {
    return thenCB(s);
  },
  afterEach: async function(store, ndx, artificer) {
    return {};
  },
  afterAll: (store, artificer) => {
    return;
  }
};

// ../testeranto/dist/module/src/SubPackages/react-test-renderer/component/node.js
var node_default = (testImplementations, testSpecifications, testInput) => Node_default(testInput, testSpecifications, testImplementations, testInterface);

// src/ClassicalComponent/test.specification.ts
var ClassicalComponentSpec = (Suite, Given, When, Then) => {
  return [
    Suite.Default(
      "a classical react component",
      {
        test0: Given.AnEmptyState(
          [`I click 4 times and the count is 3`],
          [
            When.IClickTheButton(),
            When.IClickTheButton(),
            When.IClickTheButton(),
            When.IClickTheHeader()
            // When.IClickTheButton(),
          ],
          [
            Then.ThePropsIs({ foo: "bar", children: [] }),
            Then.TheStatusIs({ count: 3 })
          ]
        ),
        test1: Given.AnEmptyState(
          [`Count is 1 by default`],
          [When.IClickTheButton()],
          [
            Then.ThePropsIs({ foo: "bar", children: [] }),
            Then.TheStatusIs({ count: 1 })
          ]
        ),
        test2: Given.AnEmptyState(
          [`0`],
          [
            When.IClickTheButton(),
            When.IClickTheButton(),
            When.IClickTheButton(),
            When.IClickTheButton(),
            When.IClickTheButton(),
            When.IClickTheButton(),
            When.IClickTheButton(),
            When.IClickTheButton(),
            When.IClickTheButton()
          ],
          [Then.TheStatusIs({ count: 9 })]
        ),
        test3: Given.AnEmptyState(
          [`0`],
          [When.IClickTheButton(), When.IClickTheButton()],
          [Then.TheStatusIs({ count: 2 })]
        )
      },
      []
    )
  ];
};

// src/ClassicalComponent/react-test-renderer/test.implementation.ts
var testImplementation = {
  suites: {
    Default: "default"
  },
  givens: {
    AnEmptyState: () => {
      return { foo: "bar" };
    }
  },
  whens: {
    IClickTheButton: () => async (component) => {
      component.root.findByType("button").props.onClick();
    },
    IClickTheHeader: () => async (component) => {
      component.root.findByType("h1").props.onClick();
    }
  },
  thens: {
    ThePropsIs: (expectation) => (component) => {
      const propsElement = component.root.findByProps({ id: "theProps" });
      return assert.deepEqual(
        JSON.parse(propsElement.props.children),
        expectation
      );
    },
    TheStatusIs: (expectation) => (component) => {
      const statElement = component.root.findByProps({ id: "theStat" });
      const actual = JSON.parse(statElement.props.children);
      return assert.deepEqual(
        actual,
        expectation,
        "the status was not as expected"
      );
    }
  },
  checks: {
    AnEmptyState: () => {
      return { foo: "bar" };
    }
  }
};

// src/ClassicalComponent/react-test-renderer/node.test.tsx
var node_test_default = node_default(
  testImplementation,
  ClassicalComponentSpec,
  ClassicalComponent
);
export {
  node_test_default as default
};
