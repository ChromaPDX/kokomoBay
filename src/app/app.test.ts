import { Ibdd_out } from "testeranto/src/Types";

export type O = Ibdd_out<
  {
    Default: [string];
  },
  {
    AnEmptyState: [];
    AStateWithEmail: [string];
  },
  {
    TheLoginIsSubmitted: [];
    TheEmailIsSetTo: [string];
    ThePasswordIsSetTo: [string];
  },
  {
    TheEmailIs: [string];
    TheEmailIsNot: [string];
    ThePasswordIs: [string];
    ThePasswordIsNot: [string];
  },
  {
    AnEmptyState: [];
  }
>;
