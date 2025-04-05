import { createRequire } from 'module';const require = createRequire(import.meta.url);

// src/app.test.ts
var AppSpecification = (Suite, Given, When, Then, Check) => {
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
            Then.TheEmailIs("bob@mail.com")
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
        )
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
    )
  ];
};

export {
  AppSpecification
};
