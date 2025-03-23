import { ITestImplementation } from "testeranto/src/Types";
import { assert } from "chai";

import { ILoginPageSpecs } from "../test.js";
import { credentialFailWarning, emailInputId, loginInputId, passwordInputId } from "../index.js";
import { PM_Web } from "../../../../testeranto/src/PM/web.js";
import { PM } from "../../../../testeranto/src/PM/index.js";

const emailInput = `#${emailInputId}`;
const passwordInput = `#${passwordInputId}`;
const loginButton = `#${loginInputId}`;

const assert$ = async (sel: string, utils: PM) => {
  const x = await utils.$(sel);
  if (x) {
    assert(true, `'${sel}' evaluated to: ${x}`)
  } else {
    // console.log("The current html is", await utils.$("xpath//*"))
    assert(x, `Expected ${sel} to evaluate OK, but it evaluated to: ${x}`);
  }
}

// Add getText method to PM class
PM.prototype.getText = async function(selector: string) {
  const element = await this.$(selector);
  if (!element) {
    throw new Error(`Element with selector ${selector} not found`);
  }
  return element.textContent || '';
}

export const loginPageImplreactDom: ITestImplementation<ILoginPageSpecs, object> = {
  suites: {
    Default: "a default suite",
  },
  givens: {
    default: () => (i) => {
      return i;
    },
  },
  whens: {
    TheLoginIsSubmitted: () => async (component: HTMLElement, utils) => {
      await utils.click(loginButton);
    },
    TheEmailIsSetTo: (email) => async (component: HTMLElement, utils) => {
      await utils.focusOn(emailInput);
      await utils.typeInto(email);
      await utils.customScreenShot({ path: "TheEmailIsSetTo.jpg" })
    },
    ThePasswordIsSetTo: (password) => async (component: HTMLElement, utils) => {
      await utils.focusOn(passwordInput);
      await utils.typeInto(password);
    },
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
      return new Promise<void>(async (resolve, rej) => {
        assert(!(await utils.isDisabled(loginButton)));
        resolve();
      });
    },
    TheSubmitButtonIsNotActive: () => (component, utils) => {
      return new Promise<void>(async (resolve, rej) => {
        assert((await utils.isDisabled(loginButton)));
        resolve();
      });
    },
    ThereIsACredentialError: () => async (ssel: any, utils: PM) => {
      await assert$(`p[id='error']`, utils);
      const errorText = await utils.getText(`p[id='error']`);
      assert.equal(errorText, credentialFailWarning);
    }
  },

  checks: {
    default: () => () => {
      return {};
    },
  },
};

// export const LoginPageReactTestRendererTestInterface = {

//   butThen: async function (s: any, thenCB, tr) {
//     return thenCB(s);
//   },
//   beforeEach: async function (CComponent, props) {
//     let component;
//     let elem;
//     await act(async () => {
//       elem = CComponent()
//       component = renderer.create(elem);
//     });
//     await component.root.props.store.dispatch(actions.reset());
//     return component;
//   },
//   andWhen: async function (
//     renderer: renderer.ReactTestRenderer,
//     whenCB: (any) => any
//   ): Promise<renderer.ReactTestRenderer> {
//     await act(() => whenCB(renderer));

//     return renderer
//   }

// }

// export const LoginPageReactDomTestInterface = {
//   afterEach: async function (store: any, ndx, artificer, utils) {
//     utils.writeFileSync("aftereachlog", store);

//     const page = (await utils.browser.pages()).filter((x) => {
//       const parsedUrl = new URL(x.url());
//       parsedUrl.search = "";
//       const strippedUrl = parsedUrl.toString();

//       return (
//         strippedUrl ===
//         "file:///Users/adam/Code/kokomoBay/docs/web/src/LoginPage/react-dom/web.test.html"
//       );
//       // return true;
//     })[0];

//     // await page.screenshot({
//     //   path: "screenshot.jpg",
//     // });

//     return store;
//   },
// };

//   // console.log(await utils.click('#email'))
//   // const page = (await utils.browser.pages()).filter((x) => {
//   //   const parsedUrl = new URL(x.url());
//   //   parsedUrl.search = "";
//   //   const strippedUrl = parsedUrl.toString();
//   //   console.log("parsedUrl", parsedUrl)

//   //   return (
//   //     strippedUrl ===
//   //     "file:///Users/adam/Code/kokomoBay/docs/web/src/LoginPage/react-dom/web.test.html"
//   //   );
//   //   // return true;
//   // })[0];

//   // console.log("EVAL ->", page.evaluate)
//   // console.log("EVAL ->", await page.$('#email', el => console.log("el", el)))
//   // await page.focus('#email')
//   // await page.keyboard.type(email)
//   // await page.keyboard.type('x')
//   // await page.keyboard.type('c')

//   // await page.$eval('body', el => console.log("el", el));
//   // console.log("EVAL <-")

//   // await page.screenshot({
//   //   path: "screenshot2.jpg",
//   // });

//   // resolve();
// });


// utils.browser.pages().then((pages) => {
//   (pages).filter(async (page) => {
//     const parsedUrl = new URL(page.url());
//     parsedUrl.search = "";
//     const strippedUrl = parsedUrl.toString();

//     if ((
//       strippedUrl ===
//       "file:///Users/adam/Code/kokomoBay/docs/web/src/LoginPage/react-dom/web.test.html"
//     )) {

//       console.log("mark666", email, page.$eval.toString())
//       await page.$eval('#email', el => el.value = email);
//       console.log("mark667", email, await page.content())
//       utils.writeFileSync("TheEmailIsSetTo.txt", await page.content())
//       await page.screenshot({
//         path: "TheEmailIsSetTo.jpg",
//       });
//     }
//   })[0];
// })
// const pp: Promise<any[]> = utils.browser.pages();

// pp.then((pages) => {
//   (pages).filter(async (page) => {
//     const parsedUrl = new URL(page.url());
//     parsedUrl.search = "";
//     const strippedUrl = parsedUrl.toString();

//     if ((
//       strippedUrl ===
//       "file:///Users/adam/Code/kokomoBay/docs/web/src/LoginPage/react-dom/web.test.html"
//     )) {
//       await page.$eval('#email', el => el.value = email);
//       utils.writeFileSync("TheEmailIsSetTo.txt", await page.content())
//       await page.screenshot({
//         path: "TheEmailIsSetTo.jpg",
//       });
//     }
//   })[0];
// })


// component.root
//   .findByProps({ type: "email" })
//   .props.onChange({ target: { value: email } });
// return component;
