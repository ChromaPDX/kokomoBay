import { ITestImplementation } from "testeranto/src/Types";
import { I } from "testeranto/src/SubPackages/react-test-renderer/component";

import { ReactTestRenderer } from "react-test-renderer";
import { assert } from "chai";

import { O } from "../dynamic.spec";

export const testImplementation: ITestImplementation<I, O> = {
  suites: {
    Default: "default",
  },
  givens: {
    AnEmptyState: (): { foo: string } => {
      return { foo: "bar" };
    },
  },
  whens: {
    IClickTheButton: () => async (component) => {
      const button = component.root.findByType("button");
      button.props.onClick();
      return component;
    },
    IClickTheHeader: () => async (component: ReactTestRenderer) => {
      try {
        const header = component.root.findByType("h1");
        header.props.onClick();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        // Expected error - header click fails
      }
      return component;
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
      try {
        const statElement = component.root.findByProps({ id: "theStat" });
        const actual = JSON.parse(statElement.props.children);
        assert.deepEqual(actual, expectation, "the status was not as expected");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        assert.fail(`Element with id "theStat" not found`);
      }
      return component;
    },
  },
  checks: {
    AnEmptyState: () => {
      return { foo: "bar" };
    },
  },
};
