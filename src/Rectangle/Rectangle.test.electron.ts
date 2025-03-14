import Testeranto from "testeranto/src/Web";
import { PM_Web } from "testeranto/src/PM/web";
import { ITTestResourceConfiguration } from "testeranto/src/lib";

import Rectangle from "../Rectangle";
import { RectangleTesterantoBaseTestSpecification } from "../Rectangle.test.specification";
import { RectangleTesterantoBaseTestImplementation } from "../Rectangle.test.implementation";
import { RectangleTesterantoBasePrototype } from "../Rectangle.test";

export default Testeranto(
  RectangleTesterantoBasePrototype,
  RectangleTesterantoBaseTestSpecification,
  RectangleTesterantoBaseTestImplementation,
  {
    beforeEach: async (
      rectangleProto,
      init,
      artificer,
      tr: ITTestResourceConfiguration,
      x,
      pm: PM_Web
    ) => {
      pm.writeFileSync("beforeEachLog", "bar");
      return rectangleProto;
    },
    afterAll: async (store, artificer, utils) => {
      return new Promise(async (res, rej) => {
        res(store);
      });
    },
    andWhen: async function (
      s: Rectangle,
      whenCB,
      tr,
      utils
    ): Promise<Rectangle> {
      return whenCB(s);
    },
  },
  {
    ports: 0,
  }
);

export {};
