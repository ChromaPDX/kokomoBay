
import ClassicalComponent from "..";
import test from "testeranto/src/SubPackages/react-dom/component/node";
import { ClassicalComponentStaticImpl, ClassicalComponentStaticSpec } from "../static.spec";

export default test(
  ClassicalComponentStaticImpl,
  ClassicalComponentStaticSpec,
  ClassicalComponent,
);
