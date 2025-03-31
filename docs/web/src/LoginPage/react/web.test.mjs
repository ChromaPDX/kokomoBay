import {
  Web_default
} from "../../../chunk-QXTRHJWR.mjs";
import {
  LoginPageSpecs,
  LoginPage_default,
  actions,
  store
} from "../../../chunk-TW3PN7VY.mjs";
import {
  require_react
} from "../../../chunk-ZZ3ODJ3Z.mjs";
import {
  __toESM,
  assert
} from "../../../chunk-SZDDWZIA.mjs";

// ../testeranto/src/SubPackages/react/jsx/index.ts
var import_react = __toESM(require_react(), 1);
var testInterface = {
  // beforeAll: async (proto, testResource, artificer, pm): Promise<IStore> => {
  //   return React.createElement(proto);
  //   // return new Promise((resolve, rej) => {
  //   //   resolve(x());
  //   // });
  // },
  // beforeEach: async (subject, initializer, artificer): Promise<IStore> => {
  //   return new Promise((resolve, rej) => {
  //     resolve(React.createElement(subject));
  //   });
  // },
  andWhen: async (s, whenCB) => {
    await whenCB(s());
    return new Promise((resolve, rej) => {
      resolve(import_react.default.createElement(s));
    });
  },
  butThen: async (subject, thenCB) => {
    await thenCB(subject());
    return new Promise((resolve, rej) => {
      resolve(import_react.default.createElement(subject));
    });
  }
};

// ../testeranto/src/SubPackages/react/jsx/web.ts
var web_default = (testImplementations, testSpecifications, testInput, testInterface2) => {
  return Web_default(
    testInput,
    testSpecifications,
    testImplementations,
    {
      ...testInterface,
      ...testInterface2
    }
  );
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

// src/LoginPage/react/web.test.tsx
var web_test_default = web_default(
  test_default,
  LoginPageSpecs,
  LoginPage_default,
  {
    afterEach: async (x) => {
      await x().props.store.dispatch(actions.reset());
      return x;
    }
  }
);
export {
  web_test_default as default
};
