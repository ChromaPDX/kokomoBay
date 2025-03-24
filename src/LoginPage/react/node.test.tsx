import test from "testeranto/src/SubPackages/react/jsx/node";

// import { testInterface as baseInterface } from "testeranto/src/SubPackages/react/jsx/index.js";
import { testInterface as baseInterface } from "testeranto/src/SubPackages/react/jsx/index";

import LoginPage, { actions } from "../index.js";
import { LoginPageSpecs } from "../test.js";
import implementations from "./test.js";

export default test(
  implementations,
  LoginPageSpecs,
  LoginPage,
  {
    ...baseInterface,
    afterEach: async (x) => {
      await x().props.store.dispatch(actions.reset())
      return x;
    }
  }
  // {
  //   // beforeEach: async (proto, init, artificer, tr, x, pm) => {
  //   //   // pm.writeFileSync("beforeEachLog", "bar");
  //   //   return proto;
  //   // },
  //   // afterAll: (store, artificer, utils) => {
  //   //   // utils.writeFileSync("afterAllLog", "bar");
  //   //   return store;
  //   // }
  // }
);
