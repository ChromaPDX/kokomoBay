import type { IPartialInterface, ITestArtificer, ITTestResourceConfiguration } from "testeranto/src/Types";
import type { PM } from "testeranto/src/PM";
import Rectangle from "./Rectangle";
import { IRectangleTestShape } from "./Rectangle.test.shape";

export const RectangleTesterantoBaseInterface: IPartialInterface<IRectangleTestShape, Rectangle, PM> =
  {
    beforeEach: async (subject, initializer, art, tr, initialValues) => {
      return subject;
    },
    andWhen: async function (renderer, actioner) {
      actioner(renderer);
      return renderer;
    },
    butThen: (s, t, tr) => {
      return t(s);
    },
  };

export const RectangleTesterantoBasePrototype = Rectangle.prototype;
