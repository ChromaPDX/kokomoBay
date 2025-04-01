import { Modify } from "testeranto/src/Types.js";

import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
} from "@reduxjs/toolkit";
import { assert } from "chai";

import { IStoreState, loginApp } from "./app.js";
import { AppSpecification, IAppOut } from "./app.test.js";
import {
  BaseImplementation,
  ReduxTesteranto,
} from "./subPackages/redux.testeranto.test.js";

export type IImplementation = Modify<
  BaseImplementation<IStoreState, IAppOut>,
  {
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
  }
>;

const implementations: IImplementation = {
  suites: {
    Default: "some default Suite!",
  },
  givens: {
    AnEmptyState: loginApp.getInitialState(),
    AStateWithEmail: { ...loginApp.getInitialState(), email: "bob@mail.com" },
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
    AnEmptyState: loginApp.getInitialState(),
  },
};

export default ReduxTesteranto<IStoreState, IAppOut>(
  loginApp.reducer,
  AppSpecification,
  implementations
);
