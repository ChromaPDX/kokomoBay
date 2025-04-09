import { Ibdd_out, IT, ITestSpecification } from "testeranto/src/Types";

import { IProps, IState } from "./index";

export type O = Ibdd_out<
  {
    Default: [string];
  },
  {
    AnEmptyState: [];
  },
  {
    IClickTheButton: [];
    IClickTheHeader: [];
  },
  {
    ThePropsIs: [IProps];
    TheStatusIs: [IState];
  },
  {
    AnEmptyState;
  },
  {
    SomeFreestyle;
  }
>;

export const ClassicalComponentSpec: ITestSpecification<IT, O> = (
  Suite,
  Given,
  When,
  Then
) => {
  return [
    Suite.Default(
      "a classical react component",
      {
        test0: Given.AnEmptyState(
          [`I click 4 times and the count is 3`],
          [
            When.IClickTheButton(),
            When.IClickTheButton(),
            When.IClickTheButton(),
            When.IClickTheHeader(),
            // When.IClickTheButton(),
          ],
          [
            Then.ThePropsIs({ foo: "bar", children: [] }),
            Then.TheStatusIs({ count: 3 }),
          ]
        ),
        test1: Given.AnEmptyState(
          [`Count is 1 by default`],
          [When.IClickTheButton()],
          [
            Then.ThePropsIs({ foo: "bar", children: [] }),
            Then.TheStatusIs({ count: 1 }),
          ]
        ),
        test2: Given.AnEmptyState(
          [`0`],
          [
            When.IClickTheButton(),
            When.IClickTheButton(),
            When.IClickTheButton(),
            When.IClickTheButton(),
            When.IClickTheButton(),
            When.IClickTheButton(),
            When.IClickTheButton(),
            When.IClickTheButton(),
            When.IClickTheButton(),
          ],
          [Then.TheStatusIs({ count: 9 })]
        ),
        test3: Given.AnEmptyState(
          [`0`],
          [When.IClickTheButton(), When.IClickTheButton()],
          [Then.TheStatusIs({ count: 2 })]
        ),
      },
      [],
      [
        ["A feature as a string"],
        (x) => {
          return;
        },
      ]
    ),
  ];
};
