import { Ibdd_out, ITestSpecification } from "testeranto/src/Types";

import someFeature from "./Rectangle/rectangle.md";

import { I } from "./Rectangle.test.interface";

export type O = Ibdd_out<
  {
    Default: [string];
  },
  {
    Default;
    WidthOfOneAndHeightOfOne;
    WidthAndHeightOf: [number, number];
  },
  {
    HeightIsPubliclySetTo: [number];
    WidthIsPubliclySetTo: [number];
    setWidth: [number];
    setHeight: [number];
  },
  {
    AreaPlusCircumference: [number];
    circumference: [number];
    getWidth: [number];
    getHeight: [number];
    area: [number];
    prototype: [];
  },
  {
    Default;
    WidthOfOneAndHeightOfOne;
    WidthAndHeightOf: [number, number];
  }
>;

export const RectangleTesterantoBaseTestSpecification: ITestSpecification<
  I,
  O
> = (Suite, Given, When, Then, Check) => {
  return [
    Suite.Default(
      "Testing the Rectangle class",
      {
        test0: Given.Default(
          ["https://api.github.com/repos/adamwong246/testeranto/issues/8"],
          [When.setWidth(4), When.setHeight(19)],
          [Then.getWidth(4), Then.getHeight(19)]
        ),
        test1: Given.Default(
          [`Rectangles have width and height.`],
          [When.setWidth(4), When.setHeight(5)],
          [
            Then.getWidth(4),
            Then.getHeight(5),
            Then.area(20),
            Then.AreaPlusCircumference(38),
          ]
        ),
        test2: Given.Default(
          [`Rectangles have area`],
          [When.setHeight(4), When.setWidth(33)],
          [Then.area(132)]
        ),
        test2_1: Given.Default(
          [`Rectangles have default size`],
          [],
          [Then.getWidth(2), Then.getHeight(2)]
        ),
        test3: Given.Default(
          [someFeature],
          [When.setHeight(5), When.setWidth(5)],
          [Then.area(25)]
        ),
        test4: Given.Default(
          [`Rectangles have area`],
          [When.setHeight(6), When.setWidth(6)],
          [Then.area(36)]
        ),
        test5: Given.Default(
          [`Rectangles have default size, again`],
          [],
          [Then.getWidth(2), Then.getHeight(2)]
        ),
      },

      [
        Check.Default("imperative style?!", [], async (rectangle) => {
          console.log(rectangle);
          // Then.getWidth(2).thenCB(rectangle);
          // Then.getHeight(2).thenCB(rectangle);
          // When.setHeight(22).whenCB(rectangle);
          // Then.getHeight(232).thenCB(rectangle);
        }),
      ]
    ),
  ];
};
