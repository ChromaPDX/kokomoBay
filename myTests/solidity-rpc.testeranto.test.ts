// Test a solidity file over RPC, compiling on the fly

import Ganache, { Server } from "ganache";
import Web3 from 'web3';
import { ethers } from "ethers";
import { Contract as ContractEthers } from 'ethers';
import { Contract as ContractWeb3 } from 'web3-eth-contract';

import Testeranto from "testeranto/src/Node";
import {
  ITestImplementation, ITestSpecification, ITTestShape
} from "testeranto/src/core";

import { solCompile } from "./truffle.mjs";

type Selection = {
  contractFarSide: ContractEthers,
  contractNearSide: ContractWeb3,
  accounts,
  server: Server
};

type WhenShape = any;
type ThenShape = any;
type Input = any;
type Ibis = any;

export const SolidityRpcTesteranto = <
  ITestShape extends ITTestShape,
>(
  testImplementations: ITestImplementation<
    string,
    Selection,
    WhenShape,
    ThenShape,
    ITestShape
  >,
  testSpecifications: ITestSpecification<ITestShape>,
  testInput: Input,
  contractName: string
) =>
  Testeranto<
    ITestShape,
    string,
    Ibis,
    Selection,
    Selection,
    WhenShape,
    ThenShape,
    string
  >(
    testInput,
    testSpecifications,
    testImplementations,

    {
      beforeAll: async () =>
        (await solCompile(contractName)).contracts.find((c) => c.contractName === contractName),

      beforeEach: (contract: Ibis, i, tr) => {

        return new Promise((res) => {
          const options = {};
          const port = tr.ports[0];

          // https://github.com/trufflesuite/ganache#programmatic-use
          const server = Ganache.server(options);


          // start the ganache chain
          server.listen(port, async err => {
            console.log(`ganache listening on port ${port}...`);
            if (err) throw err;

            const providerFarSide = server.provider;
            const accounts = await providerFarSide.request({ method: "eth_accounts", params: [] });

            /* @ts-ignore:next-line */
            const web3NearSide = new Web3(providerFarSide);

            // deploy the contract under accounts[0]
            const contractNearSide = await (new web3NearSide.eth.Contract(contract.abi))
              .deploy({ data: contract.bytecode.bytes })
              .send({ from: accounts[0], gas: 7000000 });

            /////////////////////////////////////////////

            const web3FarSideProvider = new ethers.providers.JsonRpcProvider(`http://localhost:${port}`);
            // web3FarSideProvider.
            // create a test wallet from a ganache account
            const web3FarSideSigner = new ethers.Wallet(
              providerFarSide.getInitialAccounts()[accounts[1]].secretKey,
              web3FarSideProvider
            );

            // create a contract that our test user can access
            const contractFarSide = new ethers.Contract(
              contractNearSide.options.address,
              contract.abi,
              web3FarSideSigner
            );

            res({
              contractNearSide,
              contractFarSide,
              accounts,
              server,
            });
          });
        })
      },

      afterEach: async ({ server }) =>
        await server.close(),

      andWhen: async ({ contractFarSide, accounts }, callback: any) =>
        (callback())({ contractFarSide, accounts }),

      afterAll: ({ server }) => {
        server.close();
      }
    },
    { ports: 1 },
  )
