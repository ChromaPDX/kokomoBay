import { IBaseConfig } from "testeranto/src/Types";

import { baseConfig } from "./index.mjs";
import { solidityEsBuildConfig } from "../src/subPackages/solidity";

const config: IBaseConfig = {
  ...baseConfig,

  tests: [
    // [
    //   "./src/ClassicalComponent/react-dom/client.web.test.tsx",
    //   "web",
    //   { ports: 0 },
    //   [],
    // ],
    [
      "./src/ClassicalComponent/react-dom/server.node.test.tsx",
      "node",
      { ports: 0 },
      [],
    ],
    [
      "./src/ClassicalComponent/react-test-renderer/node.test.tsx",
      "node",
      { ports: 0 },
      [],
    ],
    [
      "./src/ClassicalComponent/react-test-renderer/web.test.tsx",
      "web",
      { ports: 0 },
      [],
    ],

    // ["./src/MyFirstContract.rpc.test.ts", "node", { ports: 1 }, []],
  ],

  webPlugins: [solidityEsBuildConfig],
  nodePlugins: [solidityEsBuildConfig],
  importPlugins: [],
};

export default config;
