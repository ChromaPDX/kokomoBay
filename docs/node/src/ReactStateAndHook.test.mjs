import { createRequire } from 'module';const require = createRequire(import.meta.url);
import {
  node_default,
  require_react
} from "../chunk-DUG2EPO4.mjs";
import "../chunk-XWE4N4UG.mjs";
import "../chunk-ZTDVYA3Q.mjs";
import "../chunk-OI5YMCUL.mjs";
import "../chunk-6D4LK6R2.mjs";
import "../chunk-JWYWNN27.mjs";
import "../chunk-KNOLJKC2.mjs";
import {
  __toESM
} from "../chunk-PM7MAOUR.mjs";

// src/ReactStateAndHook.test.tsx
import assert from "assert";

// src/ReactStateAndHook.tsx
var import_react = __toESM(require_react(), 1);
function ReactStateAndHook() {
  const [count, setCount] = (0, import_react.useState)(0);
  (0, import_react.useEffect)(() => {
    console.log(`You have clicked the first button ${count} times`);
  }, [count]);
  return /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("pre", { "data-testid": "counter" }, count), /* @__PURE__ */ import_react.default.createElement(
    "button",
    {
      onClick: () => setCount((prev) => prev + 1),
      "data-testid": "increment-button"
    },
    "Click me"
  ));
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
