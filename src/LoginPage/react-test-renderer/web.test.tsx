import { assert } from "chai";
import test from "testeranto/src/SubPackages/react-test-renderer/jsx/web.js";

import { LoginPageSpecs } from "../test.js";
import LoginPage, { credentialFailWarning, credErrorId, emailwarning } from "../index.js";

import { LoginPageReactTestRendererTestInterface } from "./test.js";

import renderer, { act, ReactTestRenderer } from "react-test-renderer";
import { PM } from "testeranto/src/PM/index.js";

export default test(
  {
    suites: {
      Default: "a default suite",
    },
    givens: {
      default: () => (i) => {
        return i;
      },
    },
    whens: {
      TheLoginIsSubmitted: () => async (component, utils) => {

        return new Promise(async (res, rej) => {
          utils.customScreenShot({ path: 'TheLoginIsSubmitte3.png' })
          // console.log("foo", utils.writeFileSync.toString())
          await utils.writeFileSync("TheLoginIsSubmitted4", JSON.stringify(component.root.findByType("button").props))
          await component.root.findByType("button").props.onClick()
          await utils.writeFileSync("TheLoginIsSubmitted5", JSON.stringify(component.root.findByType("button").props))
          res({})
        })


      },

      TheEmailIsSetTo: (email) => (component) => {
        component.root
          .findByProps({ type: "email" })
          .props.onChange({ target: { value: email } });
        return component;
      },

      ThePasswordIsSetTo: (password) => (component) => component.root
        .findByProps({ type: "password" })
        .props.onChange({ target: { value: password } }),

    },

    thens: {
      TheEmailIs: (email) => async (component, utils) => {
        assert.equal(
          component.root.findByProps({ type: "email" }).props.value,
          email
        );
      },
      TheEmailIsNot: (email) => (component) => assert.notEqual(
        component.root.findByProps({ type: "email" }).props.value,
        email
      ),
      ThePasswordIs: (password) => (component) => assert.equal(
        component.root.findByProps({ type: "password" }).props.value,
        password
      ),
      ThePasswordIsNot: (password) => (component) => assert.notEqual(
        component.root.findByProps({ type: "password" }).props.value,
        password
      ),
      ThereIsAnEmailError: () => (component: ReactTestRenderer) => {
        assert.equal(
          component.root.findByProps({ id: "invalid-email-warning" }).children[0],
          emailwarning
        );
      },
      ThereIsNotAnEmailError: () => (component: renderer.ReactTestRenderer) => {
        const errorField = component.root.findByProps({ id: "invalid-email-warning" });
        assert.equal(errorField.children.length, 0);
      },
      ThereIsACredentialError: () => async (component: ReactTestRenderer, utils: PM) => {
        assert.equal(component.root.findByProps({ id: credErrorId }).props.children, credentialFailWarning);
      },
      TheSubmitButtonIsActive: () => (component: ReactTestRenderer) => {
        assert.isFalse(component.root.findByType("button").props.disabled);
      },
      TheSubmitButtonIsNotActive: () => (component: ReactTestRenderer) => {
        assert.isTrue(component.root.findByType("button").props.disabled);
      },
      ThereIsNotACredentialError: () => (component: ReactTestRenderer, utils: PM) => {
        const errorField = component.root.findByProps({ id: credErrorId });
        assert.isTrue(errorField.children.length === 0);
      }
    },

    checks: {
      default: () => () => {
        return {};
      },
    },
  },
  LoginPageSpecs,
  LoginPage,
  LoginPageReactTestRendererTestInterface,
);
