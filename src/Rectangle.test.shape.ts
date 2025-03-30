import { PM } from "testeranto/src/PM";
import Rectangle from "./Rectangle";

export type IRectangleTestShape = {
  iinput: Rectangle;
  isubject: Rectangle;
  istore: Rectangle;
  iselection: Rectangle;

  given: Rectangle;
  when: (...x) => (rectangle: Rectangle, utils: PM) => Rectangle;
  then: (rectangle: Rectangle, utils: PM) => Rectangle;

  // when: Rectangle;
  // then: Rectangle;
  // given: Rectangle;

  suites: {
    Default: [string];
  };
  givens: {
    Default;
    WidthOfOneAndHeightOfOne;
    WidthAndHeightOf: [number, number];
  };
  whens: {
    HeightIsPubliclySetTo: [number];
    WidthIsPubliclySetTo: [number];
    setWidth: [number];
    setHeight: [number];
  };
  thens: {
    AreaPlusCircumference: [number];
    circumference: [number];
    getWidth: [number];
    getHeight: [number];
    area: [number];
    prototype: [];
  };
  checks: {
    Default;
    WidthOfOneAndHeightOfOne;
    WidthAndHeightOf: [number, number];
  };
};
