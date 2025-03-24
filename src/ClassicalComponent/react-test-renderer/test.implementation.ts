import renderer, { act, ReactTestRenderer } from "react-test-renderer";
import { assert } from "chai";
import { IImpl as BaseIImple } from "testeranto/src/SubPackages/react-test-renderer/component/index";
import { PM } from "testeranto/src/PM";

import { IClassicalComponentSpec } from "../test.shape";

export const testImplementation: BaseIImple<IClassicalComponentSpec> = {
  suites: {
    Default: "default",
  },
  givens: {
    AnEmptyState: () => {
      return { foo: "bar" };
    },
  },
  whens: {
    IClickTheButton: () => async (component) => {
      component.root.findByType("button").props.onClick();
    },
    IClickTheHeader: () => async (component: any, utils: PM) => {
      component.root.findByType("h1").props.onClick();
    },
  },
  thens: {
    ThePropsIs: (expectation) => (component) => {
      return assert.deepEqual(
        (component.toJSON() as { children: object[] }).children[1].children,
        [JSON.stringify(expectation)]
        // {
        //   type: "pre",
        //   props: { id: "theProps" },
        //   children: JSON.stringify(expectation),
        // }
      );
    },

    TheStatusIs: (expectation) => (component: ReactTestRenderer) => {
      return assert.deepEqual(
        component.root.findByProps({ id: "theStat" }).props,
        {
          id: "theStat",
          children: JSON.stringify(expectation),
        }
      );
    },
  },
  checks: {
    AnEmptyState: () => {
      return { foo: "bar" };
    },
  },
};
