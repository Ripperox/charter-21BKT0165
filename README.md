
---

# Merkle Proof Verification DApp

This project is a decentralized application (DApp) designed to verify the inclusion of transactions in a Merkle tree stored on the blockchain. By leveraging smart contracts and a React frontend, users can verify if a specific transaction (represented as a leaf) belongs to a set of transactions (represented by a Merkle root) using Merkle proofs. 

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup](#setup)
- [Usage](#usage)
- [Contract Overview](#contract-overview)
- [License](#license)

## Features

- **Merkle Proof Verification**: Verifies if a transaction (leaf) exists within a Merkle tree by validating against the Merkle root.
- **MetaMask Integration**: Users can connect their MetaMask wallet to interact with the DApp.
- **Frontend Interface**: React-based UI allowing users to input proofs and transaction details for verification.

## Tech Stack

- **Frontend**: React, JavaScript, ethers.js, CSS
- **Backend**: Solidity (Smart Contract), Hardhat (Development Environment)
- **Blockchain**: Ethereum
- **Wallet Integration**: MetaMask

## Setup

### Prerequisites

- **Node.js**: Make sure you have Node.js installed (v14 or above recommended).
- **MetaMask**: Install [MetaMask](https://metamask.io/) as a browser extension.
- **Hardhat**: For smart contract development and testing.

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Ripperox/charter-21BKT0165.git
   cd charter-21BKT0165
   ```

2. **Install Backend Dependencies**:
   Navigate to the `backend` folder and install dependencies:
   ```bash
   cd backend
   npm install
   ```

3. **Create a `.env` File in Backend**:
   Inside the `backend` folder, create a `.env` file with the following content:
   ```plaintext
   SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/6bb44e63456344d1b70bc87e435ad0d5
   PRIVATE_KEY=eb56b58c9a85d2b1eb56d04c89aa72de592a69b2193666be4f91273216a3c3a6
   ```

4. **Deploy the Smart Contract**:
   - Configure your Hardhat environment and deploy the contract to your desired network.
   - Update the contract address in the frontend code after deployment.
   ```bash
   npx hardhat compile
   npx hardhat run scripts/deploy.js --network <network>
   ```

5. **Install Frontend Dependencies**:
   Navigate to the `frontend` folder and install dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

6. **Create a `.env` File in Frontend**:
   Inside the `frontend` folder, create a `.env` file with the following content:
   ```plaintext
   REACT_APP_INFURA_URL=https://sepolia.infura.io/v3/6bb44e63456344d1b70bc87e435ad0d5
   REACT_APP_PRIVATE_KEY=eb56b58c9a85d2b1eb56d04c89aa72de592a69b2193666be4f91273216a3c3a6
   ```

7. **Update Contract Address and ABI**:
   In `frontend/src/App.js`, update `contractAddress` and `contractABI` with the deployed contract details.

8. **Start the Development Server**:
   Run the frontend React app:
   ```bash
   npm start
   ```

   The app should now be running at `http://localhost:3000`.

## Usage

1. Open the application in your browser.
2. Connect your MetaMask wallet to interact with the DApp.
3. Retrieve the Merkle root stored on the blockchain.
4. Input a transaction leaf and its corresponding Merkle proof (comma-separated) to verify inclusion.
5. View the result to confirm if the leaf is included in the Merkle tree.

## Contract Overview

The Solidity smart contract is designed to store a Merkle root and verify transaction inclusion. The primary functions include:

- **merkleRoot**: A view function that returns the current Merkle root.
- **verifyInclusion**: Accepts a proof and leaf and returns a boolean indicating if the leaf is part of the tree.

## License

This project is licensed under the MIT License.

--- 

