import { IBaseConfig } from "testeranto/src/lib/index.js";

import baseConfig from "./testeranto.mjs";

const config: IBaseConfig = {
  debugger: true,
  clearScreen: false,
  devMode: true,

  ...baseConfig,

  tests: [
    ["./src/Rectangle/Rectangle.test.node.ts", "node", { ports: 0 }, []],
    // ["./src/Rectangle/Rectangle.test.web.ts", "web", { ports: 0 }, []],

    ["./src/ReactStateAndHook.test.tsx", "node", { ports: 0 }, []],
    ["./src/app.reduxToolkit.test.ts", "node", { ports: 0 }, []],
    ["./src/app.redux.test.ts", "node", { ports: 0 }, []],

    [
      "./src/LoginPage/react-test-renderer/node.test.tsx",
      "node",
      { ports: 0 },
      [],
    ],
    ["./src/MyFirstContract.basic.test.ts", "node", { ports: 0 }, []],
  ],
};

export default config;
