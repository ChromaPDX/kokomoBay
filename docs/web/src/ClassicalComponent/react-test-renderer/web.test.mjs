import {
  require_react_test_renderer
} from "../../../chunk-BHW7OIRC.mjs";
import {
  ClassicalComponent,
  ClassicalComponentSpec
} from "../../../chunk-G64KNYHW.mjs";
import {
  Web_default
} from "../../../chunk-4MFPEDYN.mjs";
import {
  require_react
} from "../../../chunk-ZZ3ODJ3Z.mjs";
import {
  __toESM,
  assert
} from "../../../chunk-SZDDWZIA.mjs";

// ../testeranto/dist/module/SubPackages/react-test-renderer/component/interface.js
var import_react = __toESM(require_react(), 1);
var import_react_test_renderer = __toESM(require_react_test_renderer(), 1);
var testInterface = {
  beforeEach: function(CComponent, propsAndChildren) {
    function Link(proper) {
      return import_react.default.createElement(CComponent, proper(), []);
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

// ../testeranto/dist/module/SubPackages/react-test-renderer/component/web.js
var web_default = (testImplementations, testSpecifications, testInput) => Web_default(testInput, testSpecifications, testImplementations, testInterface);

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

// src/ClassicalComponent/react-test-renderer/web.test.tsx
var web_test_default = web_default(
  testImplementation,
  ClassicalComponentSpec,
  ClassicalComponent
);
export {
  web_test_default as default
};
