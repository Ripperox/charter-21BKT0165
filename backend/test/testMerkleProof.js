import { expect } from "chai";
import hardhat from "hardhat";

const { ethers } = hardhat;

describe("MerkleProofVerifier Contract", function () {
  let MerkleProofVerifier, merkleProofVerifier;

  before(async function () {
    MerkleProofVerifier = await ethers.getContractFactory("MerkleProofVerifier");
    merkleProofVerifier = await MerkleProofVerifier.deploy();
    await merkleProofVerifier.deployed();
  });

  it("Should set and get the Merkle root correctly", async function () {
    const root = "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"; // 32-byte hex string
    await merkleProofVerifier.setMerkleRoot(root);
    expect(await merkleProofVerifier.merkleRoot()).to.equal(root);
  });
});
