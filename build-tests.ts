import { ITProject } from "testeranto/src/Project";

import("./testeranto.mjs").then((module) => {
  new ITProject(module.default);
});
