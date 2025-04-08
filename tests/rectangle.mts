import { IBaseConfig } from "testeranto/lib/index.js";

export const baseConfig: Partial<IBaseConfig> = {
  src: "src",
  minify: false,
  externals: ["stream"],
  ports: [],

  webPlugins: [],
  nodePlugins: [],

  featureIngestor: async function (s: string): Promise<string> {
    return new Promise(async (res, rej) => {
      try {
        res((await (await fetch(new URL(s).href)).json()).body);
      } catch (err) {
        res(s);
      }
    });
  },
};

const config: IBaseConfig = {
  ...baseConfig,

  tests: [
    ["./src/Rectangle/Rectangle.test.node.ts", "node", { ports: 0 }, []],
    ["./src/Rectangle/Rectangle.test.web.ts", "web", { ports: 0 }, []],
    ["./src/Rectangle/Rectangle.test.pure.ts", "pure", { ports: 0 }, []],
  ],
};

export default config;
