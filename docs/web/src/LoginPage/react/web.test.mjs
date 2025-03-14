import {
  LoginPageSpecs,
  LoginPage_default,
  actions
} from "../../../chunk-2HSWBUAX.mjs";
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
    TheLoginIsSubmitted: () => async (reactElem) => {
      reactElem.props.store.dispatch(actions.signIn());
    },
    TheEmailIsSetTo: (email) => async (reactElem) => {
      reactElem.props.store.dispatch(actions.setEmail(email));
    },
    ThePasswordIsSetTo: (password) => async (reactElem) => {
      reactElem.props.store.dispatch(actions.setPassword(password));
    }
  },
  thens: {
    TheEmailIs: (email) => (reactElem) => {
      assert.equal(reactElem.props.store.getState().email, email);
    },
    TheEmailIsNot: (email) => (reactElem) => {
      assert.notEqual(reactElem.props.store.getState().email, email);
    },
    ThePasswordIs: (password) => (reactElem) => {
      assert.equal(reactElem.props.store.getState().password, password);
    },
    ThePasswordIsNot: (password) => (reactElem) => {
      assert.notEqual(reactElem.props.store.getState().password, password);
    },
    ThereIsAnEmailError: () => (reactElem) => {
      assert.notEqual(reactElem.props.store.getState().error, "no_error");
    },
    ThereIsNotAnEmailError: () => (reactElem) => {
      assert.equal(reactElem.props.store.getState().error, "no_error");
    },
    ThereIsACredentialError: function() {
      throw new Error("Function not implemented.");
    },
    TheSubmitButtonIsActive: function() {
      throw new Error("Function not implemented.");
    },
    TheSubmitButtonIsNotActive: function() {
      throw new Error("Function not implemented.");
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
