import {
  require_react_test_renderer
} from "../../../chunk-E52YFN7T.mjs";
import {
  ClassicalComponentSpec
} from "../../../chunk-CJVBZIUQ.mjs";
import "../../../chunk-YIXI6FJ2.mjs";
import {
  Node_default
} from "../../../chunk-BCPCV56V.mjs";
import "../../../chunk-T5HDXGMZ.mjs";
import {
  assert
} from "../../../chunk-GI23F5DQ.mjs";
import {
  ClassicalComponent
} from "../../../chunk-KKPXH27T.mjs";
import {
  require_react
} from "../../../chunk-UREIH5IJ.mjs";
import {
  __toESM
} from "../../../chunk-TTFRSOOU.mjs";

// ../testeranto/dist/module/src/SubPackages/react-test-renderer/component/interface.js
var import_react = __toESM(require_react(), 1);
var import_react_test_renderer = __toESM(require_react_test_renderer(), 1);
var testInterface = {
  beforeEach: function(CComponent, propsAndChildren) {
    function Link(props) {
      const p = props.props;
      const c = props.children;
      return import_react.default.createElement(CComponent, p, c);
    }
    return new Promise((res, rej) => {
      (0, import_react_test_renderer.act)(async () => {
        const p = propsAndChildren;
        const y = new CComponent(p.props);
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
    console.log("butThen", thenCB.toString());
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
    IClickTheButton: () => (component) => {
      component.root.findByType("button").props.onClick();
    }
  },
  thens: {
    ThePropsIs: (expectation) => (component) => {
      return assert.deepEqual(
        component.toJSON().children[1],
        {
          type: "pre",
          props: { id: "theProps" },
          children: expectation
        }
      );
    },
    TheStatusIs: (expectation) => (component) => {
      throw new Error("not yet implemented");
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
