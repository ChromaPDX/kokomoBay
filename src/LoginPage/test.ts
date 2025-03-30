import { ITestSpecification } from "testeranto/src/Types";
import type renderer from "react-test-renderer";

import readme from "./readme.md";

export type ILoginPageSpecs = {
  iinput: any;
  isubject: any;
  istore: () => React.JSX.Element;
  iselection: any;

  when: renderer.ReactTestRenderer;
  then: unknown;
  given: (x) => unknown;

  suites: {
    Default: [string];
  };
  givens: {
    Default: [];
  };
  whens: {
    TheLoginIsSubmitted: [];
    TheEmailIsSetTo: [string];
    ThePasswordIsSetTo: [string];
  };
  thens: {
    TheEmailIs: [string];
    TheEmailIsNot: [string];
    ThePasswordIs: [string];
    ThePasswordIsNot: [string];
    ThereIsAnEmailError: [];
    ThereIsACredentialError: [];
    ThereIsNotACredentialError: [];
    ThereIsNotAnEmailError: [];
    TheSubmitButtonIsActive: [];
    TheSubmitButtonIsNotActive: [];
  };
  checks: {
    Default: [];
  };
};

export const LoginPageSpecs: ITestSpecification<ILoginPageSpecs> = (
  Suite,
  Given,
  When,
  Then,
  Check
) => {
  return [
    Suite.Default(
      "Testing the LoginPage as react",
      {
        test0: Given.Default(
          ["you can type a bad email and the submit button is still inactive"],
          [When.TheEmailIsSetTo("a")],
          [Then.TheEmailIs("a"), Then.TheSubmitButtonIsNotActive()]
        ),
        test0_1: Given.Default(
          [
            "by default, the submit button is not active and the email field is empty",
          ],
          [],
          [Then.TheSubmitButtonIsNotActive(), Then.ThereIsNotAnEmailError()]
        ),
        test0_2: Given.Default(
          [
            "Enter a good email. There is no email error, but the submit button is still disabled",
          ],
          [When.TheEmailIsSetTo("adam@email.com")],
          [Then.ThereIsNotAnEmailError(), Then.TheSubmitButtonIsNotActive()]
        ),
        test0_3: Given.Default(
          [
            "Enter an email and a password, and the submit button is active. There is no email error nor a credential error",
          ],
          [
            When.TheEmailIsSetTo("moe@email.com"),
            When.ThePasswordIsSetTo("secret"),
          ],
          [
            Then.TheSubmitButtonIsActive(),
            Then.TheEmailIs("moe@email.com"),
            Then.ThereIsNotAnEmailError(),
            Then.ThereIsNotACredentialError(),
          ]
        ),
        test0_3_1: Given.Default(
          [
            "Enter an email and a password, and then click the submit button. There is a credential error",
          ],
          [
            When.TheEmailIsSetTo("larry@email.com"),
            When.ThePasswordIsSetTo("secret"),
            When.TheLoginIsSubmitted(),
          ],
          [Then.ThereIsNotAnEmailError(), Then.ThereIsACredentialError()]
        ),

        test0_4: Given.Default(
          ["Curly cannot login, even if he knows the password"],
          [
            When.TheEmailIsSetTo("curly@email.com"),
            When.ThePasswordIsSetTo("secret"),
            When.TheLoginIsSubmitted(),
          ],
          [Then.TheEmailIs("curly@email.com"), Then.ThereIsACredentialError()]
        ),
        test0_5: Given.Default(
          [readme],
          [
            When.TheEmailIsSetTo("BAD EMAIL"),
            When.ThePasswordIsSetTo("secret"),
            When.TheLoginIsSubmitted(),
          ],
          [Then.ThereIsAnEmailError()]
        ),
        test1: Given.Default(
          [readme],
          [
            When.TheEmailIsSetTo("adam@email.com"),
            When.ThePasswordIsSetTo("secret"),
          ],
          [
            Then.TheEmailIsNot("wade@rpc"),
            Then.TheEmailIs("adam@email.com"),
            Then.ThePasswordIs("secret"),
            Then.ThePasswordIsNot("idk"),
          ]
        ),
        test2: Given.Default(
          [readme],
          [When.TheEmailIsSetTo("adam@email.com")],
          [Then.ThereIsNotAnEmailError()]
        ),
        test3: Given.Default(
          [readme],
          [When.TheEmailIsSetTo("bob"), When.TheLoginIsSubmitted()],
          [Then.TheEmailIs("bob"), Then.ThereIsAnEmailError()]
        ),
        test3_5: Given.Default(
          [`if you enter a bad email pattern, there will be an email error`],
          [When.TheEmailIsSetTo("bob")],
          [Then.ThereIsAnEmailError()]
        ),
        test4: Given.Default(
          [readme],
          [
            When.TheEmailIsSetTo("adam@mail.com"),
            When.ThePasswordIsSetTo("foso"),
          ],
          [Then.ThereIsNotAnEmailError()]
        ),
        test5: Given.Default(
          [readme],
          [
            When.TheEmailIsSetTo("adam@mail.com"),
            When.ThePasswordIsSetTo("fosz"),
          ],
          [Then.ThereIsNotAnEmailError()]
        ),
      },
      []
    ),
  ];
};
