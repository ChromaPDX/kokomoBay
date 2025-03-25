import type { IPartialInterface } from "testeranto/src/Types";
import type { PM } from "testeranto/src/PM";
import Rectangle from "./Rectangle";
import { IRectangleTestShape } from "./Rectangle.test.shape";

export const RectangleTesterantoBaseInterface: IPartialInterface<IRectangleTestShape, Rectangle, PM> =
  {
    beforeEach: async (subject: Rectangle, initializer, art, tr, initialValues, utils: PM) => {
      return subject;
    },
    andWhen: async function (renderer: Rectangle, actioner, tr, utils: PM) {
      return actioner(renderer);
    },
    butThen: (s: Rectangle, t, tr, utils: PM) => {
      return t(s);
    },
  };

export const RectangleTesterantoBasePrototype = Rectangle.prototype;
