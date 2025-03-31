import {
  require_client
} from "../../chunk-UAOWP2LQ.mjs";
import "../../chunk-5MER2HMA.mjs";
import {
  ClassicalComponent
} from "../../chunk-W7T5BCPH.mjs";
import {
  require_react
} from "../../chunk-UREIH5IJ.mjs";
import {
  __toESM
} from "../../chunk-TTFRSOOU.mjs";

// src/ClassicalComponent/test.ts
var import_client = __toESM(require_client(), 1);
var import_react = __toESM(require_react(), 1);
document.addEventListener("DOMContentLoaded", function() {
  const elem = document.getElementById("root");
  if (elem) {
    import_client.default.createRoot(elem).render(import_react.default.createElement(ClassicalComponent, {}));
  }
});
