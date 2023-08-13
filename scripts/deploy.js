const hre = require("hardhat");
const fs = require("fs");

async function deployContractAndExportAddress() {
  try {
    // Get the contract factory
    const NFT = await hre.ethers.getContractFactory("cricketer");

    // Deploy the contract
    const nft = await NFT.deploy();

    // Wait for the contract to be deployed
    await nft.deployed();

    // Log the contract address
    console.log("NFT contract deployed to:", nft.address);

    // Export the contract address to a JavaScript file
    const contractAddressJs = `
      export const nftAddress = "${nft.address}";
    `;

    fs.writeFileSync("metadata/contractAddress.js", contractAddressJs);

    console.log("Contract address exported to metadata/contractAddress.js");
  } catch (error) {
    console.error("An error occurred during deployment:", error);
    process.exit(1);
  }
}

// Execute the deployment and export function
deployContractAndExportAddress();
