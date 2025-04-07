import assert from "assert";

import type {
  ITestSpecification,
  ITestImplementation,
  Ibdd_in,
  Ibdd_out,
} from "testeranto/src/Types";

import Testeranto from "testeranto/src/SubPackages/react-test-renderer/jsx/node.js";

import ReactStateAndHook from "./ReactStateAndHook";

type I = Ibdd_in<
  any,
  any,
  any,
  any,
  any,
  any,
  any
>;
type O = Ibdd_out<
  {
    Default: string;

  },
  {
    Default;
  },
  {
    IClick: [];
  },
  {
    TheCounterIs: [number];
  },
  {
    Default;
  }

>;

const Specification: ITestSpecification<I, O> =
  (Suite, Given, When, Then, Check) => {
    return [
      Suite.Default(
        "Testing the ReactStateAndHook element",
        {
          "test0": Given.Default(
            [`https://api.github.com/repos/adamwong246/testeranto/issues/7`],
            [],
            [Then.TheCounterIs(0)]
          ),
          "test1": Given.Default(
            [`https://api.github.com/repos/adamwong246/testeranto/issues/7`],
            [When.IClick()],
            [Then.TheCounterIs(1)]
          ),
          "test2": Given.Default(
            [`hello`],
            [When.IClick(), When.IClick(), When.IClick()],
            [Then.TheCounterIs(3)]
          ),
          "test3": Given.Default(
            [`hello`],
            [When.IClick(), When.IClick()],
            [Then.TheCounterIs(2)]
          ),
        },
        []
      ),
    ];
  };

const Implementation: ITestImplementation<
  I, O
> = {
  suites: {
    Default: "a default suite",
  },

  givens: {
    Default: () => { return },
  },

  whens: {
    IClick: () => (rtr) =>
      rtr.root.findByProps({ "data-testid": "increment-button" }).props.onClick(),
  },

  thens: {
    TheCounterIs: (counter) => (rtr) => {
      const preElement = rtr.root.findByProps({ "data-testid": "counter" });
      return assert.equal(
        preElement.children[0],
        counter.toString()
      );
    },
  },

  checks: {
    /* @ts-ignore:next-line */
    AnEmptyState: () => {
      return {};
    },
  },
};

export default Testeranto(
  Implementation,
  Specification,
  ReactStateAndHook
);
