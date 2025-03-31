import renderer, { act, ReactTestRenderer } from "react-test-renderer";

import { ITTestResourceConfiguration } from "testeranto/src/lib/index.js";
import { IPartialInterface, ITestImplementation } from "testeranto/src/Types";
import { PM } from "testeranto/src/PM/index.js";

import { ILoginPageSpecs } from "../test.js";
import { actions } from "../index.js";


export const LoginPageReactTestRendererTestInterface: IPartialInterface<ILoginPageSpecs> = {

  butThen: async function ({ testRenderer, reactComponent }: { testRenderer: renderer.ReactTestRenderer, reactComponent: any }, thenCB, tr, pm) {
    return await thenCB(testRenderer, pm);
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
  andWhen: async function (
    { testRenderer, reactComponent }: { testRenderer: renderer.ReactTestRenderer, reactComponent: any },
    whenCB: (s: renderer.ReactTestRenderer, utils: PM) => any,
    testResource: ITTestResourceConfiguration,
    pm: PM

  ): Promise<renderer.ReactTestRenderer> {
    await act(async () => await whenCB(testRenderer, pm));
    testRenderer.update(reactComponent); // Re-render the component
    return testRenderer
  }

}
