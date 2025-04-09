import { IBaseConfig } from "testeranto/src/Types";

import baseConfig from "./index.mts";

const config: IBaseConfig = {
  ...baseConfig,

  tests: [
    ["./src/Rectangle/Rectangle.test.node.ts", "node", { ports: 0 }, []],
    ["./src/Rectangle/Rectangle.test.web.ts", "web", { ports: 0 }, []],
    ["./src/Rectangle/Rectangle.test.pure.ts", "pure", { ports: 0 }, []],
  ],

  webPlugins: [],
  nodePlugins: [],
  importPlugins: [],
};

export default config;
