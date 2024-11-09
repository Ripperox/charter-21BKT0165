require('@nomiclabs/hardhat-ethers');
require('dotenv').config();

const { SEPOLIA_RPC_URL, ZKSYNC_RPC_URL, PRIVATE_KEY } = process.env;

module.exports = {
  solidity: '0.8.0',
  networks: {
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
    },
    zksync: {
      url: ZKSYNC_RPC_URL,
      accounts: [PRIVATE_KEY],
    },
  },
};
