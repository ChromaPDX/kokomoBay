import { assert } from "chai";
import { ITestImplementation } from "testeranto/src/Types";
import { PM } from "testeranto/src/PM/index.js";
import React, { ReactElement } from 'react';

import { I, O } from "../test.js";
import { actions, store } from "../index.js";

// type IImpl = ITestImplementation<
//   ILoginPageSpecs<ReactElement>,
//   any
// >

const implementations: ITestImplementation<I<any>, O> = {
  suites: {
    Default: "a default suite",
  },
  givens: {
    default: () => (i) => {
      return i;
    },
  },

  whens: {
    TheLoginIsSubmitted: () => async (reactElem, utils) => {
      store.dispatch(actions.signIn());
      return reactElem;
    },
    TheEmailIsSetTo: (email: string) => async (reactElem: ReactElement) => {
      store.dispatch(actions.setEmail(email));
      return reactElem;
    },
    ThePasswordIsSetTo: (password: string) => async (reactElem: ReactElement, utils: PM) => {
      store.dispatch(actions.setPassword(password));
      return reactElem;
    }
  },
  thens: {
    TheEmailIs: (email: string) => async (reactElem: ReactElement, utils: PM) => {
      assert.equal(reactElem.props.store.getState().email, email);
      return reactElem;
    },
    TheEmailIsNot: (email: string) => async (reactElem: ReactElement, utils: PM) => {
      assert.notEqual(reactElem.props.store.getState().email, email);
      return reactElem;
    },
    ThePasswordIs: (password: string) => async (reactElem: ReactElement, utils: PM) => {
      assert.equal(reactElem.props.store.getState().password, password);
      return reactElem;
    },
    ThePasswordIsNot: (password: string) => async (reactElem: ReactElement, utils: PM) => {
      assert.notEqual(reactElem.props.store.getState().password, password);
      return reactElem;
    },
    ThereIsAnEmailError: () => async (reactElem: ReactElement, utils: PM) => {
      assert.equal(reactElem.props.store.getState().error, "invalidEmail");
      return reactElem;
    },
    ThereIsNotAnEmailError: () => async (reactElem: ReactElement, utils: PM) => {
      assert.notEqual(reactElem.props.store.getState().error, "invalidEmail");
      return reactElem;
    },
    ThereIsACredentialError: () => async (reactElem: ReactElement, utils: PM) => {
      const state = reactElem.props.store.getState();
      assert.equal(state.error, 'credentialFail');
      assert.isTrue(state.disableSubmit);
      return reactElem;
    },
    TheSubmitButtonIsActive: () => async (reactElem: ReactElement, utils: PM) => {
      assert.isFalse(reactElem.props.store.getState().disableSubmit, "disableSubmit should be false");
      return reactElem;
    },
    TheSubmitButtonIsNotActive: () => async (reactElem: ReactElement, utils: PM) => {
      assert.isTrue(reactElem.props.store.getState().disableSubmit, "disableSubmit should be true");
      return reactElem;
    },
    ThereIsNotACredentialError: () => async (reactElem: ReactElement, utils: PM) => {
      assert.notEqual(reactElem.props.store.getState().error, "credentialFail");
      return reactElem;
    }
  },

  checks: {
    default: () => (i) => {
      return i;
    },
  },
}

export default implementations;
