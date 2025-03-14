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
    TheEmailIs: (email) => (reactElem) => {
      assert.equal(reactElem.props.store.getState().email, email);
    },
    TheEmailIsNot: (email) => (reactElem) => {
      assert.notEqual(reactElem.props.store.getState().email, email);
    },
    ThePasswordIs: (password) => (reactElem) => {
      assert.equal(reactElem.props.store.getState().password, password);
    },
    ThePasswordIsNot: (password) => (reactElem) => {
      assert.notEqual(reactElem.props.store.getState().password, password);
    },
    ThereIsAnEmailError: () => (reactElem) => {
      assert.notEqual(reactElem.props.store.getState().error, "no_error");
    },
    ThereIsNotAnEmailError: () => (reactElem) => {
      assert.equal(reactElem.props.store.getState().error, "no_error");
    },
    ThereIsACredentialError: () => (reactElem: any, utils: PM) => {
      assert.equal(reactElem.props.store.getState().error, 'credentialFail');
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
