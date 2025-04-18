import Testeranto from "testeranto/src/Web";
import React, { useEffect, useRef } from "react";
import { createElement } from "react";
import ReactDom from "react-dom/client";

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
  const myContainer = useRef<any>(null);
  useEffect(() => {
    done(myContainer.current);
  }, []);

  return React.createElement("div", { ref: myContainer }, innerComp);
};

export default Testeranto<any, any>(
  LoginPage,
  LoginPageSpecs,
  loginPageImplreactDom,
  {
    beforeAll: async (reactElement, itr, tr, utils): Promise<any> => {
      return new Promise(async (resolve, rej) => {
        const htmlElement = document.getElementById("root");

        if (htmlElement) {
          const domRoot = ReactDom.createRoot(htmlElement);
          // await utils.customScreenShot({ path: "prerender.jpg" })
          resolve({ htmlElement, reactElement, domRoot });

        }
      });
    },

    beforeEach: async (
      { htmlElement, reactElement, domRoot },
      initializer,
      testResource,
      iv,
      utils
    ): Promise<IStore> => {

      return new Promise((resolve, rej) => {

        const r = reactElement()
        const component = createElement(
          TesterantoComponent,
          {
            innerComp: r,
            done: async (mutableRef) => {
              // await utils.customScreenShot({ path: "render.jpg" })
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

      });
    },
    andWhen: function (s, whenCB, tr, utils) {
      return whenCB(s.r, utils);
    },
    butThen: async function (
      s,
      thenCB,
      tr,
      utils
    ) {
      return await thenCB(s.mutableRef, utils);
    },
    afterEach: async function (store, ndx, utils) {
      // console.log("store", store.toString())
      // await utils.customScreenShot({ path: "beforeUnmount.jpg" });
      // await utils.writeFileSync("dump.html", store.htmlElement.outerHTML)

      return new Promise(async (resolve, rej) => {
        // await store.domRoot.unmount()
        // await utils.customScreenShot({ path: "afterUnmount.jpg" })

        // await store.r.props.store.dispatch(actions.reset())
        resolve({});
      });
    },
    afterAll: (store,) => {
      return new Promise((resolve, rej) => {
        resolve({});
      });
    },
  }
)
