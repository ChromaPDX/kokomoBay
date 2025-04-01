import Testeranto from "testeranto/src/Node";
import { PM } from "testeranto/src/PM";
import {
  Ibdd_in,
  Ibdd_out,
  IPartialInterface,
  Modify,
} from "testeranto/src/Types";
import { ITestImplementation, ITestSpecification } from "testeranto/src/Types";

import {
  ActionCreatorWithNonInferrablePayload,
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
  Reducer,
  Store,
} from "@reduxjs/toolkit";
import { createStore, AnyAction, PreloadedState } from "redux";

export type WhenShape = [
  (
    | ActionCreatorWithNonInferrablePayload<string>
    | ActionCreatorWithoutPayload<string>
  ),
  any
];
export type ThenShape = (state: any, pm: PM) => void;

type IReduxIn<IStoreState> = Ibdd_in<
  Store,
  Reducer<IStoreState, any>,
  Store<any, AnyAction>,
  IStoreState,
  (a: any) => PreloadedState<IStoreState>,
  IStoreState,
  (x: IStoreState, pm: PM) => any
>;

export type BaseImplementation<
  IStoreShape,
  bddout extends Ibdd_out<any, any, any, any, any>
> = Modify<
  ITestImplementation<IReduxIn<IStoreShape>, bddout>,
  {
    givens: {
      [K in keyof bddout["givens"]]: IStoreShape;
    };

    whens: {
      [K in keyof bddout["whens"]]: (
        ...x
      ) =>
        | [string, string?]
        | [ActionCreatorWithoutPayload]
        | [ActionCreatorWithPayload<any>, string];
    };

    checks: {
      [K in keyof bddout["checks"]]: IStoreShape;
    };

    thens: {
      [K in keyof bddout["thens"]]: (
        ...It: bddout["thens"][K]
      ) => (ssel: IReduxIn<IStoreShape>["iselection"], utils: PM) => void;
    };
  }
>;

export const ReduxTesteranto = <
  IStoreShape,
  iAppOut extends Ibdd_out<any, any, any, any, any>
>(
  testInput: Reducer<IStoreShape, AnyAction>,
  testSpecifications: ITestSpecification<any>,
  testImplementations: BaseImplementation<IStoreShape, iAppOut>
) => {
  const testInterface: IPartialInterface<IReduxIn<IStoreShape>> = {
    beforeEach: function (subject, initializer, art, tr, initialValues, pm) {
      return createStore<IStoreShape, any, any, any>(subject, initializer);
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
