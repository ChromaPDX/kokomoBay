import { Ibdd_out } from "testeranto/src/Types";

export type O = Ibdd_out<
  {
    Default: string;
  },
  {
    Default;
  },
  {
    IClick: [];
  },
  {
    TheCounterIs: [number];
  },
  {
    Default;
  }
>;
