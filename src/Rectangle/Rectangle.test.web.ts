import { testInterface } from "testeranto/src/SubPackages/react/jsx/index.js";
import Testeranto from "testeranto/src/Web";

import { RectangleTesterantoBaseTestImplementation } from "./Rectangle.test.implementation";
import { RectangleTesterantoBaseTestSpecification } from "./Rectangle.test.specification";

export default Testeranto(
  null,
  RectangleTesterantoBaseTestSpecification,
  RectangleTesterantoBaseTestImplementation,
  testInterface
);
