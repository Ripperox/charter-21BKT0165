import { ethers } from "ethers";

const abi =[
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "merkleRoot",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_root",
          "type": "bytes32"
        }
      ],
      "name": "setMerkleRoot",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32[]",
          "name": "proof",
          "type": "bytes32[]"
        },
        {
          "internalType": "bytes32",
          "name": "leaf",
          "type": "bytes32"
        }
      ],
      "name": "verifyInclusion",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

const contractAddress = "0x6fa2EcE181ff9e2C090952d56A9Dd38704FE9019";

let provider;
let contract;


export const connectToEthereum = async () => {
  provider = new ethers.JsonRpcProvider(process.env.REACT_APP_INFURA_URL);
  const signer = provider.getSigner();  // Use signer if interacting with the contract (writing data)
  contract = new ethers.Contract(contractAddress, abi, signer);
};


export const getMerkleRoot = async () => {
  try {
    const root = await contract.merkleRoot();
    console.log("Merkle Root:", root);
    return root;
  } catch (err) {
    console.error("Error getting Merkle root:", err);
  }
};

// Verify inclusion of a leaf
export const verifyInclusion = async (proof, leaf) => {
  try {
    const isValid = await contract.verifyInclusion(proof, leaf);
    console.log("Is inclusion valid:", isValid);
    return isValid;
  } catch (err) {
    console.error("Error verifying inclusion:", err);
  }
};
