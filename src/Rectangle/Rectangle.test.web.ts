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
    ...RectangleTesterantoBaseInterface,
    beforeEach: async (
      rectangleProto: Rectangle,
      init: (c?: any) => (x: any) => (y: any) => Rectangle,
      tr: ITTestResourceConfiguration,
      i: any,
      initialValues: any,
      pm: PM_Web
    ): Promise<Rectangle> => {
      pm.writeFileSync("beforeEachLog", "bar");
      return rectangleProto;
    },
  },
  {
    ports: 0,
  }
);

export {};
