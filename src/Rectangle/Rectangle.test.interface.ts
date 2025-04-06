import { PM } from "testeranto/src/PM";
import { Ibdd_in, IPartialInterface } from "testeranto/src/Types";

import Rectangle from "./Rectangle";

export type I = Ibdd_in<
  null,
  null,
  Rectangle,
  Rectangle,
  Rectangle,
  (...x) => (rectangle: Rectangle, utils: PM) => Rectangle,
  (rectangle: Rectangle, utils: PM) => Rectangle
>;

export const RectangleTesterantoBaseInterface: IPartialInterface<I> = {
  beforeEach: async (subject, i) => {
    return i();
  },
  andWhen: async function (s, whenCB, tr, utils) {
    return whenCB(s)(s, utils);
  },
  butThen: async (s, t, tr, pm) => {
    return t(s, pm);
  },
};
