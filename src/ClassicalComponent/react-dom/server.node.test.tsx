import type { Ibdd_out, ITestImplementation, ITestSpecification } from "testeranto/src/Types";
import test from "testeranto/src/SubPackages/react-dom/component/node";

import { assert } from "chai";
import { renderToStaticMarkup, renderToStaticNodeStream } from "react-dom/server";

import { ClassicalComponent } from "..";
import { I } from "./test";

export type O = Ibdd_out<
  {
    Default: string;
  },
  {
    AnEmptyState: [];
  },
  Record<string, never>,
  {
    renderToStaticMarkup: [string];
    renderToStaticNodeStream: [ReadableStream<string>];
  },
  {
    AnEmptyState: [];
  }
>;


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

const ClassicalComponentSpec: ITestSpecification<
  I, O
> =
  (Suite, Given, When, Then) => {
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

const impl: ITestImplementation<I, O> = {
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
      () =>
        async (reactNodes) => {
          const stream = renderToStaticNodeStream(reactNodes);
          let result = '';
          for await (const chunk of stream) {
            result += chunk;
          }
          assert.equal(result, snapshot);
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
