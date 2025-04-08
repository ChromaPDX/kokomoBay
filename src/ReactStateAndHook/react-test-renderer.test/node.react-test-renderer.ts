import assert from "assert";

import { ITestImplementation } from "testeranto/src/Types";
import { I } from "testeranto/src/SubPackages/react-test-renderer/jsx/index";

import { O } from "../test";

import { Implementation } from ".";

export const NodeImplementation: ITestImplementation<I, O> =
  Implementation(assert);
