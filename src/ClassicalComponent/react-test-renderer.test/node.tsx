import test from "testeranto/src/SubPackages/react-test-renderer/component/node";

import { ClassicalComponent, IProps, IState } from "../index.js";
import { ClassicalComponentSpec, O } from "../dynamic.spec.js";

import { testImplementation } from "./implementation.js";

// import { M } from "./implementation.js";

export default test<O, IProps, IState>(
  testImplementation,
  ClassicalComponentSpec,
  ClassicalComponent
);
