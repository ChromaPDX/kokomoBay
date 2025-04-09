import Testeranto from "testeranto/src/Node";
import { PM } from "testeranto/src/PM";
import {
  Ibdd_in,
  Ibdd_out,
  IPartialInterface,
  IT,
  Modify,
  OT,
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
  Store<IStoreState, AnyAction>,
  Reducer<IStoreState, AnyAction>,
  Store<IStoreState, AnyAction>,
  IStoreState,
  (a: IStoreState) => PreloadedState<IStoreState>,
  IStoreState,
  (x: IStoreState, pm: PM) => void
>;

export type BaseImplementation<
  IStoreShape,
  bddout extends Ibdd_out<any, any, any, any, any>
> = ITestImplementation<
  IReduxIn<IStoreShape>,
  bddout,
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

export const ReduxTesteranto = <IStoreShape, I extends IT, O extends OT>(
  testInput: Reducer<IStoreShape, AnyAction>,
  testSpecifications: ITestSpecification<I, O>,
  testImplementations: BaseImplementation<IStoreShape, O>
) => {
  const testInterface: IPartialInterface<IReduxIn<IStoreShape>> = {
    beforeEach: function (subject, initializer) {
      return createStore<IStoreShape, AnyAction, unknown, unknown>(
        subject,
        initializer
      );
    },
    andWhen: async function (store, whenCB) {
      const [action, payload] = whenCB;
      store.dispatch(payload ? action(payload) : action());
      return store;
    },
    butThen: async function (store, actioner) {
      return actioner(store.getState());
    },
  };

  return Testeranto(
    testInput,
    testSpecifications,
    testImplementations,
    testInterface
  );
};
