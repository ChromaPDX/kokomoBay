import {
  require_react_test_renderer
} from "../../../chunk-DGOSQTPO.mjs";
import {
  ClassicalComponentSpec
} from "../../../chunk-5FUX4KAJ.mjs";
import {
  ClassicalComponent
} from "../../../chunk-W7T5BCPH.mjs";
import {
  Web_default
} from "../../../chunk-NSPJHCTP.mjs";
import {
  assert
} from "../../../chunk-GI23F5DQ.mjs";
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

// ../testeranto/dist/module/src/SubPackages/react-test-renderer/component/web.js
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
    IClickTheHeader: () => async (component, utils) => {
      component.root.findByType("h1").props.onClick();
    }
  },
  thens: {
    ThePropsIs: (expectation) => (component) => {
      return assert.deepEqual(
        component.toJSON().children[1].children,
        [JSON.stringify(expectation)]
        // {
        //   type: "pre",
        //   props: { id: "theProps" },
        //   children: JSON.stringify(expectation),
        // }
      );
    },
    TheStatusIs: (expectation) => (component) => {
      return assert.deepEqual(
        component.root.findByProps({ id: "theStat" }).props,
        {
          id: "theStat",
          children: JSON.stringify(expectation)
        }
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
