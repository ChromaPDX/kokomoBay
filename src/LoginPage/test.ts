import { ITestSpecification } from "testeranto/src/Types";

export type ILoginPageSpecs = {
  iinput: any;
  isubject: any;
  istore: any;
  iselection: any;

  when: void;
  then: unknown;
  given: (x) => unknown;

  suites: {
    Default: [string];
  };
  givens: {
    default: [];
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
    ThereIsNotAnEmailError: [];
    TheSubmitButtonIsActive: [];
    TheSubmitButtonIsNotActive: [];
  };
  checks: {
    default;
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
        // test0: Given.default(
        //   ["0"],
        //   [When.TheEmailIsSetTo("adam@email.com")],
        //   [Then.TheEmailIs("adam@email.com"), Then.TheSubmitButtonIsNotActive()]
        // ),
        // test0_1: Given.default(
        //   ["0"],
        //   [],
        //   [Then.TheSubmitButtonIsNotActive(), Then.ThereIsNotAnEmailError()]
        // ),
        // test0_2: Given.default(
        //   ["0"],
        //   [When.TheEmailIsSetTo("adam@email.com")],
        //   [Then.ThereIsNotAnEmailError(), Then.TheSubmitButtonIsNotActive()]
        // ),
        // test0_3: Given.default(
        //   ["0"],
        //   [
        //     When.TheEmailIsSetTo("larry@email.com"),
        //     When.ThePasswordIsSetTo("secret"),
        //   ],
        //   [
        //     Then.TheSubmitButtonIsActive(),
        //     Then.TheEmailIs("larry@email.com"),
        //     // Then.ThereIsNotAnEmailError()
        //   ]
        // ),
        test0_4: Given.default(
          ["Curly cannot login, even if he knows the password"],
          [
            When.TheEmailIsSetTo("curly@email.com"),
            When.ThePasswordIsSetTo("secret"),
            When.TheLoginIsSubmitted(),
          ],
          [Then.TheEmailIs("curly@email.com"), Then.ThereIsACredentialError()]
        ),
        // test0_5: Given.default(
        //   ["0"],
        //   [
        //     When.TheEmailIsSetTo("BAD EMAIL"),
        //     When.ThePasswordIsSetTo("secret"),
        //     When.TheLoginIsSubmitted(),
        //   ],
        //   [Then.ThereIsNotAnEmailError()]
        // ),
        // test1: Given.default(
        //   [`0`],
        //   [
        //     When.TheEmailIsSetTo("adam@email.com"),
        //     When.ThePasswordIsSetTo("secret"),
        //   ],
        //   [
        //     Then.TheEmailIsNot("wade@rpc"),
        //     Then.TheEmailIs("adam@email.com"),
        //     Then.ThePasswordIs("secret"),
        //     Then.ThePasswordIsNot("idk"),
        //   ]
        // ),
        // test2: Given.default(
        //   [`0`],
        //   [When.TheEmailIsSetTo("adam@email.com")],
        //   [Then.ThereIsNotAnEmailError()]
        // ),
        // test3: Given.default(
        //   [`0`],
        //   [When.TheEmailIsSetTo("bob"), When.TheLoginIsSubmitted()],
        //   [Then.TheEmailIs("bob"), Then.ThereIsAnEmailError()]
        // ),
        // test3_5: Given.default(
        //   [`0`],
        //   [When.TheEmailIsSetTo("bob")],
        //   [Then.ThereIsNotAnEmailError()]
        // ),
        // test4: Given.default(
        //   [`0`],
        //   [
        //     When.TheEmailIsSetTo("adam@mail.com"),
        //     When.ThePasswordIsSetTo("foso"),
        //   ],
        //   [Then.ThereIsNotAnEmailError()]
        // ),
        // test5: Given.default(
        //   [`1`],
        //   [
        //     When.TheEmailIsSetTo("adam@mail.com"),
        //     When.ThePasswordIsSetTo("fosz"),
        //   ],
        //   [Then.ThereIsNotAnEmailError()]
        // ),
      },
      []
    ),
  ];
};
