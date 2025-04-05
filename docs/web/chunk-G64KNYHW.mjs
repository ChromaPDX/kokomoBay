import {
  require_jsx_runtime,
  require_react
} from "./chunk-ZZ3ODJ3Z.mjs";
import {
  __toESM
} from "./chunk-SZDDWZIA.mjs";

// src/ClassicalComponent/index.tsx
var import_react = __toESM(require_react(), 1);
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var ClassicalComponent = class extends import_react.default.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
  render() {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { border: "3px solid black" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { id: "theHeader", children: "Hello Marcus" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", { id: "theProps", children: JSON.stringify(this.props) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
        "foo: ",
        this.props.foo
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", { id: "theStat", children: JSON.stringify(this.state) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
        "count: ",
        this.state.count,
        " times"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { id: "theButton", onClick: async () => {
        this.setState({ count: this.state.count + 1 });
      }, children: "Click" })
    ] });
  }
};

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

export {
  ClassicalComponent,
  ClassicalComponentSpec
};
