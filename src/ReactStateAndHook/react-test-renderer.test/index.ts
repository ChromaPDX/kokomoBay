import { ITestImplementation } from "testeranto/src/Types";
import { I } from "testeranto/src/SubPackages/react-test-renderer/jsx/index";

import { O } from "../test";

export const Implementation: (asserter: {
  equal: (a, b) => void;
}) => ITestImplementation<I, O> = (asserter) => {
  return {
    suites: {
      Default: "a default suite",
    },

    givens: {
      Default: () => {
        return;
      },
    },

    whens: {
      IClick: () => (rtr) =>
        rtr.root
          .findByProps({ "data-testid": "increment-button" })
          .props.onClick(),
    },

    thens: {
      TheCounterIs: (counter) => (rtr) => {
        const preElement = rtr.root.findByProps({ "data-testid": "counter" });
        return asserter.equal(preElement.children[0], counter.toString());
      },
    },

    checks: {
      Default: () => {
        return;
      },
    },
  };
};
