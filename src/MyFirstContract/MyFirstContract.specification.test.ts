import { Ibdd_in, Ibdd_out } from "testeranto/src/Types";

import MyFirstContract from "./contracts/MyFirstContract.sol";
// import { IMyFirstContractTest } from "./MyFirstContract.solidity-react.shape.test";
import { BaseGiven } from "testeranto/src/lib/abstractBase";

export const MyFirstContractTestInput = MyFirstContract.contracts.find(
  (c) => c.contractName === "MyFirstContract"
) as { contractName: string; abi: any };

export type O = Ibdd_out<
  {
    Default: string;
  },
  {
    Default: [string];
  },
  {
    Increment: [number];
    Decrement: [number];
  },
  {
    Get: [{ asTestUser: number; expectation: number }];
  },
  {
    AnEmptyState: [];
  }
>;

export const commonGivens = <
  I extends Ibdd_in<
    unknown,
    unknown,
    unknown,
    unknown,
    unknown,
    unknown,
    unknown
  >
>(
  Given,
  When,
  Then
): Record<string, BaseGiven<I>> => {
  return {
    test0: Given.Default(
      "my first contract",
      [],
      [Then.Get({ asTestUser: 1, expectation: 0 })]
    ),

    test1: Given.Default(
      [`hello`],
      [When.Increment(1), When.Increment(1)],
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
      ],
      [Then.Get({ asTestUser: 1, expectation: 1 })],
      "my first contract"
    ),
  };
};
