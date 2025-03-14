import Testeranto from "testeranto/src/Node";

import { INodeTestInterface } from "../../../testeranto/src/lib/types";
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
  // beforeEach: async (): Promise<any> => {
  //   // console.log("beta");
  //   return new Promise((resolve, rej) => {
  //     resolve(React.createElement(testInput, {}, []));
  //   });
  // },
  andWhen: async function (s: Rectangle, whenCB): Promise<Rectangle> {
    // console.log("gamma", s, whenCB.toString());
    return whenCB(s);
  },

  assertThis: (x) => {},
  afterAll: async (store, artificer, utils) => {
    // const page = (await browser.pages())[0]; //.map((x) => x.url())); // === 'file:///Users/adam/Code/kokomoBay/dist/web/src/ClassicalComponent/test.html'))[0]
    // utils.ipc.postMessage({
    //   teardown: guid,
    // });
    // console.log("delta!", guid);
  },
};

export default Testeranto(
  RectangleTesterantoBasePrototype,
  RectangleTesterantoBaseTestSpecification,
  RectangleTesterantoBaseTestImplementation,
  testInterface
);
