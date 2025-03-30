// Test a solidity file over RPC
/// <reference types="./index.d.ts" />

import Testeranto from "testeranto/src/Node";
import {
  IBaseTest,
  IPartialInterface,
  ITestImplementation,
  ITestSpecification,
} from "testeranto/src/Types";

import Ganache, { EthereumProvider, Server, ServerOptions } from "ganache";
import Web3 from "web3";
import { ethers } from "ethers";
import { Contract as ContractEthers } from "ethers";
import Contract, { Contract as ContractWeb3 } from "web3-eth-contract";

import type { AbiItem } from "web3-utils";

// type Shape = {
//   contractFarSide: ContractEthers;
//   contractNearSide: ContractWeb3;
//   accounts;
//   server: Server;
// };

export type IInput = { contractName: string; abi: any };

type istore = {
  contractNearSide: Contract;
  contractFarSide: ethers.Contract;
  // provider: EthereumProvider;
  // contract: Contract;
  accounts: string[];
  server: Server<any>;
};

export default <
  IT extends IBaseTest<
    unknown,
    {
      abi: AbiItem | AbiItem[];
      deployedBytecode: { bytes: string };
      bytecode: { bytes: string };
    },
    istore,
    unknown,
    unknown,
    unknown,
    unknown,
    Record<string, any>,
    Record<string, any>,
    Record<string, any>,
    Record<string, any>,
    Record<string, any>
  >
>(
  testImplementations: ITestImplementation<IT>,
  testSpecifications: ITestSpecification<IT>,
  testInput: IInput
) => {
  const testInterface: IPartialInterface<IT> = {
    // beforeAll: async () =>
    //   (await solCompile(contractName)).contracts.find(
    //     (c) => c.contractName === contractName
    //   ),

    beforeEach: async (contract, i, artificer, testResource, iv, util) => {
      const logHandle = util.createWriteStream("ganache.log");

      return new Promise<istore>((res) => {
        const options: ServerOptions<any> = {
          logging: {
            logger: {
              log: (message: string) => {
                util.write(logHandle, message);
              },
            },
          },
        } as any;
        const port = testResource.ports[0];

        // https://github.com/trufflesuite/ganache#programmatic-use
        const server = Ganache.server(options);

        // start the ganache chain
        server.listen(port, async (err) => {
          if (err) throw err;

          const providerFarSide = server.provider;
          const accounts = await providerFarSide.request({
            method: "eth_accounts",
            params: [],
          });

          /* @ts-ignore:next-line */
          const web3NearSide = new Web3(providerFarSide);

          // deploy the contract under accounts[0]
          const contractNearSide = await new web3NearSide.eth.Contract(
            contract.abi
          )
            .deploy({ data: contract.bytecode.bytes })
            .send({ from: accounts[0], gas: 7000000 });

          /////////////////////////////////////////////

          const web3FarSideProvider = new ethers.providers.JsonRpcProvider(
            `http://localhost:${port}`
          );

          // create a test wallet from a ganache account
          const web3FarSideSigner = new ethers.Wallet(
            providerFarSide.getInitialAccounts()[accounts[1]].secretKey,
            web3FarSideProvider
          );

          // create a contract that our test user can access
          const contractFarSide = new ethers.Contract(
            contractNearSide.options.address,
            contract.abi as ethers.ContractInterface,
            web3FarSideSigner
          );

          res({
            contractNearSide,
            contractFarSide,
            accounts,
            server,
          });
        });
      });
    },

    afterEach: async (x) => {
      await x.server.close();
      return x;
    },

    andWhen: async ({ contractFarSide, accounts }, callback: any) =>
      callback({ contractFarSide, accounts }),

    afterAll: ({ server }) => {
      // server.close();
    },
  };

  return Testeranto<IT>(
    testInput,
    testSpecifications,
    testImplementations,
    testInterface
  );
};
