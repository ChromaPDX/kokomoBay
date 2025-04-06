import {
  commonGivens,
  MyFirstContractTestInput,
  O,
} from "./MyFirstContract.specification.test";
import Testeranto, {
  IContractIn,
} from "../subPackages/solidity/Contract.testeranto.test";

import { MyFirstContractBaseImplementation } from "./MyFirstContract.basic.implementation.test";

export default Testeranto(
  MyFirstContractBaseImplementation,
  (Suite, Given, When, Then, Check) => {
    return [
      Suite.Default(
        "Testing a very simple smart contract ephemerally",
        commonGivens<IContractIn>(Given, When, Then),
        [
          Check.AnEmptyState(
            "imperative style",
            [`You can write your tests imperatively`],
            async (s, pm) => {
              await When.Increment(1).whenCB(s);
              await When.Increment(1).whenCB(s);
              await When.Increment(1).whenCB(s);
              await Then.Get({ asTestUser: 1, expectation: 3 }).thenCB(s);
              await When.Increment(1).whenCB(s);
              await Then.Get({ asTestUser: 1, expectation: 4 }).thenCB(s);
            }
          ),
        ]
      ),
    ];
  },
  [
    MyFirstContractTestInput,
    async () => {
      return [];
    },
  ]
);
