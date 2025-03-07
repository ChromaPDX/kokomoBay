import { BaseGiven } from "../../testeranto/src/lib/abstractBase";

import MyFirstContract from "./contracts/MyFirstContract.sol";
import { IMyFirstContractTest } from "./MyFirstContract.solidity-react.shape.test";

export const MyFirstContractTestInput = MyFirstContract.contracts.find(
  (c) => c.contractName === "MyFirstContract"
) as { contractName: string; abi: any };

export const commonGivens = (
  Given,
  When,
  Then
): Record<string, BaseGiven<IMyFirstContractTest<any>>> => {
  return {
    test0: Given.Default(
      "my first contract",
      [
        // When.Increment(1), When.Increment(1), When.Increment(1)
      ],
      [Then.Get({ asTestUser: 1, expectation: 0 })]
      // "my first contract"
    ),

    test1: Given.Default(
      [`hello`],
      [
        When.Increment(1),
        When.Increment(1),
        // When.Increment(1),
        // When.Increment(1),
        // When.Increment(1),
        // When.Increment(1),
        // When.Increment(1),
        // When.Increment(1),
        // When.Increment(1),
        // When.Increment(1),
        // When.Increment(1),
        // When.Increment(1),
        // When.Increment(1),
        // When.Increment(1),
        // When.Increment(1),
        // When.Increment(1),
      ],
      [Then.Get({ asTestUser: 1, expectation: 2 })],
      "my first contract"
    ),

    test2: Given.Default(
      [`hello`],
      [
        When.Increment(1),
        When.Increment(1),
        When.Increment(1),
        When.Increment(1),

        // When.Decrement(1),
        // When.Decrement(1),
        // When.Decrement(1),
        // When.Decrement(1),
      ],
      [Then.Get({ asTestUser: 1, expectation: 4 })],
      "my first contract"
    ),

    test3: Given.Default(
      [`hello`],
      [
        When.Increment(1),
        When.Increment(1),
        When.Increment(1),
        When.Increment(1),

        When.Decrement(1),
        When.Decrement(1),
        When.Decrement(1),
        // When.Decrement(1),
      ],
      [Then.Get({ asTestUser: 1, expectation: 1 })],
      "my first contract"
    ),
  };
};
