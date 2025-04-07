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

    // ["./src/LoginPage/react-dom/web.test.tsx", "web", { ports: 0 }, []],
    ["./src/LoginPage/react/node.test.tsx", "node", { ports: 0 }, []],
    ["./src/LoginPage/react/web.test.tsx", "web", { ports: 0 }, []],
    [
      "./src/LoginPage/react-test-renderer/node.test.tsx",
      "node",
      { ports: 0 },
      [],
    ],
    [
      "./src/LoginPage/react-test-renderer/web.test.tsx",
      "web",
      { ports: 0 },
      [],
    ],

    [
      "./src/MyFirstContract/MyFirstContract.basic.test.ts",
      "node",
      { ports: 0 },
      [],
    ],

    // Don't use these tests.
    // Testing react components with the react package is not useful
    // Use react-dom or react-test-renderer instead for testing components
    // these test might be useful if you are testing react itself, rather than a react component
    // ["./src/LoginPage/react/web.test.tsx", "web", { ports: 0 }, []],
    // ["./src/LoginPage/react/node.test.tsx", "node", { ports: 0 }, []],
  ],
};

export default config;
