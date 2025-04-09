import Testeranto from "../../subPackages/redux/pure";

import { AppSpecification, implementations, input } from ".";
import { O } from "../app.test";
import { IStoreState } from "../app";

export default Testeranto<IStoreState, O>(
  input,
  AppSpecification,
  implementations
);
