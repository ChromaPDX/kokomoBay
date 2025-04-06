import { assert } from "chai";
import { ITestImplementation } from "testeranto/src/Types";
import { IMyFirstContractTest } from "./MyFirstContract.solidity-react.shape.test";

const testImplementation: ITestImplementation<
  IMyFirstContractTest<IMyFirstContractTest<any>>
> = {
  suites: {
    Default: "Testing a very simple smart contract",
  },
  givens: {
    Default: () => {
      return "MyFirstContract.sol";
    },
  },
  whens: {
    Increment: (asTestUser) => async (props) => {
      try {
        const element = await props.page.$("#increment");
        element.click();
      } catch (e) {}
    },
    Decrement: (asTestUser) => async (props) => {
      try {
        const element = await props.page.$("#decrement");
        element.click();
      } catch (e) {}
    },
  },
  thens: {
    Get:
      ({ asTestUser, expectation }) =>
      async (props) => {
        try {
          const element = await props.page.$("#counter");
          const element_property = await element.getProperty("innerHTML");
          const inner_html = await element_property.jsonValue();

          assert.deepEqual(inner_html, expectation.toString());
        } catch (e) {}
      },
  },
  checks: {
    AnEmptyState: () => "MyFirstContract.sol",
  },
};

export default testImplementation;
