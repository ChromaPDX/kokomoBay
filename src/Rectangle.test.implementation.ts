import { assert } from "chai";
import { ITestImplementation } from "testeranto/src/Types";
import type { PM } from "testeranto/src/PM";
import Rectangle from "./Rectangle";
import { IRectangleTestShape } from "./Rectangle.test.shape";

export const RectangleTesterantoBaseTestImplementation: ITestImplementation<IRectangleTestShape, Rectangle> = {
  suites: {
    Default: "a default suite",
  },

  givens: {
    Default: () => new Rectangle(2, 2),
    WidthOfOneAndHeightOfOne: () => new Rectangle(1, 1),
    WidthAndHeightOf: (width: number, height: number) => new Rectangle(width, height),
  },

  whens: {
    HeightIsPubliclySetTo: (height: number) => async (rectangle: Rectangle, utils: PM) => {
      rectangle.setHeight(height);
      return rectangle;
    },
    WidthIsPubliclySetTo: (width: number) => async (rectangle: Rectangle, utils: PM) => {
      rectangle.setWidth(width);
      return rectangle;
    },
    setWidth: (width: number) => async (rectangle: Rectangle, utils: PM) => {
      rectangle.setWidth(width);
      return rectangle;
    },
    setHeight: (height: number) => async (rectangle: Rectangle, utils: PM) => {
      rectangle.setHeight(height);
      return rectangle;
    },
  },

  thens: {
    AreaPlusCircumference: (combined: number) => (rectangle: Rectangle) => {
      assert.equal(rectangle.area() + rectangle.circumference(), combined);
      return rectangle;
    },
    getWidth: (expectedWidth: number) => (rectangle: Rectangle) => {
      assert.equal(rectangle.getWidth(), expectedWidth);
      return rectangle;
    },
    getHeight: (expectedHeight: number) => (rectangle: Rectangle) => {
      assert.equal(rectangle.getHeight(), expectedHeight);
      return rectangle;
    },
    area: (area: number) => (rectangle: Rectangle) => {
      assert.equal(rectangle.area(), area);
      return rectangle;
    },
    prototype: (name: string) => (rectangle: Rectangle) => {
      assert.equal(Object.getPrototypeOf(rectangle), Rectangle.prototype);
      return rectangle;
    },
    circumference: (circumference: number) => (rectangle: Rectangle) => {
      assert.equal(rectangle.circumference(), circumference);
      return rectangle;
    },
  },

  checks: {
    /* @ts-ignore:next-line */
    AnEmptyState: () => {
      return {};
    },
  },
};
