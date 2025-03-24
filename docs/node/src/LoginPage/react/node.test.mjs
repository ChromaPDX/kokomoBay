import { createRequire } from 'module';const require = createRequire(import.meta.url);
import {
  LoginPageSpecs,
  LoginPage_default,
  actions
} from "../../../chunk-VMADFP4S.mjs";
import "../../../chunk-CLXNHOZW.mjs";
import {
  assert
} from "../../../chunk-BFDDKUUP.mjs";
import {
  Node_default
} from "../../../chunk-MI7ZHO2E.mjs";
import "../../../chunk-M7BKJ4RF.mjs";

// ../testeranto/dist/module/src/SubPackages/react/jsx/index.js
import React from "react";
var testInterface = {
  // beforeAll: async (proto, testResource, artificer, pm): Promise<IStore> => {
  //   return React.createElement(proto);
  //   // return new Promise((resolve, rej) => {
  //   //   resolve(x());
  //   // });
  // },
  beforeEach: async (subject, initializer, artificer) => {
    return new Promise((resolve, rej) => {
      const x = React.createElement(subject);
      console.log("react-element", x);
      resolve(x);
    });
  },
  andWhen: function(s, whenCB) {
    return whenCB(s);
  }
};

// ../testeranto/dist/module/src/SubPackages/react/jsx/node.js
var node_default = (testImplementations, testSpecifications, testInput, testInterface2) => {
  return Node_default(testInput, testSpecifications, testImplementations, Object.assign(Object.assign({}, testInterface), testInterface2));
};

// src/LoginPage/react/test.tsx
var implementations = {
  suites: {
    Default: "a default suite"
  },
  givens: {
    default: () => (i) => {
      return i;
    }
  },
  whens: {
    TheLoginIsSubmitted: () => async (reactElem, utils) => {
      reactElem.props.store.dispatch(actions.signIn());
      return reactElem;
    },
    TheEmailIsSetTo: (email) => async (reactElem, utils) => {
      reactElem.props.store.dispatch(actions.setEmail(email));
      return reactElem;
    },
    ThePasswordIsSetTo: (password) => async (reactElem, utils) => {
      reactElem.props.store.dispatch(actions.setPassword(password));
      return reactElem;
    }
  },
  thens: {
    TheEmailIs: (email) => async (reactElem, utils) => {
      assert.equal(reactElem.props.store.getState().email, email);
      return reactElem;
    },
    TheEmailIsNot: (email) => async (reactElem, utils) => {
      assert.notEqual(reactElem.props.store.getState().email, email);
      return reactElem;
    },
    ThePasswordIs: (password) => async (reactElem, utils) => {
      assert.equal(reactElem.props.store.getState().password, password);
      return reactElem;
    },
    ThePasswordIsNot: (password) => async (reactElem, utils) => {
      assert.notEqual(reactElem.props.store.getState().password, password);
      return reactElem;
    },
    ThereIsAnEmailError: () => async (reactElem, utils) => {
      assert.notEqual(reactElem.props.store.getState().error, "no_error");
      return reactElem;
    },
    ThereIsNotAnEmailError: () => async (reactElem, utils) => {
      assert.equal(reactElem.props.store.getState().error, "no_error");
      return reactElem;
    },
    ThereIsACredentialError: () => async (reactElem, utils) => {
      const state = reactElem.props.store.getState();
      assert.equal(state.error, "credentialFail");
      assert.isTrue(state.disableSubmit);
      return reactElem;
    },
    TheSubmitButtonIsActive: () => async (reactElem, utils) => {
      assert.isFalse(reactElem.props.store.getState().disableSubmit);
      return reactElem;
    },
    TheSubmitButtonIsNotActive: () => async (reactElem, utils) => {
      assert.isTrue(reactElem.props.store.getState().disableSubmit);
      return reactElem;
    },
    ThereIsNotACredentialError: () => async (reactElem, utils) => {
      const state = reactElem.props.store.getState();
      assert.equal(state.error, "");
      assert.isFalse(state.disableSubmit);
      return reactElem;
    }
  },
  checks: {
    default: () => (i) => {
      return i;
    }
  }
};
var test_default = implementations;

// src/LoginPage/react/node.test.tsx
var node_test_default = node_default(
  test_default,
  LoginPageSpecs,
  LoginPage_default,
  {
    // beforeEach: async (proto, init, artificer, tr, x, pm) => {
    //   // pm.writeFileSync("beforeEachLog", "bar");
    //   return proto;
    // },
    // afterAll: (store, artificer, utils) => {
    //   // utils.writeFileSync("afterAllLog", "bar");
    //   return store;
    // }
  }
);
export {
  node_test_default as default
};
