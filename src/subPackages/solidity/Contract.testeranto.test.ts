/// <reference types="./index.d.ts" />

import Ganache, { ServerOptions } from "ganache";
import Web3 from "web3";

import Testeranto from "testeranto/src/Node";

import {
  IBaseTest,
  ITestImplementation,
  ITestSpecification,
} from "testeranto/src/Types";
import { util } from "chai";

export type IInput = [
  { contractName: string; abi: any | any[] },
  (web3: any) => Promise<never[]>
];

export default <IT extends IBaseTest>(
  testImplementations: ITestImplementation<IT>,
  testSpecifications: ITestSpecification<IT>,
  testInput: IInput
) => {
  const compilation = testInput[0];

  return Testeranto<IT>(
    testInput,
    testSpecifications,
    testImplementations,

    {
      beforeAll: async () => testInput[0],

      beforeEach: async (contract, it, art, tr, iv, util) => {
        const logHandle = util.createWriteStream("ganache.log");

        const options: ServerOptions<any> = {
          logging: {
            logger: {
              log: (message: string) => {
                util.write(logHandle, message);
              },
            },
          },
        };

        // https://github.com/trufflesuite/ganache#programmatic-use
        const provider = Ganache.provider(options);

        /* @ts-ignore:next-line */
        const web3 = new Web3(provider);
        const accounts = await web3.eth.getAccounts();
        const argz = await testInput[1](web3);

        const size =
          Buffer.byteLength(contract.deployedBytecode.bytes, "utf8") / 2;

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
    }

    // { ports: 0 }
  );
};
