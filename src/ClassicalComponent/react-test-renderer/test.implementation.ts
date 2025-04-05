import { ReactTestRenderer } from "react-test-renderer";
import { assert } from "chai";
import { IImpl as BaseIImple } from "testeranto/src/SubPackages/react-test-renderer/component/index";

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
    IClickTheHeader: () => async (component: ReactTestRenderer) => {
      component.root.findByType("h1").props.onClick();
    },
  },
  thens: {
    ThePropsIs: (expectation) => (component) => {
      const propsElement = component.root.findByProps({ id: "theProps" });
      return assert.deepEqual(
        JSON.parse(propsElement.props.children),
        expectation
      );
    },

    TheStatusIs: (expectation) => (component: ReactTestRenderer) => {
      const statElement = component.root.findByProps({ id: "theStat" });
      const actual = JSON.parse(statElement.props.children);
      return assert.deepEqual(
        actual,
        expectation,
        "the status was not as expected"
      );
    },
  },
  checks: {
    AnEmptyState: () => {
      return { foo: "bar" };
    },
  },
};
