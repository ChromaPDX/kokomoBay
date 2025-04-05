import Testeranto from "testeranto/src/Web";
import { IPartialNodeInterface } from "testeranto/src/Types";

import { RectangleTesterantoBaseTestSpecification } from "../Rectangle.test.specification";
import { RectangleTesterantoBaseTestImplementation } from "../Rectangle.test.implementation";
import { RectangleTesterantoBaseInterface } from "../Rectangle.test.interface";
import { IRectangleTestShape } from "../Rectangle.test.shape";
import Rectangle from "../Rectangle";

const testInterface: IPartialNodeInterface<IRectangleTestShape> = {
  ...RectangleTesterantoBaseInterface,
  beforeEach: async (rectangleProto) => {
    return rectangleProto;
  },
};
export default Testeranto<IRectangleTestShape>(
  Rectangle.prototype,
  RectangleTesterantoBaseTestSpecification,
  RectangleTesterantoBaseTestImplementation,
  testInterface,
  {
    ports: 0,
  }
);

export {};
