import { ITestImplementation } from "testeranto/src/Types";

import { assert } from "chai";

import { IContractIn } from "../subPackages/solidity/Contract.testeranto.test";
import MyFirstContract from "./contracts/MyFirstContract.sol";

import { O } from "./MyFirstContract.specification.test.js";

export const MyFirstContractBaseImplementation: ITestImplementation<
  IContractIn,
  O
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
      ({ expectation }) =>
      async ({ contract }) =>
        assert.equal(
          expectation,
          parseInt(await contract.methods.get().call())
        ),
  },
  checks: {
    AnEmptyState: () => MyFirstContract,
  },
};
