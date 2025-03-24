import { createRequire } from 'module';const require = createRequire(import.meta.url);
import {
  require_react_test_renderer
} from "./chunk-6FWMRXFT.mjs";
import {
  Node_default
} from "./chunk-BMW762LB.mjs";
import {
  __toESM
} from "./chunk-M7BKJ4RF.mjs";

// ../testeranto/dist/module/src/SubPackages/react-test-renderer/jsx/index.js
var import_react_test_renderer = __toESM(require_react_test_renderer(), 1);
import React from "react";
var Context = React.createContext({});
var AppContext = React.createContext({});
var testInterface = {
  butThen: async function(s, thenCB, tr) {
    return thenCB(s);
  },
  beforeEach: function(CComponent, props) {
    let component;
    (0, import_react_test_renderer.act)(() => {
      component = import_react_test_renderer.default.create(React.createElement(CComponent, props, React.createElement(CComponent, props, [])));
    });
    return component;
  },
  andWhen: async function(renderer2, whenCB) {
    await (0, import_react_test_renderer.act)(() => whenCB(renderer2));
    return renderer2;
  }
};

// ../testeranto/dist/module/src/SubPackages/react-test-renderer/jsx/node.js
var node_default = (testImplementations, testSpecifications, testInput, testInterface2 = testInterface) => {
  return Node_default(testInput, testSpecifications, testImplementations, testInterface2);
};

export {
  node_default
};
