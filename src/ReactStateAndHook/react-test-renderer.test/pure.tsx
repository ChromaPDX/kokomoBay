
import Testeranto from "testeranto/src/SubPackages/react-test-renderer/jsx/pure.js";

import ReactStateAndHook from "..";

import { NodeImplementation } from "./node.react-test-renderer";
import { ReactTestRenderSpecification } from "./specification";

export default Testeranto(NodeImplementation, ReactTestRenderSpecification, ReactStateAndHook);
