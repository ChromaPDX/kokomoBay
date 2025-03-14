import {
  require_jsx_runtime,
  require_react,
  require_react_dom
} from "../../chunk-N5FE2MLL.mjs";
import {
  __commonJS,
  __toESM
} from "../../chunk-TTFRSOOU.mjs";

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

// src/ClassicalComponent/test.ts
var import_client = __toESM(require_client(), 1);
var import_react2 = __toESM(require_react(), 1);

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
        this.setState({ count: this.state.count + 11 });
      }, children: "Click" })
    ] });
  }
};

// src/ClassicalComponent/test.ts
document.addEventListener("DOMContentLoaded", function() {
  const elem = document.getElementById("root");
  if (elem) {
    import_client.default.createRoot(elem).render(import_react2.default.createElement(ClassicalComponent, {}));
  }
});
