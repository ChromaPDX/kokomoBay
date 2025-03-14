import { ILoginPageSpecs } from "../test.js";
import { actions } from "../index.js";
import { assert } from "chai";
// import type { IStore, ISelection } from "testeranto/dist/types/SubPackages/react/jsx/index";
import { ITestImplementation } from "testeranto/src/Types";
import { PM } from "testeranto/src/PM/index.js";

// export const LoginPageReactTestInterface = (testInput) => {
//   return {
//     beforeEach: async (
//       x,
//       ndx,
//       testRsource,
//       artificer
//     ): Promise<IStore> => {
//       return new Promise((resolve, rej) => {
//         const t = testInput();
//         t.props.store.dispatch(actions.reset())
//         resolve(t)
//       });
//     },
//     andWhen: function (s: IStore, whenCB): Promise<ISelection> {
//       return whenCB(s);
//     },
//   }
// }

type IImpl = ITestImplementation<
  ILoginPageSpecs, object
>

const implementations: IImpl = {
  suites: {
    Default: "a default suite",
  },
  givens: {
    default: () => (i) => {
      return i;
    },
  },

  whens: {
    TheLoginIsSubmitted: () => async (reactElem: any, utils: PM) => {
      reactElem.props.store.dispatch(actions.signIn());
      return reactElem;
    },
    TheEmailIsSetTo: (email: string) => async (reactElem: any, utils: PM) => {
      reactElem.props.store.dispatch(actions.setEmail(email));
      return reactElem;
    },
    ThePasswordIsSetTo: (password: string) => async (reactElem: any, utils: PM) => {
      reactElem.props.store.dispatch(actions.setPassword(password));
      return reactElem;
    }
  },
  thens: {
    TheEmailIs: (email: string) => async (reactElem: any, utils: PM) => {
      assert.equal(reactElem.props.store.getState().email, email);
      return reactElem;
    },
    TheEmailIsNot: (email: string) => async (reactElem: any, utils: PM) => {
      assert.notEqual(reactElem.props.store.getState().email, email);
      return reactElem;
    },
    ThePasswordIs: (password: string) => async (reactElem: any, utils: PM) => {
      assert.equal(reactElem.props.store.getState().password, password);
      return reactElem;
    },
    ThePasswordIsNot: (password: string) => async (reactElem: any, utils: PM) => {
      assert.notEqual(reactElem.props.store.getState().password, password);
      return reactElem;
    },
    ThereIsAnEmailError: () => async (reactElem: any, utils: PM) => {
      assert.notEqual(reactElem.props.store.getState().error, "no_error");
      return reactElem;
    },
    ThereIsNotAnEmailError: () => async (reactElem: any, utils: PM) => {
      assert.equal(reactElem.props.store.getState().error, "no_error");
      return reactElem;
    },
    ThereIsACredentialError: () => async (reactElem: any, utils: PM) => {
      const state = reactElem.props.store.getState();
      assert.equal(state.error, 'credentialFail');
      assert.isTrue(state.disableSubmit);
      return reactElem;
    },
    TheSubmitButtonIsActive: () => (reactElem: any, utils: PM) => {
      assert.isFalse(reactElem.props.store.getState().disableSubmit);
      return reactElem;
    },
    TheSubmitButtonIsNotActive: () => (reactElem: any, utils: PM) => {
      assert.isTrue(reactElem.props.store.getState().disableSubmit);
      return reactElem;
    }
  },

  checks: {
    default: () => (i) => {
      return i;
    },
  },
}

export default implementations;
