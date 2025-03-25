import Web3 from "web3";
import Testeranto from "testeranto/src/Node";

import {
  commonGivens,
  MyFirstContractTestInput,
} from "./MyFirstContract.specification.test";
import { IInput } from "./subPackages/solidity/Contract.testeranto.test";
import tInterface from "./MyFirstContract.solidity-react.interface.test";
import testImplementation from "./MyFirstContract.solidity-react.implementation.test";
import { IMyFirstContractTest } from "./MyFirstContract.solidity-react.shape.test";

export default Testeranto<IMyFirstContractTest<IMyFirstContractTest<IInput>>>(
  MyFirstContractTestInput,

  (Suite, Given, When, Then, Check) => {
    return [
      Suite.Default(
        "Testing a very simple smart contract over RPC",
        commonGivens(Given, When, Then),
        [
          // Check.AnEmptyState(
          //   "imperative style",
          //   [`aloha`],
          //   async ({ TheEmailIsSetTo }, { TheEmailIs }) => {
          //     await TheEmailIsSetTo("foo");
          //     await TheEmailIs("foo");
          //     const reduxPayload = await TheEmailIsSetTo("foobar");
          //     await TheEmailIs("foobar");
          //     // assert.deepEqual(reduxPayload, {
          //     //   type: "login app/setEmail",
          //     //   payload: "foobar",
          //     // });
          //   }
          // ),
        ]
      ),
    ];
  },

  testImplementation,
  tInterface
);
