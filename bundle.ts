import * as esbuild from "esbuild";

import { solidityEsBuildConfig } from "./src/subPackages/solidity/";

await esbuild.build({
  entryPoints: [
    "src/MyFirstContract/MyFirstContractUi.tsx",
    "src/MyFirstContract/MyFirstContractUi.html",
    "src/ClassicalComponent/react-dom/index.tsx",
    "src/ClassicalComponent/react-dom/index.html",
  ],
  bundle: true,
  format: "iife",
  platform: "browser",
  outdir: "dist/web",
  plugins: [solidityEsBuildConfig()],
  loader: { ".html": "copy" },
});

await esbuild.build({
  outExtension: { ".js": ".mjs" },
  entryPoints: ["src/MyFirstContract/MyFirstContractServer.ts"],
  bundle: true,
  format: "esm",
  platform: "node",
  outdir: "dist/node",
  plugins: [solidityEsBuildConfig()],
});
