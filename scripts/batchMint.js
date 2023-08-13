const { ethers } = require("hardhat");
require("dotenv").config();

async function batchMintTokens() {
  try {
    // Get private key from env
    const privateKey = process.env.PRIVATE_KEY;

    // The URL of the network provider
    const networkUrl = "https://eth-goerli.alchemyapi.io/v2/your-alchemy-api-key";

    // Create a provider using the URL
    const provider = new ethers.providers.JsonRpcProvider(networkUrl);

    // Create a wallet instance from the private key and provider
    const wallet = new ethers.Wallet(privateKey, provider);

    // The address of the deployed contract
    const contractAddress = "0x2241bdE6016B7FFa0A74C8907a6E26101C0BA4F0";

    // Get the contract factory and attach it to the wallet
    const NFTFactory = await ethers.getContractFactory("cricketer", wallet);
    const nftContract = await NFTFactory.attach(contractAddress);

    // Batch mint 5 tokens
    const mintTx = await nftContract.mint(5);
    await mintTx.wait();

    // Log a message to indicate successful minting
    console.log("Successfully minted 5 tokens");
  } catch (error) {
    console.error("An error occurred during token minting:", error);
    process.exit(1);
  }
}

// Call the batch mint function
batchMintTokens();
