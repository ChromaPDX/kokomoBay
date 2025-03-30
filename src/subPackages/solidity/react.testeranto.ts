import React, { MutableRefObject, useEffect, useRef } from "react";
import { CElement, createElement } from "react";
import ReactDom from "react-dom/client";
import { createPortal } from "react-dom";

import Testeranto from "testeranto/src/Web";
import {
  IBaseTest,
  IPartialInterface,
  ITestImplementation,
  ITestSpecification,
} from "testeranto/src/Types";

// import type { IInput, ISelection, IStore } from "./index";
export type IInput = (props?) => JSX.Element;
type ISubject = {
  domRoot: ReactDom.Root;
  htmlElement: HTMLElement;
  reactElement: MutableRefObject<any>;
  // abi: AbiItem | AbiItem[];
  // deployedBytecode: { bytes: string };
  // bytecode: { bytes: string };
};
export type IState = unknown;
export type ISelection = HTMLElement;
export type IStore = HTMLElement;
export type IWhenShape = any;
export type IThenShape = any;

// export type ISubject = HTMLElement;

export default <
  ITestShape extends IBaseTest<
    IInput,
    ISubject,
    IStore,
    ISelection,
    unknown,
    () => (a: any) => IStore,
    unknown,
    Record<string, any>,
    Record<string, any>,
    Record<string, any>,
    Record<string, any>,
    Record<string, any>
  >
>(
  testImplementations: ITestImplementation<ITestShape>,
  testSpecifications: ITestSpecification<ITestShape>,
  testInput: IInput
) => {
  const TesterantoComponent = function ({
    done,
    innerComp,
  }: {
    done: (ref: React.MutableRefObject<any>) => any;
    innerComp: IInput;
  }) {
    const myContainer = useRef<any>(null);
    useEffect(() => {
      console.log("useEffect called!", myContainer.current);
      done(myContainer.current);
    }, []);

    // debugger;
    return React.createElement(
      "div",
      { ref: myContainer },
      innerComp({
        port: 3003,
        address: "some-address",
        secretKey: "someSecretKey",
        abi: "foo",
      })
    );
  };

  const testInterface: IPartialInterface<ITestShape> = {
    beforeAll: async (reactElement, itr) => {
      return new Promise<ISubject>((resolve, rej) => {
        const htmlElement = document.getElementById("root");
        if (htmlElement) {
          const domRoot = ReactDom.createRoot(htmlElement);

          domRoot.render(
            createElement(
              TesterantoComponent,
              {
                // ...initialProps,
                innerComp: reactElement,
                done: (reactElement) => {
                  resolve({
                    htmlElement,
                    reactElement,
                    domRoot,
                  });
                },
              },
              []
            )
          );

          // resolve({ htmlElement });
        }
      });
    },

    beforeEach: async (subject, initializer, artificer, testResource, pm) => {
      return new Promise((resolve, rej) => {
        createPortal(
          TesterantoComponent({
            innerComp: () =>
              testInput({
                port: 3003,
                address: "some-address",
                secretKey: "someSecretKey",
                abi: "foo",
              }),
            done: (reactElement) => {
              process.nextTick(() => {
                resolve(reactElement);
              });
            },
          }),
          subject.domRoot as any
        );
      });
    },
    andWhen: (s, whenCB) => {
      return new Promise((resolve, rej) => {
        process.nextTick(() => {
          resolve(whenCB()(s));
        });
      });
    },
    butThen: async function (s) {
      return new Promise((resolve, rej) => {
        process.nextTick(() => {
          resolve(s);
        });
      });
    },
    afterEach: async function (store, ndx, artificer) {
      return new Promise((resolve, rej) => {
        process.nextTick(() => {
          resolve({});
        });
      });
    },
    afterAll: (store, artificer) => {
      return new Promise((resolve, rej) => {
        process.nextTick(() => {
          resolve({});
        });
      });
    },
  };

  const t = Testeranto<ITestShape>(
    testInput,
    testSpecifications,
    testImplementations,
    testInterface
  );

  document.addEventListener("DOMContentLoaded", function () {
    const rootElement = document.getElementById("root");
    if (rootElement) {
    }
  });

  return t;
};
