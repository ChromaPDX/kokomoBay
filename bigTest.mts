import { IBaseConfig } from "testeranto/src/lib/index.js";

import { baseConfig } from "./testeranto.mjs";

const config: IBaseConfig = {
  debugger: true,
  clearScreen: false,
  devMode: true,

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

    ["./src/MyFirstContract.rpc.test.ts", "node", { ports: 1 }, []],
  ],
};

export default config;
