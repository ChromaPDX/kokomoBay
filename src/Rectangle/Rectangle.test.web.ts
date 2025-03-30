import Testeranto from "testeranto/src/Web";
import { IPartialNodeInterface } from "testeranto/src/Types";

import { RectangleTesterantoBaseTestSpecification } from "../Rectangle.test.specification";
import { RectangleTesterantoBaseTestImplementation } from "../Rectangle.test.implementation";
import { RectangleTesterantoBasePrototype } from "../Rectangle.test";
import { RectangleTesterantoBaseInterface } from "../Rectangle.test.interface";
import { IRectangleTestShape } from "../Rectangle.test.shape";

const testInterface: IPartialNodeInterface<IRectangleTestShape> = {
  ...RectangleTesterantoBaseInterface,
  beforeEach: async (rectangleProto, init, art, tr, initialValues, pm) => {
    return rectangleProto;
  },
};
export default Testeranto<IRectangleTestShape>(
  RectangleTesterantoBasePrototype,
  RectangleTesterantoBaseTestSpecification,
  RectangleTesterantoBaseTestImplementation,
  testInterface,
  {
    ports: 0,
  }
);

export {};
