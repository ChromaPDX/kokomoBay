import { ReactElement, JSXElementConstructor } from "react";
import renderer, { act } from "react-test-renderer";

import { IPartialInterface } from "testeranto/src/Types";
import { PM } from "testeranto/src/PM/index.js";

import { actions } from "../index.js";

export type ILoginPageSpecsReactTestRenderer = {
  iinput: any;
  isubject: any;
  istore: { testRenderer: renderer.ReactTestRenderer, reactComponent: ReactElement<any, string | JSXElementConstructor<any>> };
  iselection: any;

  when: (testRenderer: renderer.ReactTestRenderer, pm: PM) => any;
  then: (testRenderer: renderer.ReactTestRenderer, pm: PM) => any;
  given: (x) => any;

  suites: {
    Default: [string];
  };
  givens: {
    default: [];
  };
  whens: {
    TheLoginIsSubmitted: [];
    TheEmailIsSetTo: [string];
    ThePasswordIsSetTo: [string];
  };
  thens: {
    TheEmailIs: [string];
    TheEmailIsNot: [string];
    ThePasswordIs: [string];
    ThePasswordIsNot: [string];
    ThereIsAnEmailError: [];
    ThereIsACredentialError: [];
    ThereIsNotACredentialError: [];
    ThereIsNotAnEmailError: [];
    TheSubmitButtonIsActive: [];
    TheSubmitButtonIsNotActive: [];
  };
  checks: {
    default;
  };
};

export const LoginPageReactTestRendererTestInterface: IPartialInterface<ILoginPageSpecsReactTestRenderer> = {

  butThen: async function (s, thenCB, tr, pm) {
    return thenCB(s.testRenderer, pm);
  },
  beforeEach: async function (CComponent, props) {
    let testRenderer;
    let elem;
    await act(async () => {
      elem = CComponent()
      testRenderer = renderer.create(elem);
    });
    await testRenderer.root.props.store.dispatch(actions.reset());
    return { reactComponent: elem, testRenderer };
  },
  andWhen: async (
    { testRenderer, reactComponent },
    whenCB,
    testResource,
    pm

  ) => {
    await act(async () => await whenCB(testRenderer, pm));
    testRenderer.update(reactComponent); // Re-render the component
    return { testRenderer, reactComponent }
  }

}
