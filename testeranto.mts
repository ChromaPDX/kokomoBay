import { IBaseConfig } from "testeranto/src/lib/index.js";
import { solidityEsBuildConfig } from "./src/subPackages/solidity/index.js";

export const baseConfig: Partial<IBaseConfig> = {
  src: "src",
  minify: false,
  externals: ["ganache", "stream"],
  ports: ["3001", "3002", "3003", "3004", "3005", "3006", "3007"],

  webPlugins: [solidityEsBuildConfig],
  nodePlugins: [solidityEsBuildConfig],

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

export default baseConfig;

// {
//       name: "ganache-shim",
//       setup(build) {
//         build.onResolve({ filter: /.*/ }, (args) => {
//           // return ({
//           //   path: "MyFirstContract",
//           //   namespace: 'ganache-shim',
//           // })
//         });
//         // build.onLoad({ filter: /.*/, namespace: 'ganache-shim' }, async (argz) => {
//         //   return ({
//         //     contents: JSON.stringify((await solCompile(argz.path))),
//         //     loader: 'json',
//         //     watchDirs: [process.cwd() + "/contracts"]
//         //   })
//         // })
//       },
//     },

// {
//   name: "solidity",
//   setup(build) {
//     build.onResolve({ filter: /^.*\.sol$/ }, (args) => {
//       return {
//         path: "MyFirstContract",
//         namespace: "solidity",
//       };
//     });
//     build.onLoad({ filter: /.*/, namespace: "solidity" }, async (argz) => {
//       return {
//         contents: JSON.stringify(await solCompile(argz.path)),
//         loader: "json",
//         watchDirs: [process.cwd() + "/contracts"],
//       };
//     });
//   },
// },
