import test from "testeranto/src/SubPackages/react/jsx/web";

import LoginPage, { actions } from "../index.js";
import {
  LoginPageSpecs
} from "../test.js";
import implementations from "./test.js";

export default test(
  implementations,
  LoginPageSpecs,
  LoginPage,
  {
    afterEach: async (x) => {
      await x().props.store.dispatch(actions.reset())
      return x;
    }
  }
);
