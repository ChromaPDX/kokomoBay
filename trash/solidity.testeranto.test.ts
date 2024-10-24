// Test a solidity file, compiling on the fly

import { Contract } from "web3-eth-contract";
import Ganache from "ganache";
import Web3 from "web3";

import Testeranto from "testeranto/src/Node";
// import { ITestImplementation, ITestSpecification, ITTestShape } from "testeranto/src/core";

import { solCompile } from "../src/truffle.mjs";
import {
  IBaseTest,
  ITTestShape,
  ITestImplementation,
  ITestSpecification,
} from "testeranto/src/Types";

type Selection = {
  contract: Contract;
  accounts;
  provider: unknown;
};

type WhenShape = any;
type ThenShape = any;
type Input = [string, (_w3: Web3) => Promise<string[]>];
type Ibis = any;

export const SolidityTesteranto = async <ITestShape extends IBaseTest>(
  testImplementations: ITestImplementation<ITestShape>,
  testSpecifications: ITestSpecification<ITestShape>,
  testInput
) => {
  console.log("testInput", testInput);
  const compilation = (await solCompile(testInput[0])).contracts.find(
    (c) => c.contractName === testInput[0]
  );
  console.log("compilation", compilation);

  return Testeranto(
    testInput,
    testSpecifications,
    testImplementations,

    {
      beforeAll: async () => compilation,

      beforeEach: async (contract: Ibis) => {
        console.log("beforeEach");
        const provider = Ganache.provider({
          // seed: "drizzle-utils",
          // gasPrice: 7000000,
        });

        /* @ts-ignore:next-line */
        const web3 = new Web3(provider);
        const accounts = await web3.eth.getAccounts();
        const argz = await testInput[1](web3);

        const size =
          Buffer.byteLength(contract.deployedBytecode.bytes, "utf8") / 2;
        // console.log('contract size is', size);

        return {
          contract: await new web3.eth.Contract(contract.abi)
            .deploy({
              data: contract.bytecode.bytes,
              arguments: argz,
            })
            .send({ from: accounts[0], gas: 7000000 }),
          accounts,
          provider,
        };
      },
      andWhen: async ({ provider, contract, accounts }, callback: any) =>
        callback({ contract, accounts }),
    },

    { ports: 0 }
  );
};
