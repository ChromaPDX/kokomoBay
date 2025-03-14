import { assert } from "chai";

import { ITestImplementation } from "testeranto/src/Types";
import Rectangle from "./Rectangle";
import { IRectangleTestShape } from "./Rectangle.test.shape";

export const RectangleTesterantoBaseTestImplementation: ITestImplementation<
  IRectangleTestShape,
  {
    givens: {
      Default: () => Rectangle;
      WidthOfOneAndHeightOfOne: () => Rectangle;
      WidthAndHeightOf: (width: number, height: number) => Rectangle;
    };
    whens: {
      HeightIsPubliclySetTo: (height: number) => (rectangle: Rectangle) => void;
      WidthIsPubliclySetTo: (width: number) => (rectangle: Rectangle) => void;
      setWidth: (width: number) => (rectangle: Rectangle) => void;
      setHeight: (height: number) => (rectangle: Rectangle) => void;
    };
  }
> = {
  suites: {
    Default: "a default suite",
  },

  givens: {
    Default: () => new Rectangle(),
    WidthOfOneAndHeightOfOne: () => new Rectangle(1, 1),
    WidthAndHeightOf: (width, height) => new Rectangle(width, height),
  },

  whens: {
    HeightIsPubliclySetTo: (height) => (rectangle) =>
      (rectangle.height = height),
    WidthIsPubliclySetTo: (width) => (rectangle) => (rectangle.width = width),
    setWidth: (width) => (rectangle) => rectangle.setWidth(width),
    setHeight: (height) => (rectangle) => rectangle.setHeight(height),
  },

  thens: {
    AreaPlusCircumference: (combined) => (rectangle) => {
      assert.equal(rectangle.area() + rectangle.circumference(), combined);
    },
    getWidth: (width) => (rectangle) => assert.equal(rectangle.getWidth(), width),

    getHeight: (height) => (rectangle) =>
      assert.equal(rectangle.getHeight(), height),

    area: (area) => (rectangle) => assert.equal(rectangle.area(), area),

    prototype: (name) => (rectangle) => assert.equal(1, 1),

    circumference: (circumference) => (rectangle) =>
      assert.equal(rectangle.circumference(), circumference),
  },

  checks: {
    /* @ts-ignore:next-line */
    AnEmptyState: () => {
      return {};
    },
  },
};
