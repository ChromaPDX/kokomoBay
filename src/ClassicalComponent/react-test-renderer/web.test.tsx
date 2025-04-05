import test from "testeranto/src/SubPackages/react-test-renderer/component/web";
import { ReactTestRenderer } from "react-test-renderer";

import { ClassicalComponent } from "../index.js";
import { ClassicalComponentSpec } from "../test.specification.js";
import { testImplementation } from "./test.implementation.js";

export default test<typeof ClassicalComponentSpec, ReactTestRenderer>(
  testImplementation,
  ClassicalComponentSpec,
  ClassicalComponent,
);
