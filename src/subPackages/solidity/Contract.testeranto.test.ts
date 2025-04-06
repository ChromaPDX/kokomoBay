/// <reference types="./index.d.ts" />

import Testeranto from "testeranto/src/Node";
import {
  Ibdd_in,
  Ibdd_out,
  IPartialInterface,
  ITestImplementation,
  ITestSpecification,
} from "testeranto/src/Types";

import Ganache, { ServerOptions } from "ganache";
import Web3 from "web3";

export type IInput = [
  { contractName: string; abi: any | any[] },
  (web3: any) => Promise<never[]>
];

export type IContractIn = Ibdd_in<
  unknown,
  unknown,
  {
    contract: any;
    accounts: any;
  },
  { contract: any; accounts: any },
  unknown,
  unknown,
  unknown
>;

export default <
  I extends IContractIn,
  O extends Ibdd_out<
    Record<string, any>,
    Record<string, any>,
    Record<string, any>,
    Record<string, any>,
    Record<string, any>
  >
>(
  testImplementations: ITestImplementation<I, O>,
  testSpecifications: ITestSpecification<I, O>,
  testInput: IInput
) => {
  const compilation = testInput[0];

  const testInterface: IPartialInterface<any> = {
    beforeAll: async () => testInput[0],

    beforeEach: async (contract, it, tr, iv, util) => {
      const logHandle = util.createWriteStream("ganache.log");

      const options: ServerOptions<any> = {
        logging: {
          logger: {
            log: (message: string) => {
              util.write(logHandle, message);
            },
          },
        },
      } as any;

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
  };

  return Testeranto<I, O>(
    testInput,
    testSpecifications,
    testImplementations,
    testInterface
  );
};
