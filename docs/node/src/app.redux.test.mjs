import { createRequire } from 'module';const require = createRequire(import.meta.url);
import {
  AppSpecification
} from "../chunk-YGATLTHN.mjs";
import {
  Node_default
} from "../chunk-3QMZU26Z.mjs";
import {
  loginApp,
  require_redux
} from "../chunk-LDJY5LQQ.mjs";
import {
  assert
} from "../chunk-BFDDKUUP.mjs";
import {
  __toESM
} from "../chunk-M7BKJ4RF.mjs";

// src/subPackages/redux.testeranto.test.ts
var import_redux = __toESM(require_redux(), 1);
var ReduxTesteranto = (testInput, testSpecifications, testImplementations) => {
  const testInterface = {
    beforeEach: function(subject, initializer) {
      return (0, import_redux.createStore)(
        subject,
        initializer
      );
    },
    andWhen: async function(store, whenCB) {
      const [action, payload] = whenCB;
      store.dispatch(payload ? action(payload) : action());
      return store;
    },
    butThen: async function(store, actioner) {
      return actioner(store.getState());
    }
  };
  return Node_default(
    testInput,
    testSpecifications,
    testImplementations,
    testInterface
  );
};

// src/app.redux.test.ts
var implementations = {
  suites: {
    Default: "Testing the Redux store"
  },
  givens: {
    AnEmptyState: loginApp.getInitialState(),
    AStateWithEmail: { ...loginApp.getInitialState(), email: "bob@mail.com" }
  },
  whens: {
    TheLoginIsSubmitted: () => [loginApp.actions.signIn],
    TheEmailIsSetTo: (email) => [loginApp.actions.setEmail, email],
    ThePasswordIsSetTo: (password) => [loginApp.actions.setPassword, password]
  },
  thens: {
    TheEmailIs: (email) => (storeState) => {
      assert.equal(storeState.email, email);
    },
    TheEmailIsNot: (email) => (storeState) => {
      assert.notEqual(storeState.email, email);
    },
    ThePasswordIs: (password) => (selection) => assert.equal(selection.password, password),
    ThePasswordIsNot: (password) => (selection) => assert.notEqual(selection.password, password)
  },
  checks: {
    AnEmptyState: loginApp.getInitialState()
  }
};
var app_redux_test_default = ReduxTesteranto(
  loginApp.reducer,
  AppSpecification,
  implementations
);
export {
  app_redux_test_default as default
};
