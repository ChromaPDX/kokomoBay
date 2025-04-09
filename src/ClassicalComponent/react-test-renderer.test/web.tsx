import test from "testeranto/src/SubPackages/react-test-renderer/component/web";

import { ClassicalComponent } from "../index.js";
import { ClassicalComponentSpec, O } from "../dynamic.spec.js";

import { testImplementation } from "./implementation.js";

export default test<O, IProps, IState>(
  testImplementation,
  ClassicalComponentSpec,
  ClassicalComponent,
);
