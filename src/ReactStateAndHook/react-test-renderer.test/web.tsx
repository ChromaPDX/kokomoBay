
import Testeranto from "testeranto/src/SubPackages/react-test-renderer/jsx/web.js";

import ReactStateAndHook from "..";

import { WebImplementation } from "./web.react-test-renderer";
import { ReactTestRenderSpecification } from "./specification";

export default Testeranto(WebImplementation, ReactTestRenderSpecification, ReactStateAndHook);
