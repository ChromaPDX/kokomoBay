import {
  LoginPageSpecs,
  LoginPage_default,
  actions,
  credentialFailWarning,
  emailInputId,
  loginInputId,
  passwordInputId,
  require_react,
  require_react_dom
} from "../../../chunk-OE46JJPW.mjs";
import {
  Web_default
} from "../../../chunk-PD25TX33.mjs";
import {
  __toESM,
  assert
} from "../../../chunk-SZDDWZIA.mjs";

// src/LoginPage/react-dom/web.test.tsx
var import_react = __toESM(require_react(), 1);
var import_react2 = __toESM(require_react(), 1);
var import_react_dom = __toESM(require_react_dom(), 1);

// src/LoginPage/react-dom/test.tsx
var emailInput = `#${emailInputId}`;
var passwordInput = `#${passwordInputId}`;
var loginButton = `#${loginInputId}`;
var assert$ = async (sel, utils) => {
  const x = await utils.$(sel);
  console.log("sel", sel);
  console.log("x", x);
  if (x) {
    assert(true, `'${sel}' evaluated to: ${x}`);
  } else {
    console.log("The current html is", await utils.$("xpath//*"));
    assert(x, `Expected ${sel} to evaluate OK, but it evaluated to: ${x}`);
  }
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
      assert$("xpath//p[@id='invalid-email-warning' and contains(text(),'invalidEmail')] ", utils);
    },
    ThereIsNotAnEmailError: () => async (store, utils) => {
      assert$("xpath//p[@id='invalid-email-warning' and contains(text(),'')] ", utils);
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
      await assert$(`p[id='error']::-p-text(${credentialFailWarning})`, utils);
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
          const domRoot = import_react_dom.default.createRoot(htmlElement);
          await utils.customScreenShot({ path: "prerender.jpg" });
          resolve({ htmlElement, reactElement, domRoot });
        }
      });
    },
    beforeEach: async ({ htmlElement, reactElement, domRoot }, initializer, artificer, testResource, utils) => {
      console.log("beforEach", reactElement);
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
      return await thenCB(s.r, utils);
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
