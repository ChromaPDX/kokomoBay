import { createRequire } from 'module';const require = createRequire(import.meta.url);

// src/LoginPage/test.ts
var LoginPageSpecs = (Suite, Given, When, Then, Check) => {
  return [
    Suite.Default(
      "Testing the LoginPage as react",
      {
        test0: Given.default(
          ["you can type a bad email and the submit button is still inactive"],
          [When.TheEmailIsSetTo("a")],
          [Then.TheEmailIs("a"), Then.TheSubmitButtonIsNotActive()]
        ),
        test0_1: Given.default(
          [
            "by default, the submit button is not active and the email field is empty"
          ],
          [],
          [Then.TheSubmitButtonIsNotActive(), Then.ThereIsNotAnEmailError()]
        ),
        test0_2: Given.default(
          [
            "Enter a good email. There is no email error, but the submit button is still disabled"
          ],
          [When.TheEmailIsSetTo("adam@email.com")],
          [Then.ThereIsNotAnEmailError(), Then.TheSubmitButtonIsNotActive()]
        ),
        test0_3: Given.default(
          [
            "Enter an email and a password, and the submit button is active. There is no email error nor a credential error"
          ],
          [
            When.TheEmailIsSetTo("moe@email.com"),
            When.ThePasswordIsSetTo("secret")
          ],
          [
            Then.TheSubmitButtonIsActive(),
            Then.TheEmailIs("moe@email.com"),
            Then.ThereIsNotAnEmailError(),
            Then.ThereIsNotACredentialError()
          ]
        ),
        test0_3_1: Given.default(
          [
            "Enter an email and a password, and then click the submit button. There is a credential error"
          ],
          [
            When.TheEmailIsSetTo("larry@email.com"),
            When.ThePasswordIsSetTo("secret"),
            When.TheLoginIsSubmitted()
          ],
          [Then.ThereIsNotAnEmailError(), Then.ThereIsACredentialError()]
        ),
        test0_4: Given.default(
          ["Curly cannot login, even if he knows the password"],
          [
            When.TheEmailIsSetTo("curly@email.com"),
            When.ThePasswordIsSetTo("secret"),
            When.TheLoginIsSubmitted()
          ],
          [Then.TheEmailIs("curly@email.com"), Then.ThereIsACredentialError()]
        ),
        test0_5: Given.default(
          ["0"],
          [
            When.TheEmailIsSetTo("BAD EMAIL"),
            When.ThePasswordIsSetTo("secret"),
            When.TheLoginIsSubmitted()
          ],
          [Then.ThereIsAnEmailError()]
        ),
        test1: Given.default(
          [`0`],
          [
            When.TheEmailIsSetTo("adam@email.com"),
            When.ThePasswordIsSetTo("secret")
          ],
          [
            Then.TheEmailIsNot("wade@rpc"),
            Then.TheEmailIs("adam@email.com"),
            Then.ThePasswordIs("secret"),
            Then.ThePasswordIsNot("idk")
          ]
        ),
        test2: Given.default(
          [`0`],
          [When.TheEmailIsSetTo("adam@email.com")],
          [Then.ThereIsNotAnEmailError()]
        ),
        test3: Given.default(
          [`0`],
          [When.TheEmailIsSetTo("bob"), When.TheLoginIsSubmitted()],
          [Then.TheEmailIs("bob"), Then.ThereIsAnEmailError()]
        ),
        test3_5: Given.default(
          [`if you enter a bad email pattern, there will be an email error`],
          [When.TheEmailIsSetTo("bob")],
          [Then.ThereIsAnEmailError()]
        ),
        test4: Given.default(
          [`0`],
          [
            When.TheEmailIsSetTo("adam@mail.com"),
            When.ThePasswordIsSetTo("foso")
          ],
          [Then.ThereIsNotAnEmailError()]
        ),
        test5: Given.default(
          [`1`],
          [
            When.TheEmailIsSetTo("adam@mail.com"),
            When.ThePasswordIsSetTo("fosz")
          ],
          [Then.ThereIsNotAnEmailError()]
        )
      },
      []
    )
  ];
};

export {
  LoginPageSpecs
};
