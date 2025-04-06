import * as esbuild from "esbuild";
import puppeteer, { Browser } from "puppeteer-core";

import { solidityEsBuildConfig } from "./src/subPackages/solidity/";

let nodectx = await esbuild.context({
  outExtension: { ".js": ".mjs" },
  entryPoints: ["src/MyfirstContractServer.ts"],
  bundle: true,
  format: "esm",
  platform: "node",
  outdir: "dist/node",
  plugins: [solidityEsBuildConfig()],
  packages: "external",
  // supported: {
  //   "dynamic-import": true,
  // },
  // banner: {
  //   js: `import { createRequire } from 'module';const require = createRequire(import.meta.url);`,
  // },
});
await nodectx.watch();

let webctx = await esbuild.context({
  entryPoints: ["src/MyFirstContractUi.tsx", "src/MyFirstContractUi.html"],
  bundle: true,
  format: "iife",
  platform: "browser",
  outdir: "dist/web",
  plugins: [solidityEsBuildConfig()],
  loader: { ".html": "copy" },
});

await webctx.watch();
let { host, port } = await webctx.serve({
  servedir: "dist/web",
});

console.log(`Server started at http://${host}:${port}`);

function urlEncodeObject(obj) {
  const params = new URLSearchParams();
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      params.append(key, encodeURIComponent(obj[key]));
    }
  }
  return params.toString();
}

const ganchePort = 8002;
import("./dist/node/MyfirstContractServer.mjs").then(async (module) => {
  const secretKey = await module.default(ganchePort);
  console.log("secretKey", secretKey);

  const browser: Browser = (await puppeteer.launch({
    // slowMo: 1,
    // timeout: 1,
    waitForInitialPage: false,
    executablePath:
      // process.env.CHROMIUM_PATH || "/opt/homebrew/bin/chromium",
      "/opt/homebrew/bin/chromium",
    headless: false,
    // dumpio: true,
    // timeout: 0,
    // devtools: true,
    args: [
      "--auto-open-devtools-for-tabs",
      `--remote-debugging-port=3234`,
      // "--disable-features=IsolateOrigins,site-per-process",
      "--disable-site-isolation-trials",
      "--allow-insecure-localhost",
      "--allow-file-access-from-files",
      "--allow-running-insecure-content",
      "--disable-dev-shm-usage",
      "--disable-extensions",
      "--disable-gpu",
      "--disable-setuid-sandbox",
      "--disable-site-isolation-trials",
      "--disable-web-security",
      "--no-first-run",
      "--no-sandbox",
      "--no-startup-window",
      // "--no-zygote",
      "--reduce-security-for-testing",
      "--remote-allow-origins=*",
      "--unsafely-treat-insecure-origin-as-secure=*",
      // "--disable-features=IsolateOrigins",
      // "--remote-allow-origins=ws://localhost:3234",
      // "--single-process",
      // "--unsafely-treat-insecure-origin-as-secure",
      // "--unsafely-treat-insecure-origin-as-secure=ws://192.168.0.101:3234",
      // "--disk-cache-dir=/dev/null",
      // "--disk-cache-size=1",
      // "--start-maximized",
    ],
  })) as any;
  const page = await browser.newPage();
  const url = `http://${host}:${port}/MyFirstContractUI.html?${urlEncodeObject({
    secretKey,
    port: ganchePort,
    address: "localhost",
  })}`;
  console.log("url", url);
  page.goto(url);
});
