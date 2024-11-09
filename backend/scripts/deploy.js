// scripts/deploy.js
async function main() {
    const MerkleProofVerifier = await ethers.getContractFactory("MerkleProofVerifier");
    const contract = await MerkleProofVerifier.deploy();
    await contract.deployed();
    console.log("MerkleProofVerifier deployed to:", contract.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
