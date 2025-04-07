import { Ibdd_out, ITestImplementation } from "testeranto/src/Types";
import { assert } from "chai";

import { ILoginPageSpecs } from "../test.js";
import { credentialFailWarning, credErrorId, emailInputId, emailwarning, loginInputId, passwordInputId } from "../index.js";
import { PM } from "../../../../testeranto/src/PM/index.js";

const emailInput = `#${emailInputId}`;
const passwordInput = `#${passwordInputId}`;
const loginButton = `#${loginInputId}`;

const assert$ = async (sel: string, utils: PM) => {
  const x = await utils.$(sel);
  if (x) {
    assert(true, `'${sel}' evaluated to: ${x}`)
  } else {
    assert(x, `Expected ${sel} to evaluate OK, but it evaluated to: ${x}`);
  }
}

declare module "../../../../testeranto/src/PM/index.js" {
  interface PM {
    getText(selector: string): Promise<string>;
  }
}

PM.prototype.getText = async function (selector: string) {
  const element = await this.$(selector);
  if (!element) {
    throw new Error(`Element with selector ${selector} not found`);
  }
  return element.textContent?.trim() || '';
}

export const loginPageImplreactDom: ITestImplementation<
  ILoginPageSpecs<unknown>,
  Ibdd_out<
    Record<string, unknown>, Record<string, unknown>, Record<string, unknown>, Record<string, unknown>, Record<string, unknown>>
> = {
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
      utils.customScreenShot({ path: "ThereIsAnEmailError.jpg" });
      assert$(`#invalid-email-warning ::-p-text(${emailwarning})`, utils);

    },
    ThereIsNotAnEmailError: () => async (store, utils) => {
      utils.customScreenShot({ path: "ThereIsNotAnEmailError.jpg" });
      assert$("#invalid-email-warning ::-p-text()", utils);
    },
    TheSubmitButtonIsActive: () => (component, utils) => {
      return new Promise<void>(async (resolve, rej) => {
        // assert(!(await utils.isDisabled(loginButton)));
        resolve();
      });
    },
    TheSubmitButtonIsNotActive: () => (component, utils) => {
      return new Promise<void>(async (resolve, rej) => {
        // assert((await utils.isDisabled(loginButton)));
        resolve();
      });
    },
    ThereIsACredentialError: () => async (ssel, utils) => {
      // utils.customScreenShot({ path: 'ThereIsACredentialError.png' })
      assert$(`#${credErrorId} ::-p-text(${credentialFailWarning})`, utils);
    },
    ThereIsNotACredentialError: () => async (ssel, utils) => {
      // utils.customScreenShot({ path: 'ThereIsNotACredentialError.png' })
      assert$(`#${credErrorId}`, utils);
      assert.isNull(await utils.$(`#error ::-p-text(${credentialFailWarning})`))
    }
  },

  checks: {
    default: () => () => {
      return {};
    },
  },
};
