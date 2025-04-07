import { ReactElement } from "react";

import { Ibdd_in } from "testeranto/src/Types";

export type I = Ibdd_in<
  never,
  React.ReactElement,
  never,
  never,
  () => { props: Record<string, unknown> },
  never,
  Promise<void>
>;

export type IStore<RD> = {
  htmlElement: HTMLElement;
  reactElement: ReactElement;
  domRoot: RD;
};
