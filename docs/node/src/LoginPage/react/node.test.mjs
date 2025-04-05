import { createRequire } from 'module';const require = createRequire(import.meta.url);
import {
  LoginPageSpecs,
  LoginPage_default,
  actions,
  store
} from "../../../chunk-OA7MEVMO.mjs";
import "../../../chunk-LDJY5LQQ.mjs";
import {
  Node_default
} from "../../../chunk-O5UFRUWK.mjs";
import {
  assert
} from "../../../chunk-BFDDKUUP.mjs";
import "../../../chunk-M7BKJ4RF.mjs";

// ../testeranto/dist/module/SubPackages/react/jsx/index.js
import React from "react";
var testInterface = {
  andWhen: async (s, whenCB) => {
    await whenCB(s());
    return new Promise((resolve, rej) => {
      resolve(React.createElement(s));
    });
  },
  butThen: async (subject, thenCB) => {
    await thenCB(subject());
    return new Promise((resolve, rej) => {
      resolve(React.createElement(subject));
    });
  }
};

// ../testeranto/dist/module/SubPackages/react/jsx/node.js
var node_default = (testImplementations, testSpecifications, testInput, testInterface2 = testInterface) => {
  return Node_default(testInput, testSpecifications, testImplementations, testInterface2);
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
      store.dispatch(actions.signIn());
      return reactElem;
    },
    TheEmailIsSetTo: (email) => async (reactElem) => {
      store.dispatch(actions.setEmail(email));
      return reactElem;
    },
    ThePasswordIsSetTo: (password) => async (reactElem, utils) => {
      store.dispatch(actions.setPassword(password));
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
      assert.equal(reactElem.props.store.getState().error, "invalidEmail");
      return reactElem;
    },
    ThereIsNotAnEmailError: () => async (reactElem, utils) => {
      assert.notEqual(reactElem.props.store.getState().error, "invalidEmail");
      return reactElem;
    },
    ThereIsACredentialError: () => async (reactElem, utils) => {
      const state = reactElem.props.store.getState();
      assert.equal(state.error, "credentialFail");
      assert.isTrue(state.disableSubmit);
      return reactElem;
    },
    TheSubmitButtonIsActive: () => async (reactElem, utils) => {
      assert.isFalse(reactElem.props.store.getState().disableSubmit, "disableSubmit should be false");
      return reactElem;
    },
    TheSubmitButtonIsNotActive: () => async (reactElem, utils) => {
      assert.isTrue(reactElem.props.store.getState().disableSubmit, "disableSubmit should be true");
      return reactElem;
    },
    ThereIsNotACredentialError: () => async (reactElem, utils) => {
      assert.notEqual(reactElem.props.store.getState().error, "credentialFail");
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
    ...testInterface,
    afterEach: async (x) => {
      await x().props.store.dispatch(actions.reset());
      return x;
    }
  }
  // {
  //   // beforeEach: async (proto, init, artificer, tr, x, pm) => {
  //   //   // pm.writeFileSync("beforeEachLog", "bar");
  //   //   return proto;
  //   // },
  //   // afterAll: (store, artificer, utils) => {
  //   //   // utils.writeFileSync("afterAllLog", "bar");
  //   //   return store;
  //   // }
  // }
);
export {
  node_test_default as default
};
