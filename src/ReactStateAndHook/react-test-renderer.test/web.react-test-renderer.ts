import { assert } from "chai";

import { ITestImplementation } from "testeranto/src/Types";
import { I } from "testeranto/src/SubPackages/react-test-renderer/jsx/index";

import { O } from "../test";
import { Implementation } from ".";

export const WebImplementation: ITestImplementation<I, O> =
  Implementation(assert);
