# Rorrim Protocol

[![npm (tag)](https://img.shields.io/npm/v/@dirtroad/rorrim)](https://www.npmjs.com/package/@dirtroad/rorrim)

Rorrim Protocol is a SKALE specific smart contract protocol designed to help manage cross-chain NFT operations.
This software is currently a proof-of-concept to help simplify multi-chain interactions on SKALE.

## Installation

To add to your project, run:

```shell
npm add @dirtroad/rorrim
```

## Building

### rorrim Contract

To add the rorrim (target) contract to your project, import the following in your Solidity contract:

```solidity
import "@dirtroad/rorrim/contracts/rirrorm/rorrimNFT.sol";
```

### Calypso Contract

To add the calypso (target) contract to your project, import the following in your Solidity contract:

```solidity
import "@dirtroad/rorrim/contracts/rirrorm/CalypsoNFT.sol";
```

### Extending the rorrim Protocol

To extend the protocol to work on other SKALE Chains you can:

- Write your own launch script. See the default task at [Default Launch Task](./tasks)
- Write your own contracts that inherit the above and update or edit the [Default Launch Task](./tasks). For examples of extending the existing contracts see the [Mocks](./contracts/mocks/)

## Deployment (Launch)

To deploy the base protocol you must do the following:

1. Add a private key without the 0x to a .env file `cp .env.example .env && vim .env`
2. Make sure your ethereum account has deployer role on the necessary chains i.e Calypso/Nebula (Note - Chaos does not require deployer role)

Once complete, run the following to launch the protocol:

```shell
// Deploy on Mainnet (Calypso & Nebula)
npx hardhat launch --location mainnet --name <your-nft-contract-name> --symbol <your-nft-contract-symbol>

// Deploy on Testnet (Calypso & Nebula)
npx hardhat launch --location testnet --name <your-nft-contract-name> --symbol <your-nft-contract-symbol>

// Deploy on Testnet (Calypso & Chaos)
npx hardhat launch --location testnet-chaos --name <your-nft-contract-name> --symbol <your-nft-contract-symbol>
```

### Security and Liability

The rorrim Protocol contracts and code is WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
