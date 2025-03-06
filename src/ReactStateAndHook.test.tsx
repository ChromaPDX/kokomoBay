import assert from "assert";

import type {
  ITestSpecification,
  ITestImplementation,
} from "testeranto/src/Types";

import Testeranto from "testeranto/src/SubPackages/react-test-renderer/jsx/node.js";
import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';

import ReactStateAndHook from "./ReactStateAndHook";

type ISpec = {
  iinput: any,
  isubject: any,
  istore: any,
  iselection: any,

  when: (rectangle: any) => unknown,
  then: unknown,
  given: (x) => unknown,

  suites: {
    Default: string;
  },
  givens: {
    Default;
  },
  whens: {
    IClick: [];
  },
  thens: {
    TheCounterIs: [number];
  },
  checks: {
    Default;
  }
};

const Specification: ITestSpecification<ISpec> =
  (Suite, Given, When, Then, Check) => {
    return [
      Suite.Default(
        "Testing the ReactStateAndHook element",
        {
          "test0": Given.Default(
            [`hello`],
            [],
            [Then.TheCounterIs(0)]
          ),
          "test1": Given.Default(
            [`hello`],
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
            [When.IClick()],
            [Then.TheCounterIs(1)]
          ),
        },
        []
      ),
    ];
  };

const Implementation: ITestImplementation<
  ISpec, {
    givens: {
      [K in keyof ISpec["givens"]]: (
        ...Iw: ISpec["givens"][K]
      ) => void;
    }
  }
> = {
  suites: {
    Default: "a default suite",
  },

  givens: {
    Default: () => {
      const container = document.createElement('div');
      document.body.appendChild(container);
      const root = createRoot(container);
      return { container, root };
    },
  },

  whens: {
    IClick: () => ({ root }) => {
      act(() => {
        root.render(<ReactStateAndHook />);
        const button = document.querySelector('button');
        button?.click();
      });
    },
  },

  thens: {
    TheCounterIs: (counter) => () => {
      const pre = document.querySelector('pre');
      return assert.equal(
        pre?.textContent,
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
