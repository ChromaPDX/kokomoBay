import { createRequire } from 'module';const require = createRequire(import.meta.url);
import {
  node_default
} from "../chunk-NZQTHT7X.mjs";
import "../chunk-6FWMRXFT.mjs";
import "../chunk-5WIVDWJL.mjs";
import "../chunk-M7BKJ4RF.mjs";

// src/ReactStateAndHook.test.tsx
import assert from "assert";

// src/ReactStateAndHook.tsx
import { useState, useEffect } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
function ReactStateAndHook() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log(`You have clicked the first button ${count} time`);
  }, [count]);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("pre", { "data-testid": "counter", children: count }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setCount((prev) => prev + 1),
        "data-testid": "increment-button",
        children: "Click me"
      }
    )
  ] });
}
var ReactStateAndHook_default = ReactStateAndHook;

// src/ReactStateAndHook.test.tsx
var Specification = (Suite, Given, When, Then, Check) => {
  return [
    Suite.Default(
      "Testing the ReactStateAndHook element",
      {
        "test0": Given.Default(
          [`https://api.github.com/repos/adamwong246/testeranto/issues/7`],
          [],
          [Then.TheCounterIs(0)]
        ),
        "test1": Given.Default(
          [`https://api.github.com/repos/adamwong246/testeranto/issues/7`],
          [When.IClick()],
          [Then.TheCounterIs(1)]
        ),
        "test2": Given.Default(
          [`hello`],
          [When.IClick(), When.IClick(), When.IClick()],
          [Then.TheCounterIs(3)]
        ),
        "test3": Given.Default(
          [`hello`],
          [When.IClick(), When.IClick()],
          [Then.TheCounterIs(2)]
        )
      },
      []
    )
  ];
};
var Implementation = {
  suites: {
    Default: "a default suite"
  },
  givens: {
    Default: () => {
      return;
    }
  },
  whens: {
    IClick: () => (rtr) => rtr.root.findByProps({ "data-testid": "increment-button" }).props.onClick()
  },
  thens: {
    TheCounterIs: (counter) => (rtr) => {
      const preElement = rtr.root.findByProps({ "data-testid": "counter" });
      return assert.equal(
        preElement.children[0],
        counter.toString()
      );
    }
  },
  checks: {
    /* @ts-ignore:next-line */
    AnEmptyState: () => {
      return {};
    }
  }
};
var ReactStateAndHook_test_default = node_default(
  Implementation,
  Specification,
  ReactStateAndHook_default
);
export {
  ReactStateAndHook_test_default as default
};
