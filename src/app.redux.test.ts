import { assert } from "chai";

import { IStoreState, loginApp } from "./app";
import { AppSpecification, IAppSpecification } from "./app.test";

import { ReduxTesteranto } from "../myTests/redux.testeranto.test";

export const AppReduxTesteranto = ReduxTesteranto<
  IStoreState,
  IAppSpecification,
  typeof loginApp
>(
  loginApp.reducer,
  AppSpecification,
  {
    Suites: {
      Default: "some default Suite",
    },
    Givens: {
      AnEmptyState: () => {
        return loginApp.getInitialState();
      },
      AStateWithEmail: (email) => {
        return { ...loginApp.getInitialState(), email };
      },
    },
    Whens: {
      TheLoginIsSubmitted: () => [loginApp.actions.signIn],
      TheEmailIsSetTo: (email) => [loginApp.actions.setEmail, email],
      ThePasswordIsSetTo: (password) => [loginApp.actions.setPassword, password],
    },
    Thens: {
      TheEmailIs: (email) => (storeState) =>
        assert.equal(storeState.email, email),
      TheEmailIsNot: (email) => (storeState) =>
        assert.notEqual(storeState.email, email),
      ThePasswordIs: (password) => (selection) =>
        assert.equal(selection.password, password),
      ThePasswordIsNot: (password) => (selection) =>
        assert.notEqual(selection.password, password),
    },
    Checks: {
      AnEmptyState: () => loginApp.getInitialState(),
    },
  },
);
