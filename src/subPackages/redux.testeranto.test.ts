import {
  ActionCreatorWithNonInferrablePayload,
  ActionCreatorWithoutPayload,
  PreloadedState,
  Reducer,
  Store,
} from "@reduxjs/toolkit";
import { createStore, AnyAction } from "redux";

import Testeranto from "testeranto/src/Node";
import { PM } from "testeranto/src/PM";
import { IPartialInterface } from "testeranto/src/Types";
import {
  ITestImplementation,
  ITestSpecification,
  IBaseTest,
} from "testeranto/src/Types";

type t =
  | ActionCreatorWithNonInferrablePayload<string>
  | ActionCreatorWithoutPayload<string>;

type tt = (
  t:
    | ActionCreatorWithNonInferrablePayload<string>
    | ActionCreatorWithoutPayload<string>
) => any;

export type WhenShape = [ActionCreatorWithNonInferrablePayload<string> | ActionCreatorWithoutPayload<string>, any];
export type ThenShape = (state: any, pm: PM) => void;

export const ReduxTesteranto = <
  IStoreShape,
  ITestShape extends IBaseTest<
    unknown,
    Reducer<IStoreShape, any>,
    Store<any, AnyAction>,
    unknown,
    () => IStoreShape,
    unknown,
    (s: any, pm: PM) => void,
    Record<string, any>,
    Record<string, any>,
    Record<string, any>,
    Record<string, any>,
    Record<string, any>
  >
>(
  testInput: Reducer<IStoreShape, AnyAction>,
  testSpecifications: ITestSpecification<ITestShape>,
  testImplementations: ITestImplementation<
    ITestShape,
    {
      givens: {
        [K in keyof ITestShape["givens"]]: () => (
          ...Iw: ITestShape["givens"][K]
        ) => ITestShape;
      };

      whens: {
        [K in keyof ITestShape["whens"]]: (
          ...Iw: ITestShape["whens"][K]
        ) => WhenShape;
      };
    }
  >
) => {
  const testInterface: IPartialInterface<ITestShape> = {
    beforeEach: function (subject, initializer, art, tr, initialValues, pm) {
      return createStore<IStoreShape, any, any, any>(
        subject,
        initializer()(initialValues)
      );
    },
    andWhen: async function (store, whenCB, tr, pm) {
      const a = whenCB;
      store.dispatch(a[0](a[1]));
      return store;
    },
    butThen: async function (store, actioner, tr, pm) {
      return actioner(store.getState(), pm);
    },
  };

  return Testeranto(
    testInput,
    testSpecifications,
    testImplementations,
    testInterface
  );
};
