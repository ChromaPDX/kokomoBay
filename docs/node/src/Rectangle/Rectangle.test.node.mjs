import { createRequire } from 'module';const require = createRequire(import.meta.url);
import {
  Node_default,
  assert
} from "../../chunk-XPHEY5WE.mjs";
import "../../chunk-M7BKJ4RF.mjs";

// src/Rectangle.ts
var Rectangle = class {
  height;
  width;
  constructor(height = 2, width = 2) {
    this.height = height;
    this.width = width;
  }
  getHeight() {
    return this.height;
  }
  getWidth() {
    return this.width;
  }
  setHeight(height) {
    this.height = height;
  }
  setWidth(width) {
    this.width = width;
  }
  area() {
    return this.width * this.height;
  }
  circumference() {
    return 2 * (this.width + this.height);
  }
};
var Rectangle_default = Rectangle;

// src/Rectangle.test.ts
var RectangleTesterantoBasePrototype = Rectangle_default.prototype;

// src/Rectangle.test.implementation.ts
var RectangleTesterantoBaseTestImplementation = {
  suites: {
    Default: "a default suite"
  },
  givens: {
    Default: () => new Rectangle_default(),
    WidthOfOneAndHeightOfOne: () => new Rectangle_default(1, 1),
    WidthAndHeightOf: (width, height) => new Rectangle_default(width, height)
  },
  whens: {
    HeightIsPubliclySetTo: (height) => (rectangle) => rectangle.height = height,
    WidthIsPubliclySetTo: (width) => (rectangle) => rectangle.width = width,
    setWidth: (width) => (rectangle) => rectangle.setWidth(width),
    setHeight: (height) => (rectangle) => rectangle.setHeight(height)
  },
  thens: {
    AreaPlusCircumference: (combined) => (rectangle) => {
      assert.equal(rectangle.area() + rectangle.circumference(), combined);
    },
    getWidth: (width) => (rectangle) => assert.equal(rectangle.width, width),
    getHeight: (height) => (rectangle) => assert.equal(rectangle.height, height),
    area: (area) => (rectangle) => assert.equal(rectangle.area(), area),
    prototype: (name) => (rectangle) => assert.equal(1, 1),
    circumference: (circumference) => (rectangle) => assert.equal(rectangle.circumference(), circumference)
  },
  checks: {
    /* @ts-ignore:next-line */
    AnEmptyState: () => {
      return {};
    }
  }
};

// src/Rectangle.test.specification.ts
var RectangleTesterantoBaseTestSpecification = (Suite, Given, When, Then, Check) => {
  return [
    Suite.Default(
      "Testing the Rectangle class",
      {
        test0: Given.Default(
          ["https://api.github.com/repos/adamwong246/testeranto/issues/8"],
          [When.setWidth(4), When.setHeight(9)],
          [Then.getWidth(4), Then.getHeight(9)]
        ),
        test1: Given.Default(
          [`0`],
          [When.setWidth(4), When.setHeight(5)],
          [
            Then.getWidth(4),
            Then.getHeight(5),
            Then.area(20),
            Then.AreaPlusCircumference(38)
          ]
        ),
        test2: Given.Default(
          [`0`],
          [When.setHeight(4), When.setWidth(33)],
          [Then.area(132)]
        ),
        test3: Given.Default(
          [`0`],
          [When.setHeight(5), When.setWidth(5)],
          [Then.area(25)]
        ),
        test4: Given.Default(
          [`0`],
          [When.setHeight(6), When.setWidth(6)],
          [Then.area(36)]
        )
      },
      []
      // Check.Default(
      //   "imperative style",
      //   async ({ PostToAdd }, { TheNumberIs }) => {
      //     const a = await PostToAdd(2);
      //     const b = parseInt(await PostToAdd(3));
      //     await TheNumberIs(b);
      //     await PostToAdd(2);
      //     await TheNumberIs(7);
      //     await PostToAdd(3);
      //     await TheNumberIs(10);
      //     assert.equal(await PostToAdd(-15), -5);
      //     await TheNumberIs(-5);
      //   }
      // ),
      // ]
    )
  ];
};

// src/Rectangle/Rectangle.test.node.ts
var testInterface = {
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
  andWhen: async function(s, whenCB) {
    return whenCB(s);
  },
  assertThis: (x) => {
  },
  afterAll: async (store, artificer, utils) => {
  }
};
var Rectangle_test_node_default = Node_default(
  RectangleTesterantoBasePrototype,
  RectangleTesterantoBaseTestSpecification,
  RectangleTesterantoBaseTestImplementation,
  testInterface
);
export {
  Rectangle_test_node_default as default
};
