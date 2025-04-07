import { IConfigV2 } from "testeranto/src/lib/index.js";

import smallTest from "./tests/smallTest.mjs";
import bigTest from "./tests/bigTest.mjs";

const config: IConfigV2 = {
  projects: {
    smallTest: smallTest,
    bigTest: bigTest,
  },
};
export default config;
