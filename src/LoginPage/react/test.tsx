import { assert } from "chai";
import { ITestImplementation } from "testeranto/src/Types";
import { PM } from "testeranto/src/PM/index.js";

import { ILoginPageSpecs } from "../test.js";
import { actions, store } from "../index.js";

type IImpl = ITestImplementation<
  ILoginPageSpecs, object
>

export type ILoginPageSpecsReact = {
  iinput: () => React.JSX.Element;
  isubject: () => React.JSX.Element;
  istore: () => React.JSX.Element;
  iselection: any;

  when: (x) => () => React.JSX.Element;
  then: (r: React.JSX.Element) => any;
  given: (x) => unknown;

  suites: {
    Default: [string];
  };
  givens: {
    Default: [];
  };
  whens: {
    TheLoginIsSubmitted: [];
    TheEmailIsSetTo: [string];
    ThePasswordIsSetTo: [string];
  };
  thens: {
    TheEmailIs: [string];
    TheEmailIsNot: [string];
    ThePasswordIs: [string];
    ThePasswordIsNot: [string];
    ThereIsAnEmailError: [];
    ThereIsACredentialError: [];
    ThereIsNotACredentialError: [];
    ThereIsNotAnEmailError: [];
    TheSubmitButtonIsActive: [];
    TheSubmitButtonIsNotActive: [];
  };
  checks: {
    Default: [];
  };
};

const implementations: IImpl = {
  suites: {
    Default: "a default suite",
  },
  givens: {
    Default: () => (i) => {
      return i;
    },
  },

  whens: {
    TheLoginIsSubmitted: () => async (reactElem: any, utils: PM) => {
      store.dispatch(actions.signIn());
      return reactElem;
    },
    TheEmailIsSetTo: (email) => async (reactElem: any, utils: PM) => {
      store.dispatch(actions.setEmail(email));
      return reactElem;
    },
    ThePasswordIsSetTo: (password: string) => async (reactElem: any, utils: PM) => {
      store.dispatch(actions.setPassword(password));
      return reactElem;
    }
  },
  thens: {
    TheEmailIs: (email: string) => async (reactElem: any, utils: PM) => {
      assert.equal(reactElem.props.store.getState().email, email);
      return reactElem;
    },
    TheEmailIsNot: (email: string) => async (reactElem: any, utils: PM) => {
      assert.notEqual(reactElem.props.store.getState().email, email);
      return reactElem;
    },
    ThePasswordIs: (password: string) => async (reactElem: any, utils: PM) => {
      assert.equal(reactElem.props.store.getState().password, password);
      return reactElem;
    },
    ThePasswordIsNot: (password: string) => async (reactElem: any, utils: PM) => {
      assert.notEqual(reactElem.props.store.getState().password, password);
      return reactElem;
    },
    ThereIsAnEmailError: () => async (reactElem: any, utils: PM) => {
      assert.equal(reactElem.props.store.getState().error, "invalidEmail");
      return reactElem;
    },
    ThereIsNotAnEmailError: () => async (reactElem: any, utils: PM) => {
      assert.notEqual(reactElem.props.store.getState().error, "invalidEmail");
      return reactElem;
    },

    ThereIsACredentialError: () => async (reactElem: any, utils: PM) => {
      const state = reactElem.props.store.getState();
      assert.equal(state.error, 'credentialFail');
      assert.isTrue(state.disableSubmit);
      return reactElem;
    },
    TheSubmitButtonIsActive: () => async (reactElem: any, utils: PM) => {
      assert.isFalse(reactElem.props.store.getState().disableSubmit, "disableSubmit should be false");
      return reactElem;
    },
    TheSubmitButtonIsNotActive: () => async (reactElem: any, utils: PM) => {
      assert.isTrue(reactElem.props.store.getState().disableSubmit, "disableSubmit should be true");
      return reactElem;
    },
    ThereIsNotACredentialError: () => async (reactElem: any, utils: PM) => {
      assert.notEqual(reactElem.props.store.getState().error, "credentialFail");
      return reactElem;
    }
  },

  checks: {
    Default: () => (i) => {
      return i;
    },
  },
}

export default implementations;
