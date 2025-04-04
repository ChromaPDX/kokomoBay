import {
  PM,
  Web_default
} from "../../../chunk-QXTRHJWR.mjs";
import {
  LoginPageSpecs,
  LoginPage_default,
  actions,
  credErrorId,
  credentialFailWarning,
  emailInputId,
  emailwarning,
  loginInputId,
  passwordInputId,
  require_react_dom
} from "../../../chunk-3OL2AX4V.mjs";
import {
  require_react
} from "../../../chunk-ZZ3ODJ3Z.mjs";
import {
  __commonJS,
  __toESM,
  assert
} from "../../../chunk-SZDDWZIA.mjs";

// node_modules/react-dom/client.js
var require_client = __commonJS({
  "node_modules/react-dom/client.js"(exports) {
    "use strict";
    var m = require_react_dom();
    if (false) {
      exports.createRoot = m.createRoot;
      exports.hydrateRoot = m.hydrateRoot;
    } else {
      i = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      exports.createRoot = function(c, o) {
        i.usingClientEntryPoint = true;
        try {
          return m.createRoot(c, o);
        } finally {
          i.usingClientEntryPoint = false;
        }
      };
      exports.hydrateRoot = function(c, h, o) {
        i.usingClientEntryPoint = true;
        try {
          return m.hydrateRoot(c, h, o);
        } finally {
          i.usingClientEntryPoint = false;
        }
      };
    }
    var i;
  }
});

// src/LoginPage/react-dom/web.test.tsx
var import_react = __toESM(require_react(), 1);
var import_react2 = __toESM(require_react(), 1);
var import_client = __toESM(require_client(), 1);

// src/LoginPage/react-dom/test.tsx
var emailInput = `#${emailInputId}`;
var passwordInput = `#${passwordInputId}`;
var loginButton = `#${loginInputId}`;
var assert$ = async (sel, utils) => {
  const x = await utils.$(sel);
  if (x) {
    assert(true, `'${sel}' evaluated to: ${x}`);
  } else {
    assert(x, `Expected ${sel} to evaluate OK, but it evaluated to: ${x}`);
  }
};
PM.prototype.getText = async function(selector) {
  const element = await this.$(selector);
  if (!element) {
    throw new Error(`Element with selector ${selector} not found`);
  }
  return element.textContent?.trim() || "";
};
var loginPageImplreactDom = {
  suites: {
    Default: "a default suite"
  },
  givens: {
    default: () => (i) => {
      return i;
    }
  },
  whens: {
    TheLoginIsSubmitted: () => async (component, utils) => {
      await utils.click(loginButton);
    },
    TheEmailIsSetTo: (email) => async (component, utils) => {
      await utils.focusOn(emailInput);
      await utils.typeInto(email);
      await utils.customScreenShot({ path: "TheEmailIsSetTo.jpg" });
    },
    ThePasswordIsSetTo: (password) => async (component, utils) => {
      await utils.focusOn(passwordInput);
      await utils.typeInto(password);
    }
  },
  thens: {
    TheEmailIs: (emailExpected) => async (component, utils) => {
      assert.equal(
        await utils.getValue(emailInput),
        emailExpected
      );
      await utils.customScreenShot({ path: "TheEmailIs.jpg" });
    },
    TheEmailIsNot: (expectedEmail) => async (component, utils) => {
      assert.notEqual(
        await utils.getValue(emailInput),
        expectedEmail
      );
      await utils.customScreenShot({ path: "TheEmailIs.jpg" });
    },
    ThePasswordIs: (passwordExpected) => async (component, utils) => {
      assert.equal(
        await utils.getValue(passwordInput),
        passwordExpected
      );
    },
    ThePasswordIsNot: (passwordExpected) => async (component, utils) => {
      assert.notEqual(
        await utils.getValue(passwordInput),
        passwordExpected
      );
    },
    ThereIsAnEmailError: () => async (store, utils) => {
      utils.customScreenShot({ path: "ThereIsAnEmailError.jpg" });
      assert$(`#invalid-email-warning ::-p-text(${emailwarning})`, utils);
    },
    ThereIsNotAnEmailError: () => async (store, utils) => {
      utils.customScreenShot({ path: "ThereIsNotAnEmailError.jpg" });
      assert$("#invalid-email-warning ::-p-text()", utils);
    },
    TheSubmitButtonIsActive: () => (component, utils) => {
      return new Promise(async (resolve, rej) => {
        assert(!await utils.isDisabled(loginButton));
        resolve();
      });
    },
    TheSubmitButtonIsNotActive: () => (component, utils) => {
      return new Promise(async (resolve, rej) => {
        assert(await utils.isDisabled(loginButton));
        resolve();
      });
    },
    ThereIsACredentialError: () => async (ssel, utils) => {
      utils.customScreenShot({ path: "ThereIsACredentialError.png" });
      assert$(`#${credErrorId} ::-p-text(${credentialFailWarning})`, utils);
    },
    ThereIsNotACredentialError: () => async (ssel, utils) => {
      utils.customScreenShot({ path: "ThereIsNotACredentialError.png" });
      assert$(`#${credErrorId}`, utils);
      assert.isNull(await utils.$(`#error ::-p-text(${credentialFailWarning})`));
    }
  },
  checks: {
    default: () => () => {
      return {};
    }
  }
};

// src/LoginPage/react-dom/web.test.tsx
var TesterantoComponent = ({
  done,
  innerComp
}) => {
  const myContainer = (0, import_react.useRef)(null);
  (0, import_react.useEffect)(() => {
    done(myContainer.current);
  }, []);
  return import_react.default.createElement("div", { ref: myContainer }, innerComp);
};
var web_test_default = Web_default(
  LoginPage_default,
  LoginPageSpecs,
  loginPageImplreactDom,
  {
    beforeAll: async (reactElement, itr, tr, utils) => {
      return new Promise(async (resolve, rej) => {
        const htmlElement = document.getElementById("root");
        if (htmlElement) {
          const domRoot = import_client.default.createRoot(htmlElement);
          await utils.customScreenShot({ path: "prerender.jpg" });
          resolve({ htmlElement, reactElement, domRoot });
        }
      });
    },
    beforeEach: async ({ htmlElement, reactElement, domRoot }, initializer, artificer, testResource, iv, utils) => {
      return new Promise((resolve, rej) => {
        const r = reactElement();
        const component = (0, import_react2.createElement)(
          TesterantoComponent,
          {
            innerComp: r,
            done: async (mutableRef) => {
              await utils.customScreenShot({ path: "render.jpg" });
              resolve({
                htmlElement,
                reactElement,
                domRoot,
                mutableRef,
                r
              });
            }
          },
          []
        );
        domRoot.render(component);
      });
    },
    andWhen: function(s, whenCB, tr, utils) {
      return whenCB(s.r, utils);
    },
    butThen: async function(s, thenCB, tr, utils) {
      return await thenCB(s.mutableRef, utils);
    },
    afterEach: async function(store, ndx, artificer, utils) {
      await utils.customScreenShot({ path: "beforeUnmount.jpg" });
      await utils.writeFileSync("dump.html", store.htmlElement.outerHTML);
      return new Promise(async (resolve, rej) => {
        await store.domRoot.unmount();
        await utils.customScreenShot({ path: "afterUnmount.jpg" });
        await store.r.props.store.dispatch(actions.reset());
        resolve({});
      });
    },
    afterAll: (store, artificer) => {
      return new Promise((resolve, rej) => {
        resolve({});
      });
    }
  }
);
export {
  web_test_default as default
};
