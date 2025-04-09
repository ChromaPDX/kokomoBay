import Testeranto from "testeranto/src/Node";

import {
  M,
  RectangleTesterantoBaseTestImplementation,
} from "./Rectangle.test.implementation";
import {
  O,
  RectangleTesterantoBaseTestSpecification,
} from "./Rectangle.test.specification";
import {
  I,
  RectangleTesterantoBaseInterface,
} from "./Rectangle.test.interface";

export default Testeranto<I, O, M>(
  null,
  RectangleTesterantoBaseTestSpecification,
  RectangleTesterantoBaseTestImplementation,
  RectangleTesterantoBaseInterface
);
