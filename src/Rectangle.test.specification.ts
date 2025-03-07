import { ITestSpecification } from "testeranto/src/Types";

import { IRectangleTestShape } from "./Rectangle.test.shape";

export const RectangleTesterantoBaseTestSpecification: ITestSpecification<
  IRectangleTestShape
> = (Suite, Given, When, Then, Check) => {
  return [
    Suite.Default(
      "Testing the Rectangle class",
      {
        test0: Given.Default(
          ["https://api.github.com/repos/adamwong246/testeranto/issues/8"],
          [When.setWidth(4), When.setHeight(9)],
          [Then.getWidth(4), Then.getHeight(9)]
        ),
        test1: Given.Default(
          [`0`],
          [When.setWidth(4), When.setHeight(5)],
          [
            Then.getWidth(4),
            Then.getHeight(5),
            Then.area(20),
            Then.AreaPlusCircumference(38),
          ]
        ),
        test2: Given.Default(
          [`0`],
          [When.setHeight(4), When.setWidth(33)],
          [Then.area(132)]
        ),
        test3: Given.Default(
          [`0`],
          [When.setHeight(5), When.setWidth(5)],
          [Then.area(25)]
        ),

        test4: Given.Default(
          [`0`],
          [When.setHeight(6), When.setWidth(6)],
          [Then.area(36)]
        ),
      },
      []
      // Check.Default(
      //   "imperative style",
      //   async ({ PostToAdd }, { TheNumberIs }) => {
      //     const a = await PostToAdd(2);
      //     const b = parseInt(await PostToAdd(3));
      //     await TheNumberIs(b);
      //     await PostToAdd(2);
      //     await TheNumberIs(7);
      //     await PostToAdd(3);
      //     await TheNumberIs(10);
      //     assert.equal(await PostToAdd(-15), -5);
      //     await TheNumberIs(-5);
      //   }
      // ),
      // ]
    ),
  ];
};
