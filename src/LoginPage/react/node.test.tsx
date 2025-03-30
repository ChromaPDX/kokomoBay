import test from "testeranto/src/SubPackages/react/jsx/node";
import { testInterface as baseInterface } from "testeranto/src/SubPackages/react/jsx/index";
import { ITestInterface } from "testeranto/src/lib/types.js";

import assert from "assert";
import React, { ReactElement } from "react";

import LoginPage, { actions } from "../index.js";
import { LoginPageSpecs } from "../test.js";

import implementations, { ILoginPageSpecsReact } from "./test.js";

const testInterface: ITestInterface<ILoginPageSpecsReact> = {
  ...baseInterface,
  butThen: async (subject, thenCB) => {
    await thenCB(subject());
    return new Promise((resolve, rej) => {
      resolve(React.createElement(subject));
    });
  },

  beforeEach: async (subject, initializer, artificer, testResource, initialValues, pm) => {
    return subject;
  },
  beforeAll: async (input, testResource, artificer, pm) => {
    return input
  },
  afterEach: async (x) => {
    await x().props.store.dispatch(actions.reset())
    return x;
  },
  andWhen: async (s, w, it, p) => {
    return w(s);
  },
  afterAll: (s, art, p) => {
    return s;
  },
  assertThis: (x: (r) => any) => {
    assert(x)
  }

}

export default test(
  implementations,
  LoginPageSpecs,
  LoginPage,
  testInterface

);
