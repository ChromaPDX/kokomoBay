import Testeranto from "testeranto/src/Node";
import { RectangleTesterantoBaseTestImplementation } from "../Rectangle.test.implementation";
import {
  O,
  RectangleTesterantoBaseTestSpecification,
} from "../Rectangle.test.specification";

import Rectangle from "../Rectangle";
import {
  I,
  RectangleTesterantoBaseInterface,
} from "../Rectangle.test.interface";
// import { IPartialNodeInterface } from "testeranto/src/Types";

// import Rectangle from "../Rectangle";
// import { RectangleTesterantoBaseTestImplementation } from "../Rectangle.test.implementation";
// import { IRectangleTestShape } from "../Rectangle.test.shape";
// import { RectangleTesterantoBaseTestSpecification } from "../Rectangle.test.specification";
// import { RectangleTesterantoBaseInterface } from "../Rectangle.test.interface";

// const testInterface: IPartialNodeInterface<IRectangleTestShape> = {
//   ...RectangleTesterantoBaseInterface,
//   beforeAll(input, testResource, artificer, utils) {
//     return new Promise(async (res, rej) => {
//       const x = Object.create(input);
//       res(input);
//     });
//   },

//   andWhen: async function (s, whenCB, tr, utils) {
//     return whenCB(s)(s, utils);
//   },

//   assertThis: (x) => {},
//   afterAll: async (store, artificer, utils) => {},
// };

export default Testeranto<I, O>(
  null,
  RectangleTesterantoBaseTestSpecification,
  RectangleTesterantoBaseTestImplementation,
  RectangleTesterantoBaseInterface
);
