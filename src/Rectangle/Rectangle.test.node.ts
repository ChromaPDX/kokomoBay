import Testeranto from "testeranto/src/Node";

import { RectangleTesterantoBaseTestImplementation } from "./Rectangle.test.implementation";
import {
  O,
  RectangleTesterantoBaseTestSpecification,
} from "./Rectangle.test.specification";
import {
  I,
  RectangleTesterantoBaseInterface,
} from "./Rectangle.test.interface";

export default Testeranto<I, O>(
  null,
  RectangleTesterantoBaseTestSpecification,
  RectangleTesterantoBaseTestImplementation,
  RectangleTesterantoBaseInterface
);
