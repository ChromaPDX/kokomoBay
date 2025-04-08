import { ITestSpecification } from "testeranto/src/Types";
import { I } from "testeranto/src/SubPackages/react-test-renderer/jsx/index"

import { O } from "../test";

export const ReactTestRenderSpecification: ITestSpecification<I, O> = (
  Suite,
  Given,
  When,
  Then
) => {
  return [
    Suite.Default(
      "Testing the ReactStateAndHook element",
      {
        test0: Given.Default(
          [`https://api.github.com/repos/adamwong246/testeranto/issues/7`],
          [],
          [Then.TheCounterIs(0)]
        ),
        test1: Given.Default(
          [`https://api.github.com/repos/adamwong246/testeranto/issues/7`],
          [When.IClick()],
          [Then.TheCounterIs(1)]
        ),
        test2: Given.Default(
          [`hello`],
          [When.IClick(), When.IClick(), When.IClick()],
          [Then.TheCounterIs(3)]
        ),
        test3: Given.Default(
          [`hello`],
          [When.IClick(), When.IClick()],
          [Then.TheCounterIs(2)]
        ),
      },
      []
    ),
  ];
};
