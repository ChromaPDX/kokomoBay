// import { ITestSpecification } from "testeranto/src/core";
// import { IHttpTesterantoTestImplementation } from "../myTests/http.testeranto.test";

import {
  Ibdd_in,
  Ibdd_out,
  ITestImplementation,
  ITestSpecification,
} from "testeranto/src/Types";

const myFeature = `hello`;

// export type IServerTestSpecifications = {
//   suites: {
//     Default: string;
//   };
//   givens: {
//     AnEmptyState: [];
//   };
//   whens: {
//     PostToStatus: [string];
//     PostToAdd: [number];
//   };
//   thens: {
//     TheStatusIs: [string];
//     TheNumberIs: [number];
//   };
//   checks: {
//     AnEmptyState;
//   };
// };

type I = Ibdd_in<any, any, any, any, any, any, any>;
type O = Ibdd_out<
  {
    Default: string;
  },
  {
    AnEmptyState: [];
  },
  {
    PostToStatus: [string];
    PostToAdd: [number];
  },
  {
    TheStatusIs: [string];
    TheNumberIs: [number];
  },
  {
    AnEmptyState;
  }
>;

export const ServerTestImplementation: ITestImplementation<I, O> = {
  suites: {
    Default: "some default Suite",
  },
  givens: {
    AnEmptyState: () => {
      return {};
    },
  },
  whens: {
    PostToStatus: (status: string): [any, any] => ["put_status", status],
    PostToAdd: (n: number): [any, any] => ["put_number", n.toString()],
  },
  thens: {
    TheStatusIs: (status: string) => (): [any, any] => ["get_status", status],
    TheNumberIs: (number: number) => (): [any, any] => ["get_number", number],
  },
  checks: {
    /* @ts-ignore:next-line */
    AnEmptyState: () => {
      return {};
    },
  },
};

export const ServerTestSpecification: ITestSpecification<I, O> = (
  Suite,
  Given,
  When,
  Then,
  Check
) => {
  return [
    Suite.Default(
      "Testing the Node server with fetch!",
      {
        test0: Given.AnEmptyState(
          [myFeature],
          [],
          [Then.TheStatusIs("some great status")]
        ),
        test1: Given.AnEmptyState(
          [myFeature],
          [
            When.PostToStatus("1"),
            When.PostToStatus("2"),
            When.PostToStatus("3"),
            When.PostToStatus("4"),
            When.PostToStatus("5"),
            When.PostToStatus("6"),
            When.PostToStatus("hello"),
          ],
          [Then.TheStatusIs("hello")]
        ),
        test2: Given.AnEmptyState(
          [myFeature],
          [When.PostToStatus("hello"), When.PostToStatus("aloha")],
          [Then.TheStatusIs("aloha")]
        ),
        "test2.5": Given.AnEmptyState(
          [myFeature],
          [When.PostToStatus("hola")],
          [Then.TheStatusIs("hola")]
        ),
        test3: Given.AnEmptyState([myFeature], [], [Then.TheNumberIs(0)]),
        test5: Given.AnEmptyState(
          [myFeature],
          [When.PostToAdd(1), When.PostToAdd(2)],
          [Then.TheNumberIs(3)]
        ),
        test6: Given.AnEmptyState(
          [myFeature],
          [
            When.PostToStatus("aloha"),
            When.PostToAdd(4),
            When.PostToStatus("hello"),
            When.PostToAdd(3),
          ],
          [Then.TheStatusIs("hello"), Then.TheNumberIs(7)]
        ),
      },
      []
    ),
  ];
};
