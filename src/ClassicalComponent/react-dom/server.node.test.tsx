import { assert } from "chai";
import { renderToStaticMarkup, renderToStaticNodeStream } from "react-dom/server";
import { ITestSpecification } from "testeranto/src/Types";
import { IImpl as BaseIImple } from "testeranto/src/SubPackages/react-test-renderer/component/index";
import test from "testeranto/src/SubPackages/react-dom/component/node";

import { ClassicalComponent } from "..";

const snapshot = `<div style="border:3px solid green"><h1>Hello Marcus</h1><pre id="theProps">{}</pre><p>foo: </p><pre id="theState">{&quot;count&quot;:0}</pre><p>count: 0 times</p><button id="theButton">Click</button></div>`;
const readableStream: ReadableStream<string> = new ReadableStream({
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
  iinput: never;
  isubject: React.ReactElement;
  istore: never;
  iselection: never;
  given: () => { props: Record<string, unknown> };
  when: never;
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
    renderToStaticNodeStream: [ReadableStream<string>];
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
          const stream = renderToStaticNodeStream(reactNodes);
          let result = '';
          for await (const chunk of stream) {
            result += chunk;
          }
          assert.include(result, 'Hello Marcus'); // Basic content check
          assert.include(result, 'count: 0 times');
        }
  },
  checks: {
    AnEmptyState: () => () => {
      return { props: { foo: "bar" } };
    },
  },
}

export default test(
  impl,
  ClassicalComponentSpec,
  ClassicalComponent,
);
