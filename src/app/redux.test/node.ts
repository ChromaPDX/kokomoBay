import Testeranto from "../../subPackages/redux/node";

import { AppSpecification, implementations, input } from ".";

import { IStoreState } from "../app";
import { O } from "../app.test";

export default Testeranto<IStoreState, O>(
  input,
  AppSpecification,
  implementations
);
