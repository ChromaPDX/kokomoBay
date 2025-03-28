import { assert } from "chai";

import { IStoreState, loginApp } from "./app.js";
import {
  AppSpecification,
  IAppSpecification,
  IImplementation,
} from "./app.test.js";

import { ReduxTesteranto } from "./subPackages/redux.testeranto.test.js";

const implementations: any = {
  suites: {
    Default: "some default Suite!",
  },
  givens: {
    AnEmptyState: () => () => {
      return loginApp.getInitialState();
    },
    AStateWithEmail: () => (email) => {
      return { ...loginApp.getInitialState(), email };
    },
  },
  whens: {
    TheLoginIsSubmitted: () => [loginApp.actions.signIn],
    TheEmailIsSetTo: (email) => [loginApp.actions.setEmail, email],
    ThePasswordIsSetTo: (password) => [loginApp.actions.setPassword, password],
  },
  thens: {
    TheEmailIs: (email) => (storeState) => {
      if (typeof storeState === "object" && storeState !== null) {
        assert.equal(storeState.email, email);
      } else {
        assert.equal(storeState, email);
      }
    },
    TheEmailIsNot: (email) => (storeState) => {
      if (typeof storeState === "object" && storeState !== null) {
        assert.notEqual(storeState.email, email);
      } else {
        assert.notEqual(storeState, email);
      }
    },
    ThePasswordIs: (password) => (selection) =>
      assert.equal(selection.password, password),
    ThePasswordIsNot: (password) => (selection) =>
      assert.notEqual(selection.password, password),
  },
  checks: {
    AnEmptyState: () => () => loginApp.getInitialState(),
  },
};

export default ReduxTesteranto<IStoreState, IAppSpecification>(
  loginApp.reducer,
  AppSpecification,
  implementations
);
