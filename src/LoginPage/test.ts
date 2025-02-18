import { ITestSpecification } from "testeranto/src/Types";

import { IFeatures } from "../../features.test.mjs";

export type ILoginPageSpecs = {
  features: IFeatures;
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
    ThereIsNotAnEmailError: [];
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
        test0: Given.default(
          ["67ae06bac3c5fa5a98a08e32"],
          [When.TheEmailIsSetTo("adam@email.com")],
          [Then.TheEmailIs("adam@email.com")]
        ),
        test1: Given.default(
          [`67ae06bac3c5fa5a98a08e32`],
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
        test2: Given.default(
          [`67ae06bac3c5fa5a98a08e32`],
          [When.TheEmailIsSetTo("adam@email.com")],
          [Then.ThereIsNotAnEmailError()]
        ),
        test3: Given.default(
          [`67ae06bac3c5fa5a98a08e32`],
          [When.TheEmailIsSetTo("bob"), When.TheLoginIsSubmitted()],
          [Then.ThereIsAnEmailError()]
        ),
        test4: Given.default(
          [`67ae06bac3c5fa5a98a08e32`],
          [
            When.TheEmailIsSetTo("adam@mail.com"),
            When.ThePasswordIsSetTo("foso"),
          ],
          [Then.ThereIsNotAnEmailError()]
        ),
        test5: Given.default(
          [`67ae44eceef213d8f11c40bb`],
          [
            When.TheEmailIsSetTo("adam@mail.com"),
            When.ThePasswordIsSetTo("foso"),
          ],
          [Then.ThereIsNotAnEmailError()]
        ),
      },
      []
    ),
  ];
};
