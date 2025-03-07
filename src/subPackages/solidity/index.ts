import fs from "fs/promises";
import path from "path";
import { Compile } from "@truffle/compile-solidity";
import TruffleConfig from "@truffle/config";

import type { WorkflowCompileResult } from "@truffle/compile-common";
import { Plugin } from "esbuild";
import { IPlugin } from "testeranto/src/lib/types";

// parent: node_modules/.../ERC721/ERC721.sol
// returns absolute path of a relative one using the parent path
const buildFullPath = (parent, path) => {
  let curDir = parent.substr(0, parent.lastIndexOf("/")); //i.e. ./node/.../ERC721

  if (path.startsWith("@")) {
    return process.cwd() + "/node_modules/" + path;
  }

  if (path.startsWith("./")) {
    return curDir + "/" + path.substr(2);
  }

  while (path.startsWith("../")) {
    curDir = curDir.substr(0, curDir.lastIndexOf("/"));
    path = path.substr(3);
  }

  return curDir + "/" + path;
};

const solidifier = async (path, recursivePayload = {}) => {
  const text = (await fs.readFile(path)).toString();

  const importLines = text
    .split("\n")
    .filter((line, index, arr) => {
      return (
        index !== arr.length - 1 &&
        line !== "" &&
        line.trim().startsWith("import") === true
      );
    })
    .map((line) => {
      const relativePathsplit = line.split(" ");
      return buildFullPath(
        path,
        relativePathsplit[relativePathsplit.length - 1].trim().slice(1, -2)
      );
    });

  for (const importLine of importLines) {
    recursivePayload = {
      ...recursivePayload,
      ...(await solidifier(importLine)),
    };
  }

  recursivePayload[path] = text;

  return recursivePayload;
};

export const solCompile = async (
  entrySolidityFile
): Promise<{ remmapedSources: any; result: WorkflowCompileResult }> => {
  const sources = await solidifier(`src/contracts/${entrySolidityFile}.sol`);

  const remmapedSources = {};
  for (const filepath of Object.keys(sources)) {
    const x = filepath.split("src/contracts/");
    if (x.length === 1) {
      remmapedSources[filepath.split("node_modules/")[1]] = sources[filepath];
    } else {
      remmapedSources[filepath] = sources[filepath];
    }
  }

  /* @ts-ignore:next-line */
  const tConfig = new TruffleConfig();

  /* @ts-ignore:next-line */
  const options = TruffleConfig.load(
    path.resolve(process.cwd(), `truffle-config.cjs`)
  );

  return {
    remmapedSources: Object.keys(remmapedSources),
    result: await Compile.sources({
      sources: remmapedSources,
      options,
    }),
  };
};

export const solidityEsBuildConfig: IPlugin = (register): Plugin => {
  return {
    name: "solidity",
    setup(build) {
      build.onResolve({ filter: /^.*\.sol$/ }, (args) => {
        // console.log(args);
        const path = args.path.split("/").slice(-1)[0].split(".")[0];
        return {
          path,
          namespace: "solidity",
          pluginData: {
            importer: `solidity:${path}`,
          },
        };
      });
      build.onLoad({ filter: /.*/, namespace: "solidity" }, async (argz) => {
        const { result, remmapedSources } = await solCompile(argz.path);
        // console.log(argz, remmapedSources);
        register(argz.pluginData.importer, remmapedSources);

        return {
          contents: JSON.stringify(result),
          loader: "json",
          watchDirs: [process.cwd()],
          // pluginData: "qwe",
          // remmapedSources,
        };
      });
    },
  };
};
