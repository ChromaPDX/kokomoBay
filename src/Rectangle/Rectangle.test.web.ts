import { testInterface } from "testeranto/src/SubPackages/react/jsx/index.js";
import Testeranto from "testeranto/src/Web";
import Rectangle from "../Rectangle";
import { RectangleTesterantoBaseTestImplementation } from "../Rectangle.test.implementation";
import { RectangleTesterantoBaseTestSpecification } from "../Rectangle.test.specification";
// import { IPartialNodeInterface } from "testeranto/src/Types";

// import { RectangleTesterantoBaseTestSpecification } from "../Rectangle.test.specification";
// import { RectangleTesterantoBaseTestImplementation } from "../Rectangle.test.implementation";
// import { RectangleTesterantoBaseInterface } from "../Rectangle.test.interface";
// import { IRectangleTestShape } from "../Rectangle.test.shape";
// import Rectangle from "../Rectangle";

// const testInterface: IPartialNodeInterface<IRectangleTestShape> = {
//   ...RectangleTesterantoBaseInterface,
//   beforeEach: async (rectangleProto) => {
//     return rectangleProto;
//   },
// };
// export default Testeranto<IRectangleTestShape>(
//   Rectangle.prototype,
//   RectangleTesterantoBaseTestSpecification,
//   RectangleTesterantoBaseTestImplementation,
//   testInterface,
//   {
//     ports: 0,
//   }
// );

// export {};

export default Testeranto(
  null,
  RectangleTesterantoBaseTestSpecification,
  RectangleTesterantoBaseTestImplementation,
  testInterface
);
