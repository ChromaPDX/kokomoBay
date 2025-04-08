import Testeranto from "testeranto/src/Pure";

import { RectangleTesterantoBaseTestImplementation } from "./Rectangle.test.implementation";
import { RectangleTesterantoBaseTestSpecification } from "./Rectangle.test.specification";
import { RectangleTesterantoBaseInterface } from "./Rectangle.test.interface";

export default Testeranto(
  null,
  RectangleTesterantoBaseTestSpecification,
  RectangleTesterantoBaseTestImplementation,
  RectangleTesterantoBaseInterface
);
