import {
  Web_default,
  require_react,
  require_react_dom
} from "../../../chunk-YXYD2XK6.mjs";
import {
  assert
} from "../../../chunk-MNC4BLRT.mjs";
import "../../../chunk-2MX732QA.mjs";
import "../../../chunk-BHMMMWLP.mjs";
import "../../../chunk-NHP6O7YW.mjs";
import {
  __commonJS,
  __toESM
} from "../../../chunk-3KGMXYRN.mjs";

// node_modules/react-dom/client.js
var require_client = __commonJS({
  "node_modules/react-dom/client.js"(exports) {
    "use strict";
    var m = require_react_dom();
    if (false) {
      exports.createRoot = m.createRoot;
      exports.hydrateRoot = m.hydrateRoot;
    } else {
      i = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      exports.createRoot = function(c, o) {
        i.usingClientEntryPoint = true;
        try {
          return m.createRoot(c, o);
        } finally {
          i.usingClientEntryPoint = false;
        }
      };
      exports.hydrateRoot = function(c, h, o) {
        i.usingClientEntryPoint = true;
        try {
          return m.hydrateRoot(c, h, o);
        } finally {
          i.usingClientEntryPoint = false;
        }
      };
    }
    var i;
  }
});

// node_modules/testeranto/dist/module/SubPackages/react-dom/component/web.js
var import_react = __toESM(require_react(), 1);
var import_client = __toESM(require_client(), 1);
var web_default = (testInput, testSpecifications, testImplementations, testInterface2) => {
  class TesterantoComponent extends testInput {
    constructor(props) {
      super(props);
      this.done = props.done;
    }
    componentDidMount() {
      super.componentDidMount && super.componentDidMount();
      return this.done(this);
    }
  }
  const t = Web_default(testInput, testSpecifications, testImplementations, {
    beforeAll: async (initialProps, artificer) => {
      return await new Promise((resolve, rej) => {
        const htmlElement = document.getElementById("root");
        if (htmlElement) {
          const domRoot = import_client.default.createRoot(htmlElement);
          domRoot.render((0, import_react.createElement)(TesterantoComponent, Object.assign(Object.assign({}, initialProps), { done: (reactElement) => {
            resolve({
              htmlElement,
              reactElement,
              domRoot
            });
          } }), []));
        }
      });
    },
    // beforeEach: async (
    //   s,
    //   initializer,
    //   testResource,
    //   artificer,
    //   initialValues
    // ): Promise<IStore> => {
    //   return new Promise((resolve, rej) => {
    //     console.log("beforeEach" + TesterantoComponent);
    //     // const domRoot = ReactDom.createRoot(htmlElement);
    //     // // Ignore these type errors
    //     // domRoot.render(
    //     //   createElement(
    //     //     TesterantoComponent,
    //     //     {
    //     //       ...initializer,
    //     //       done: (reactElement) => {
    //     //         resolve({
    //     //           htmlElement,
    //     //           reactElement,
    //     //           domRoot,
    //     //         });
    //     //       },
    //     //     },
    //     //     []
    //     //   )
    //     // );
    //   });
    // },
    andWhen: function(s, whenCB) {
      return whenCB(s);
    },
    butThen: async function(s, thenCB) {
      return thenCB(s);
    },
    afterEach: (testInterface2 === null || testInterface2 === void 0 ? void 0 : testInterface2.afterEach) || async function(store, ndx, artificer, utils) {
      return store;
    },
    afterAll: async (store, artificer, utils) => {
      return store;
    }
  });
  document.addEventListener("DOMContentLoaded", function() {
    const elem = document.getElementById("root");
    if (elem) {
      return t;
    }
  });
  return t;
};

