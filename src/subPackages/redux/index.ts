import { PM } from "testeranto/src/PM";
import { Ibdd_in, IPartialInterface, OT } from "testeranto/src/Types";
import { ITestImplementation } from "testeranto/src/Types";

import {
  ActionCreatorWithNonInferrablePayload,
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
  Reducer,
  Store,
} from "@reduxjs/toolkit";
import { createStore, AnyAction, StoreEnhancerStoreCreator } from "redux";

export type WhenShape = [
  (
    | ActionCreatorWithNonInferrablePayload<string>
    | ActionCreatorWithoutPayload<string>
  ),
  object
];
// export type ThenShape = (state: any, pm: PM) => void;

export type IINput<IStoreState> = Reducer<IStoreState, AnyAction>;

export type IReduxIn<IStoreState> = Ibdd_in<
  IINput<IStoreState>,
  Reducer<IStoreState, AnyAction>,
  Store<IStoreState, AnyAction>,
  IStoreState,
  StoreEnhancerStoreCreator<unknown, unknown>,
  WhenShape,
  (x: IStoreState, pm: PM) => IStoreState
>;

export type BaseImplementation<
  IStoreShape,
  bddout extends OT
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

export const ReduxTesterantoInterface = <
  IStoreShape
  // iAppOut extends Ibdd_out<any, any, any, any, any>
>() =>
  // testInput: Reducer<IStoreShape, AnyAction>,
  // testSpecifications: ITestSpecification<any>,
  // testImplementations: BaseImplementation<IStoreShape, iAppOut>
  {
    const testInterface: IPartialInterface<IReduxIn<IStoreShape>> = {
      beforeEach: async function (subject, initializer) {
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
      butThen: async function (store, actioner, t, p) {
        return actioner(store.getState(), p);
      },
    };

    return testInterface;
  };
