import { IBaseConfig } from "testeranto/src/Types";

import { baseConfig } from "./index.mjs";
import { solidityEsBuildConfig } from "../src/subPackages/solidity";

const config: IBaseConfig = {
  ...baseConfig,

  tests: [
    // [
    //   "./src/ReactStateAndHook/react-test-renderer.test/pure.tsx",
    //   "pure",
    //   { ports: 0 },
    //   [],
    // ],
    // [
    //   "./src/ReactStateAndHook/react-test-renderer.test/node.tsx",
    //   "node",
    //   { ports: 0 },
    //   [],
    // ],
    // [
    //   "./src/ReactStateAndHook/react-test-renderer.test/web.tsx",
    //   "web",
    //   { ports: 0 },
    //   [],
    // ],
    // ["./src/app.reduxToolkit.test.ts", "pure", { ports: 0 }, []],
    ["./src/app/redux.test/node.ts", "node", { ports: 0 }, []],
    ["./src/app/redux.test/pure.ts", "pure", { ports: 0 }, []],
    ["./src/app/redux.test/web.ts", "web", { ports: 0 }, []],

    // // broken
    // // ["./src/LoginPage/react-dom/web.test.tsx", "web", { ports: 0 }, []],
    // ["./src/LoginPage/react/pure.test.tsx", "pure", { ports: 0 }, []],
    // ["./src/LoginPage/react/web.test.tsx", "web", { ports: 0 }, []],
    // [
    //   "./src/LoginPage/react-test-renderer/pure.test.tsx",
    //   "pure",
    //   { ports: 0 },
    //   [],
    // ],
    // [
    //   "./src/LoginPage/react-test-renderer/web.test.tsx",
    //   "web",
    //   { ports: 0 },
    //   [],
    // ],

    // [
    //   "./src/MyFirstContract/MyFirstContract.basic.test.ts",
    //   "pure",
    //   { ports: 0 },
    //   [],
    // ],

    // Don't use these tests.
    // Testing react components with the react package is not useful
    // Use react-dom or react-test-renderer instead for testing components
    // these test might be useful if you are testing react itself, rather than a react component
    // ["./src/LoginPage/react/web.test.tsx", "web", { ports: 0 }, []],
    // ["./src/LoginPage/react/node.test.tsx", "node", { ports: 0 }, []],
  ],

  webPlugins: [solidityEsBuildConfig],
  nodePlugins: [],
  importPlugins: [],
};

export default config;
