# OrionSyn WalletFactory Contract

Smart contract that allows users to create shared wallets for specific spaces. Each space can have multiple participants with different shares of ownership in the wallet. The contract uses the Create2 function to deploy the OrionWallet for each space.

## Prerequisites

Make sure you have the following tools installed:

- Node.js
- Hardhat

## Getting Started

1. Clone the repository:

```shell
git clone https://github.com/acgodson/orionsync/
cd Smart-contract
```

2. Install the dependencies:

```shell
npm install
```

3. Configure the Hardhat environment:

Update the hardhat.config.js file with your preferred network configuration.

4. Run the tests:

```shell
npx hardhat test
```

## Contract Overview

The WalletFactory contract has the following main functions:

- createSpace: Creates a new space with specified participants and proposed shares.
- signAgreement: Allows a participant to sign the agreement for a space.
- isSpaceCreated: Checks if a space has been created.
- allParticipantsSigned: Checks if all participants of a space have signed the agreement.
- createWallet: Creates a new wallet for a space using Create2 deployment.

## Testing

Write more functionalities in the test directory and run `npx hardhat test` to verify
