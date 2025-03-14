import Testeranto from "testeranto/src/Web";
import React, { useEffect, useRef } from "react";
import { CElement, createElement } from "react";
import ReactDom, { createPortal } from "react-dom";

import { LoginPageSpecs } from "../test.js";
import LoginPage, { actions } from "../index.js";

import {
  loginPageImplreactDom,
} from "./test.js";

export type IInput = (props?) => JSX.Element;
export type IState = unknown;
export type ISelection = HTMLElement;
export type IStore = any;
export type IWhenShape = any;
export type IThenShape = any;

export type ISubject = HTMLElement;

const TesterantoComponent = ({
  done,
  innerComp,
}: {
  done: (ref: React.MutableRefObject<any>) => any;
  innerComp: JSX.Element;
}) => {

  // const i = innerComp();

  const myContainer = useRef<any>(null);
  useEffect(() => {
    done(myContainer.current);
  }, []);

  return React.createElement("div", { ref: myContainer }, innerComp);
};

export default Testeranto<IThenShape>(
  LoginPage,
  LoginPageSpecs,
  loginPageImplreactDom,
  {
    beforeAll: async (reactElement, itr, tr, utils): Promise<any> => {
      return new Promise(async (resolve, rej) => {
        const htmlElement = document.getElementById("root");

        if (htmlElement) {
          const domRoot = ReactDom.createRoot(htmlElement);

          // domRoot.render(
          //   createElement(
          //     TesterantoComponent,
          //     {
          //       // ...initialProps,
          //       innerComp: reactElement,
          //       done: (reactElement) => {
          //         resolve({
          //           htmlElement,
          //           reactElement,
          //           domRoot,
          //         });
          //       },
          //     },
          //     []
          //   )
          // );
          await utils.customScreenShot({ path: "prerender.jpg" })

          resolve({ htmlElement, reactElement, domRoot });

        }
      });
    },

    beforeEach: async (
      { htmlElement, reactElement, domRoot },
      initializer,
      artificer,
      testResource,
      utils
    ): Promise<IStore> => {

      return new Promise((resolve, rej) => {

        // createPortal(
        //   TesterantoComponent({
        //     innerComp: () =>
        //       reactElement({}),
        //     done: (reactElement: any) => {
        //       resolve(reactElement);
        //       // process.nextTick(() => {
        //       //   resolve(reactElement);
        //       // });
        //     },
        //   }),
        //   domRoot
        // );

        // const domRoot = ReactDom.createRoot(htmlElement);

        const r = reactElement()
        const component = createElement(
          TesterantoComponent,
          {
            innerComp: r,
            done: async (mutableRef) => {
              await utils.customScreenShot({ path: "render.jpg" })
              resolve({
                htmlElement,
                reactElement,
                domRoot,
                mutableRef,
                r
              });
            },
          },
          []
        );

        domRoot.render(component);



        // resolve(subject);
        // const tc = TesterantoComponent({
        //   innerComp: () =>
        //     testInput({}),
        //   done: (reactElement: any) => {
        //     console.log("mark9");
        //     resolve(reactElement);
        //     // process.nextTick(() => {
        //     //   resolve(reactElement);
        //     // });
        //   },
        // });
        // console.log("mark9", tc);
        // createPortal(tc, subject.domRoot);
      });
    },
    andWhen: function (s: IStore, whenCB, tr, utils): Promise<ISelection> {
      return whenCB(s.r, utils);
    },
    butThen: async function (
      s: IStore,
      thenCB,
      tr,
      utils
    ): Promise<ISelection> {
      return await thenCB(s.r, utils)
      // return new Promise((resolve, rej) => {
      //   resolve(thenCB(s.r, utils));
      // });
    },
    afterEach: async function (store: IStore, ndx, artificer, utils) {
      await utils.customScreenShot({ path: "beforeUnmount.jpg" });
      await utils.writeFileSync("dump.html", store.htmlElement.outerHTML)

      return new Promise(async (resolve, rej) => {
        await store.domRoot.unmount()
        await utils.customScreenShot({ path: "afterUnmount.jpg" })

        await store.r.props.store.dispatch(actions.reset())
        resolve({});
      });
    },
    afterAll: (store: IStore, artificer) => {
      return new Promise((resolve, rej) => {
        resolve({});
      });
    },
  }
)