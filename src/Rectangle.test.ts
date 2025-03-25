import type { IPartialInterface } from "testeranto/src/Types";
import type { PM } from "testeranto/src/PM";
import Rectangle from "./Rectangle";
import { IRectangleTestShape } from "./Rectangle.test.shape";

export const RectangleTesterantoBaseInterface = {
  beforeEach: async (
    subject: Rectangle, 
    initializer: (c?: any) => (x: any) => (y: any) => Rectangle,
    art: any,
    tr: any,
    initialValues: any,
    utils: PM
  ): Promise<Rectangle> => {
    return subject;
  },
  andWhen: async function (
    renderer: Rectangle,
    actioner: (s: Rectangle) => Promise<Rectangle>,
    tr: any,
    utils: PM
  ): Promise<Rectangle> {
    return actioner(renderer);
  },
  butThen: async (
    s: Rectangle,
    t: (r: Rectangle) => Rectangle,
    tr: any,
    utils: PM
  ): Promise<Rectangle> => {
    return t(s);
  },
};

export const RectangleTesterantoBasePrototype = Rectangle.prototype;
