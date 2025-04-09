import { ITestSpecification } from "testeranto/src/Types.js";

import { assert } from "chai";

import { IStoreState, loginApp } from "../app.js";
import { O } from "../app.test.js";
import { BaseImplementation } from "../../subPackages/redux.testeranto.test.js";
import { IReduxIn } from "../../subPackages/redux/index.js";

export type IImplementation = BaseImplementation<IStoreState, O>;

export const implementations: IImplementation = {
  suites: {
    Default: "Testing the Redux store",
  },
  givens: {
    AnEmptyState: loginApp.getInitialState(),
    AStateWithEmail: { ...loginApp.getInitialState(), email: "bob@mail.com" },
  },
  whens: {
    TheLoginIsSubmitted: () => [loginApp.actions.signIn],
    TheEmailIsSetTo: (email) => [loginApp.actions.setEmail, email],
    ThePasswordIsSetTo: (password) => [loginApp.actions.setPassword, password],
  },
  thens: {
    TheEmailIs: (email) => (storeState) => {
      assert.equal(storeState.email, email);
    },
    TheEmailIsNot: (email) => (storeState) => {
      assert.notEqual(storeState.email, email);
    },
    ThePasswordIs: (password) => (selection) =>
      assert.equal(selection.password, password),
    ThePasswordIsNot: (password) => (selection) =>
      assert.notEqual(selection.password, password),
  },
  checks: {
    AnEmptyState: loginApp.getInitialState(),
  },
};

export const input = loginApp.reducer;

export const AppSpecification: ITestSpecification<IReduxIn<IStoreState>, O> = (
  Suite,
  Given,
  When,
  Then
  // Check
) => {
  return [
    Suite.Default(
      "Testing the Redux store",

      {
        test0: Given.AnEmptyState(
          ["Set the email, check the email"],
          [When.TheEmailIsSetTo("adam@email.com")],
          [Then.TheEmailIs("adam@email.com")]
        ),
        test1: Given.AStateWithEmail(
          ["set the default email and then check"],
          [],
          [
            Then.TheEmailIsNot("adam@email.com"),
            Then.TheEmailIs("bob@mail.com"),
          ],
          "bob@mail.com"
        ),
        test2: Given.AnEmptyState(
          ["Set the email, set it again, and then check"],
          [When.TheEmailIsSetTo("hello"), When.TheEmailIsSetTo("aloha")],
          [Then.TheEmailIs("aloha")]
        ),
        test3: Given.AnEmptyState(
          ["the default email is nothing"],
          [],
          [Then.TheEmailIs("")]
        ),
        test4: Given.AnEmptyState(
          ["Set the email, check the email"],
          [When.TheEmailIsSetTo("hey there")],
          [Then.TheEmailIs("hey there")]
        ),
      },
      [
        // Check.AnEmptyState(
        //   "imperative style",
        //   [`aloha`],
        //   async ({ TheEmailIsSetTo }, { TheEmailIs }) => {
        //     await TheEmailIsSetTo("foo");
        //     await TheEmailIs("foo");
        //     const reduxPayload = await TheEmailIsSetTo("foobar");
        //     await TheEmailIs("foobar");
        //     // assert.deepEqual(reduxPayload, {
        //     //   type: "login app/setEmail",
        //     //   payload: "foobar",
        //     // });
        //   }
        // ),
      ]
    ),
  ];
};
