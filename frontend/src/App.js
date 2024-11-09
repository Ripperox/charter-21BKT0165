import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './App.css'; // Custom CSS file

// Contract address and ABI (update with your actual contract details)
const contractAddress = '0x6fa2EcE181ff9e2C090952d56A9Dd38704FE9019'; // Example contract address
const contractABI = [
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
  },
];

const App = () => {
  const [account, setAccount] = useState(null);
  const [signer, setSigner] = useState(null);
  const [merkleRoot, setMerkleRoot] = useState(null);
  const [proofInput, setProofInput] = useState('');
  const [leafInput, setLeafInput] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);

  async function connectToMetaMask() {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        setSigner(signer);
        console.log("Connected to:", address);
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
        alert("Error connecting to MetaMask.");
      }
    } else {
      alert("MetaMask is not installed.");
    }
  }

  async function getMerkleRoot() {
    if (!signer) {
      alert("Please connect to MetaMask first.");
      return;
    }

    try {
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      const root = await contract.merkleRoot();
      setMerkleRoot(root);
      console.log("Merkle Root:", root);
    } catch (error) {
      console.error("Error fetching Merkle root:", error);
      alert("Error fetching Merkle root.");
    }
  }

  async function verifyLeafInclusion() {
    if (!signer) {
      alert("Please connect to MetaMask first.");
      return;
    }

    const proofArray = proofInput.split(',').map(item => ethers.hexlify(ethers.toUtf8Bytes(item.trim())));
    const leaf = ethers.hexlify(ethers.toUtf8Bytes(leafInput.trim()));

    try {
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      const result = await contract.verifyInclusion(proofArray, leaf);
      setVerificationResult(result);
      alert(`Leaf is valid: ${result}`);
    } catch (error) {
      console.error("Error verifying leaf inclusion:", error);
      alert("Error verifying leaf inclusion.");
    }
  }

  useEffect(() => {
    if (window.ethereum) {
      connectToMetaMask();
    }
  }, []);

  return (
    <div className="App">
      <div className="container">
        <h1>MetaMask & Ethereum Merkle Tree Verification</h1>

        {!account ? (
          <button className="connect-button" onClick={connectToMetaMask}>Connect MetaMask</button>
        ) : (
          <div className="account-info">
            <p><strong>Connected Account:</strong> {account}</p>
            <button className="get-merkle-root" onClick={getMerkleRoot}>Get Merkle Root</button>
            {merkleRoot && <p><strong>Merkle Root:</strong> {merkleRoot}</p>}

            <div className="input-section">
              <h3>Verify Leaf Inclusion</h3>
              <div className="input-group">
                <label>Proof (comma separated):</label>
                <input
                  type="text"
                  value={proofInput}
                  onChange={(e) => setProofInput(e.target.value)}
                  placeholder="e.g., 0x123..., 0x456..."
                />
              </div>
              <div className="input-group">
                <label>Leaf:</label>
                <input
                  type="text"
                  value={leafInput}
                  onChange={(e) => setLeafInput(e.target.value)}
                  placeholder="e.g., 0xabc..."
                />
              </div>
              <button className="verify-button" onClick={verifyLeafInclusion}>Verify</button>
              {verificationResult !== null && (
                <p className={`result ${verificationResult ? 'valid' : 'invalid'}`}>
                  {verificationResult ? 'Valid' : 'Invalid'}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
