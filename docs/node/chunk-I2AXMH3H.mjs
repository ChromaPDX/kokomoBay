import { createRequire } from 'module';const require = createRequire(import.meta.url);

// src/ClassicalComponent/index.tsx
import React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var ClassicalComponent = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
  render() {
    return /* @__PURE__ */ jsxs("div", { style: { border: "3px solid black" }, children: [
      /* @__PURE__ */ jsx("h1", { id: "theHeader", children: "Hello Marcus" }),
      /* @__PURE__ */ jsx("pre", { id: "theProps", children: JSON.stringify(this.props) }),
      /* @__PURE__ */ jsxs("p", { children: [
        "foo: ",
        this.props.foo
      ] }),
      /* @__PURE__ */ jsx("pre", { id: "theStat", children: JSON.stringify(this.state) }),
      /* @__PURE__ */ jsxs("p", { children: [
        "count: ",
        this.state.count,
        " times"
      ] }),
      /* @__PURE__ */ jsx("button", { id: "theButton", onClick: async () => {
        this.setState({ count: this.state.count + 1 });
      }, children: "Click" })
    ] });
  }
};

export {
  ClassicalComponent
};
