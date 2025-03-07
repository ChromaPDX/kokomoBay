import { createRequire } from 'module';const require = createRequire(import.meta.url);
import {
  AppSpecification
} from "../chunk-NNKHEK63.mjs";
import {
  loginApp,
  require_redux
} from "../chunk-EUREPPNS.mjs";
import {
  Node_default
} from "../chunk-ORJV2YNZ.mjs";
import {
  assert
} from "../chunk-BACB6GDH.mjs";
import "../chunk-XWE4N4UG.mjs";
import "../chunk-ZTDVYA3Q.mjs";
import "../chunk-OI5YMCUL.mjs";
import "../chunk-6D4LK6R2.mjs";
import "../chunk-JWYWNN27.mjs";
import "../chunk-KNOLJKC2.mjs";
import {
  __toESM
} from "../chunk-PM7MAOUR.mjs";

// subPackages/redux.testeranto.test.ts
var import_redux = __toESM(require_redux(), 1);
var ReduxTesteranto = (testInput, testSpecifications, testImplementations) => {
  const testInterface = {
    beforeEach: function(subject, initializer, art, tr, initialValues) {
      return (0, import_redux.createStore)(
        subject,
        initializer()(initialValues)
      );
    },
    andWhen: async function(store, whenCB) {
      const a = whenCB;
      store.dispatch(a[0](a[1]));
      return store;
    },
    butThen: async function(store, actioner, tr) {
      console.log("store", store);
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
    Default: "some default Suite!"
  },
  givens: {
    AnEmptyState: () => () => {
      return loginApp.getInitialState();
    },
    AStateWithEmail: () => (email) => {
      return { ...loginApp.getInitialState(), email };
    }
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
    TheEmailIsNot: (email) => (storeState) => assert.notEqual(storeState.email, email),
    ThePasswordIs: (password) => (selection) => assert.equal(selection.password, password),
    ThePasswordIsNot: (password) => (selection) => assert.notEqual(selection.password, password)
  },
  checks: {
    AnEmptyState: () => () => loginApp.getInitialState()
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
