import {
  LoginPageSpecs,
  LoginPage_default,
  actions
} from "../../../chunk-3TSHC3QJ.mjs";
import {
  Web_default
} from "../../../chunk-PD25TX33.mjs";
import {
  assert
} from "../../../chunk-GI23F5DQ.mjs";
import {
  require_react
} from "../../../chunk-N5FE2MLL.mjs";
import {
  __toESM
} from "../../../chunk-TTFRSOOU.mjs";

// ../testeranto/src/SubPackages/react/jsx/index.ts
var import_react = __toESM(require_react(), 1);
var testInterface = {
  // beforeAll: async (proto, testResource, artificer, pm): Promise<IStore> => {
  //   return React.createElement(proto);
  //   // return new Promise((resolve, rej) => {
  //   //   resolve(x());
  //   // });
  // },
  beforeEach: async (subject, initializer, artificer) => {
    return new Promise((resolve, rej) => {
      const x = import_react.default.createElement(subject);
      console.log("react-element", x);
      resolve(x);
    });
  },
  andWhen: function(s, whenCB) {
    return whenCB(s);
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
    // beforeEach: async (proto, init, artificer, tr, x, pm) => {
    //   // debugger
    //   pm.writeFileSync("beforeEachLog", "bar");
    //   return proto;
    // },
    // afterAll: (store, artificer, utils) => {
    //   // debugger
    //   utils.writeFileSync("afterAllLog", "bar");
    //   // const webContents = utils.browser.webContents;
    //   // console.log("domoarigato", pm.browser);
    //   // page.screenshot({
    //   //   path: "afterAllLog.jpg",
    //   // });
    //   // utils.browser.webContents.capturePage({
    //   //   x: 0,
    //   //   y: 0,
    //   //   width: 100,
    //   //   height: 200
    //   // }, (img: { toPng: () => any; }) => {
    //   //   console.log("testing123")
    //   //   artificer("hello.png", img.toPng());
    //   // }).then((x) => {
    //   //   console.log("done", x);
    //   // });
    //   // artificer("utils", `utils.browser.webContents: ${utils.browser.webContents}`);
    //   // console.log("HELLO WORLD");
    //   // console.log(store);
    //   // console.log(artificer);
    //   // console.log(utils);
    //   return store;
    // }
  }
);
export {
  web_test_default as default
};