// src/ClassicalComponent/index.tsx
var import_react2 = __toESM(require_react(), 1);
var ClassicalComponent = class extends import_react2.default.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
  render() {
    return /* @__PURE__ */ import_react2.default.createElement("div", { style: { border: "3px solid black" } }, /* @__PURE__ */ import_react2.default.createElement("h1", { id: "theHeader" }, "Hello Marcus"), /* @__PURE__ */ import_react2.default.createElement("pre", { id: "theProps" }, JSON.stringify(this.props)), /* @__PURE__ */ import_react2.default.createElement("p", null, "foo: ", this.props.foo), /* @__PURE__ */ import_react2.default.createElement("pre", { id: "theStat" }, JSON.stringify(this.state)), /* @__PURE__ */ import_react2.default.createElement("p", null, "count: ", this.state.count, " times"), /* @__PURE__ */ import_react2.default.createElement("button", { id: "theButton", onClick: async () => {
      this.setState({ count: this.state.count + 1 });
    } }, "Click"));
  }
};

// src/ClassicalComponent/test.specification.ts
var ClassicalComponentSpec = (Suite, Given, When, Then, Check) => {
  return [
    Suite.Default(
      "a classical react component",
      {
        test0: Given.AnEmptyState(
          [`67ae06bac3c5fa5a98a08e32`],
          [
            When.IClickTheButton(),
            When.IClickTheButton(),
            When.IClickTheButton(),
            When.IClickTheHeader()
            // When.IClickTheButton(),
          ],
          [Then.ThePropsIs({ children: [] }), Then.TheStatusIs({ count: 3 })]
        ),
        test1: Given.AnEmptyState(
          [`67ae06bac3c5fa5a98a08e32`],
          [When.IClickTheButton()],
          [Then.ThePropsIs({ children: [] }), Then.TheStatusIs({ count: 1 })]
        ),
        test2: Given.AnEmptyState(
          [`67ae06bac3c5fa5a98a08e32`],
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
          [`67ae06bac3c5fa5a98a08e32`],
          [When.IClickTheButton(), When.IClickTheButton()],
          [Then.TheStatusIs({ count: 2 })]
        )
      },
      []
    )
  ];
};

// src/ClassicalComponent/react-dom/client.web.test.tsx
var ClassicalComponentReactDomImplementation = {
  suites: {
    Default: "Classical Component, react-dom, client.web"
  },
  givens: {
    AnEmptyState: { props: { foo: "bar" } }
  },
  whens: {
    IClickTheHeader: () => async ({ htmlElement }) => {
      console.log("IClickTheHeader", htmlElement);
      htmlElement.querySelector("#theHeader").click();
    },
    IClickTheButton: () => async ({ htmlElement }) => {
      console.log("IClickTheButton", htmlElement);
      htmlElement.querySelector("#theButton").click();
    }
  },
  thens: {
    ThePropsIs: (expectation) => async ({ htmlElement, reactElement }) => {
      console.log("ThePropsIs", htmlElement, expectation);
      const elem = htmlElement.querySelector("#theProps");
      const found = elem.innerHTML;
      assert.deepEqual(
        JSON.parse(found),
        expectation
      );
    },
    TheStatusIs: (expectation) => async ({ htmlElement }) => {
      console.log("TheStatusIs", htmlElement);
      const elem = htmlElement.querySelector("#theStat");
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
    }
  }
};
var testInterface = {
  afterEach: async function(store, ndx, artificer, utils) {
    utils.writeFileSync("aftereachlog", store.toString());
    const page = (await utils.browser.pages()).filter((x) => {
      const parsedUrl = new URL(x.url());
      parsedUrl.search = "";
      const strippedUrl = parsedUrl.toString();
      return strippedUrl === "file:///Users/adam/Code/kokomoBay/docs/web/src/ClassicalComponent/react-dom/client.web.test.html";
    })[0];
    await page.screenshot({
      path: "screenshot.jpg"
    });
    return store;
  }
};
var client_web_test_default = web_default(
  ClassicalComponent,
  ClassicalComponentSpec,
  ClassicalComponentReactDomImplementation,
  testInterface
);
export {
  client_web_test_default as default
};
