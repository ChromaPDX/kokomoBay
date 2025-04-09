import Testeranto from "testeranto/src/Node";
import { ITestSpecification, OT } from "testeranto/src/Types";

import { AnyAction, Reducer } from "redux";

import { BaseImplementation, IReduxIn, ReduxTesterantoInterface } from ".";

export default <IStoreShape, O extends OT>(
  testInput: Reducer<IStoreShape, AnyAction>,
  testSpecifications: ITestSpecification<IReduxIn<IStoreShape>, O>,
  testImplementations: BaseImplementation<IStoreShape, O>
) =>
  Testeranto(
    testInput,
    testSpecifications,
    testImplementations,
    ReduxTesterantoInterface()
  );
