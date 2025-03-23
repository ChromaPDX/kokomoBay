import Puppeteer from "testeranto/Puppeteer";

import("./testeranto.mjs").then((module) => {
  Puppeteer(module.default);
});
