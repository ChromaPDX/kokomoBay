import { Ibdd_in, ITestImplementation, Modify } from "testeranto/src/Types";

import { assert } from "chai";

import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
} from "@reduxjs/toolkit";

import { ReduxToolkitTesteranto } from "./subPackages/reduxToolkit.testeranto.test";

import { AppSpecification, IAppOut, IAppSpecification } from "./app.test";
import app, { IStoreState, loginApp } from "./app";
import { ILoginPageSelection } from "./LoginPage";

const core = app();
const selector = core.select.loginPageSelection;
const reducer = core.app.reducer;

type I = Ibdd_in<
  unknown,
  unknown,
  unknown,
  IStoreState,
  unknown,
  IStoreState,
  unknown
>;

const implementations: Modify<
  ITestImplementation<I, IAppOut>,
  {
    givens: {
      [K in keyof IAppOut["givens"]]: () => (
        ...Iw: IAppOut["givens"][K]
      ) => IStoreState;
    };

    whens: {
      TheLoginIsSubmitted: () => [
        ActionCreatorWithoutPayload<`${string}/signIn`>
      ];
      TheEmailIsSetTo: (
        e: string
      ) => [ActionCreatorWithPayload<string, `${string}/setEmail`>, string];

      ThePasswordIsSetTo: (
        p: string
      ) => [ActionCreatorWithPayload<string, `${string}/setPassword`>, string];
    };

    checks: {
      [K in keyof IAppOut["checks"]]: () => (
        ...Iw: IAppOut["checks"][K]
      ) => IStoreState;
    };
  }
> = {
  suites: {
    Default: "some default Suite",
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
    TheEmailIs: (email) => (selection) =>
      [assert.equal, selection.email, email, "a nice message"],
    TheEmailIsNot: (email) => (selection) =>
      [assert.notEqual, selection.email, email],
    ThePasswordIs: (password) => (selection) =>
      [assert.equal, selection.password, password],
    ThePasswordIsNot: (password) => (selection) =>
      [assert.notEqual, selection.password, password],
  },
  checks: {
    AnEmptyState: () => () => loginApp.getInitialState(),
  },
};

export default ReduxToolkitTesteranto<
  IStoreState,
  ILoginPageSelection,
  IAppSpecification
>(implementations, AppSpecification, { reducer, selector });
