import { assert } from "chai";
import { renderToStaticMarkup } from "react-dom/server";
import { ITestSpecification } from "testeranto/src/Types";
import { IImpl as BaseIImple } from "testeranto/src/SubPackages/react-test-renderer/component/index";
import test from "testeranto/src/SubPackages/react-dom/component/node";

import { ClassicalComponent } from "..";

const snapshot = `<div style="border:3px solid green"><h1>Hello Marcus</h1><pre id="theProps">{}</pre><p>foo: </p><pre id="theState">{&quot;count&quot;:0}</pre><p>count: 0 times</p><button id="theButton">Click</button></div>`;
const readableStream = new ReadableStream({
  start(controller) {
    // The following function handles each data chunk
    function push() {
      controller.enqueue("idk");
      controller.close();

    }

    push();
  },
});

type IClassicalComponentSpec = {
  iinput: any;
  isubject: any;
  istore: any;
  iselection: any;
  given: () => {};
  when: any;
  then: Promise<void>;

  suites: {
    Default: string;
  };
  givens: {
    AnEmptyState: [];
  };
  whens: Record<string, never>;
  thens: {
    renderToStaticMarkup: [string];
    renderToStaticNodeStream: [NodeJS.ReadableStream];
  };
  checks: {
    AnEmptyState;
  };
}

const ClassicalComponentSpec: ITestSpecification<
  IClassicalComponentSpec
> =
  (Suite, Given, When, Then, Check) => {
    return [
      Suite.Default(
        "Classical Component, react-dom, server.node",
        {
          "test0": Given.AnEmptyState(
            ["test"],
            [],
            [
              Then.renderToStaticMarkup(snapshot),
              Then.renderToStaticNodeStream(readableStream)
            ]
          ),
        },
        []
      ),
    ];
  }

const impl: BaseIImple<IClassicalComponentSpec> = {
  suites: {
    Default: "some default Suite",
  },
  givens: {
    AnEmptyState: () => () => {
      return { props: { foo: "bar" } };
    },
  },
  whens: {},
  thens: {
    renderToStaticMarkup:
      (expectation) =>
        async (reactNodes) => {
          assert.deepEqual(
            renderToStaticMarkup(reactNodes),
            expectation
          );
        },

    renderToStaticNodeStream:
      (expectation) =>
        async (reactNodes) => {
          // console.log((renderToStaticNodeStream(reactNodes)))
          // assert.deepEqual(
          //   (renderToStaticNodeStream(reactNodes).read().toString()),
          //   expectation.toString()
          // );

        }
  },
  checks: {
    AnEmptyState: () => () => {
      return {};
    },
  },
}

export default test(
  impl,
  ClassicalComponentSpec,
  ClassicalComponent,
);
