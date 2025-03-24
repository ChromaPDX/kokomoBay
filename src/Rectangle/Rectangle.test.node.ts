import Testeranto from "testeranto/src/Node";
import { IPartialNodeInterface } from "testeranto/src/Types";

import Rectangle from "../Rectangle";
import { RectangleTesterantoBasePrototype } from "../Rectangle.test";
import { RectangleTesterantoBaseTestImplementation } from "../Rectangle.test.implementation";
import { IRectangleTestShape } from "../Rectangle.test.shape";
import { RectangleTesterantoBaseTestSpecification } from "../Rectangle.test.specification";

let guid;

const testInterface: IPartialNodeInterface<IRectangleTestShape> = {
  beforeAll(input, testResource, artificer, utils) {
    return new Promise(async (res, rej) => {
      const x = Object.create(input);

      res(input);
    });
  },

  andWhen: async function (s: Rectangle, whenCB): Promise<Rectangle> {
    return whenCB(s);
  },

  assertThis: (x) => {},
  afterAll: async (store, artificer, utils) => {},
};

export default Testeranto(
  RectangleTesterantoBasePrototype,
  RectangleTesterantoBaseTestSpecification,
  RectangleTesterantoBaseTestImplementation,
  testInterface
);
