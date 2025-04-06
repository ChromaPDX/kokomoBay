import * as esbuild from "esbuild";

import { solidityEsBuildConfig } from "./src/subPackages/solidity/";

await esbuild.build({
  entryPoints: ["src/MyFirstContractUi.tsx", "src/MyFirstContractUi.html"],
  bundle: true,
  format: "iife",
  platform: "browser",
  outdir: "dist/web",
  plugins: [solidityEsBuildConfig()],
});

await esbuild.build({
  outExtension: { ".js": ".mjs" },
  entryPoints: ["src/MyfirstContractServer.ts"],
  bundle: true,
  format: "esm",
  platform: "node",
  outdir: "dist/node",
  plugins: [solidityEsBuildConfig()],
});
