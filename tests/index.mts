import { IBaseConfig } from "testeranto/src/Types";

export const baseConfig: Partial<IBaseConfig> & {
  src: string;
  clearScreen: boolean;
  debugger: boolean;
  externals: string[];
  minify: boolean;
  ports: string[];
  featureIngestor: (s: string) => Promise<string>;
} = {
  src: "src",

  debugger: false,
  minify: false,
  clearScreen: false,
  externals: ["ganache", "stream"],
  ports: ["3001", "3002", "3003", "3004", "3005", "3006", "3007"],

  featureIngestor: async function (s: string): Promise<string> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (res) => {
      try {
        res((await (await fetch(new URL(s).href)).json()).body);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        res(s);
      }
    });
  },
};

export default baseConfig;

// tests: [
//   // ["./src/Rectangle/Rectangle.test.web.ts", "web", { ports: 0 }, []],
//   ["./src/Rectangle/Rectangle.test.node.ts", "node", { ports: 0 }, []],

//   // ["./src/ReactStateAndHook.test.tsx", "node", { ports: 0 }, []],
//   // ["./src/app.reduxToolkit.test.ts", "node", { ports: 0 }, []],
//   // ["./src/app.redux.test.ts", "node", { ports: 0 }, []],

// // ["./src/LoginPage/react-dom/web.test.tsx", "web", { ports: 0 }, []],
// ["./src/LoginPage/react/node.test.tsx", "node", { ports: 0 }, []],
// ["./src/LoginPage/react/web.test.tsx", "web", { ports: 0 }, []],
// [
//   "./src/LoginPage/react-test-renderer/node.test.tsx",
//   "node",
//   { ports: 0 },
//   [],
// ],
// [
//   "./src/LoginPage/react-test-renderer/web.test.tsx",
//   "web",
//   { ports: 0 },
//   [],
// ],

//   // [
//   //   "./src/ClassicalComponent/react-dom/client.web.test.tsx",
//   //   "web",
//   //   { ports: 0 },
//   //   [],
//   // ],
//   // [
//   //   "./src/ClassicalComponent/react-dom/server.node.test.tsx",
//   //   "node",
//   //   { ports: 0 },
//   //   [],
//   // ],
//   // [
//   //   "./src/ClassicalComponent/react-test-renderer/node.test.tsx",
//   //   "node",
//   //   { ports: 0 },
//   //   [],
//   // ],
//   // [
//   //   "./src/ClassicalComponent/react-test-renderer/web.test.tsx",
//   //   "web",
//   //   { ports: 0 },
//   //   [],
//   // ],

//   // ["./src/MyFirstContract.basic.test.ts", "node", { ports: 0 }, []],
//   // ["./src/MyFirstContract.rpc.test.ts", "node", { ports: 1 }, []],

//   // broken
//   // [
//   //   "./src/MyFirstContract.solidity-react.testeranto.ts",
//   //   "node",
//   //   { ports: 1 },
//   //   [["./src/MyFirstContractUI.tsx", "web", { ports: 0 }, []]],
//   // ],

//   // Don't use these tests.
//   // Testing react components with the react package is not useful
//   // Use react-dom or react-test-renderer instead for testing components
//   // these test might be useful if you are testing react itself, rather than a react component
//   // ["./src/LoginPage/react/web.test.tsx", "web", { ports: 0 }, []],
//   // ["./src/LoginPage/react/node.test.tsx", "node", { ports: 0 }, []],
// ],

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
