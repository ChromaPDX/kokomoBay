import { ITestImplementation } from "testeranto/src/Types";

import { assert } from "chai";

import Testeranto, {
  IInput,
} from "./subPackages/solidity/Contract.testeranto.test";
import MyFirstContract from "./contracts/MyFirstContract.sol";

import { IMyFirstContractTest } from "./MyFirstContract.solidity-react.shape.test";
import {
  commonGivens,
  MyFirstContractTestInput,
} from "./MyFirstContract.specification.test";

const testImplementation: ITestImplementation<
  IMyFirstContractTest<IInput>,
  any
> = {
  suites: {
    Default: "Testing a very simple smart contract",
  },
  givens: {
    Default: (x) => x,
  },
  whens: {
    Increment:
      (asTestUser) =>
      ({ contract, accounts }) => {
        return contract.methods
          .inc()
          .send({ from: accounts[asTestUser] })
          .on("receipt", function (x) {
            return x;
          });
      },
    Decrement:
      (asTestUser) =>
      ({ contract, accounts }) => {
        return contract.methods
          .dec()
          .send({ from: accounts[asTestUser] })
          .on("receipt", function (x) {
            return x;
          });
      },
  },
  thens: {
    Get:
      ({ asTestUser, expectation }) =>
      async ({ contract, accounts }) =>
        assert.equal(
          expectation,
          parseInt(await contract.methods.get().call())
        ),
  },
  checks: {
    AnEmptyState: () => MyFirstContract,
  },
};

export default Testeranto<IMyFirstContractTest<IInput>>(
  testImplementation,

  (Suite, Given, When, Then, Check) => {
    return [
      Suite.Default(
        "Testing a very simple smart contract ephemerally",
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
  [
    MyFirstContractTestInput,
    async (web3) => {
      // const accounts = await web3.eth.getAccounts();
      return [];
    },
  ]
);
