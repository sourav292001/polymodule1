const { ethers } = require("hardhat");
const { FXRootContractAbi } = require("../artifacts/FXRootContractAbi.js");
const { Cricketer__factory } = require("../typechain");
require("dotenv").config();

async function transferTokensToFxChain() {
  try {
    // Set up connections to network and wallet
    const network = "goerli"; // Change this to the desired network
    const privateKey = process.env.PRIVATE_KEY;
    const provider = new ethers.providers.JsonRpcProvider(
      `https://${network}.infura.io/v3/your-infura-project-id`
    );

    // Create a wallet instance
    const wallet = new ethers.Wallet(privateKey, provider);

    // Get the signer instance
    const signer = wallet.connect(provider);

    // Get ERC721A contract instance
    const nftContractAddress = "0x2241bdE6016B7FFa0A74C8907a6E26101C0BA4F0";
    const nft = Cricketer__factory.connect(nftContractAddress, signer);

    // Get FXRoot contract instance
    const fxRootAddress = "0xF9bc4a80464E48369303196645e876c8C7D972de";
    const fxRoot = new ethers.Contract(fxRootAddress, FXRootContractAbi, signer);

    // TokenIds to transfer
    const tokenIds = [0, 1, 2, 3, 4];

    // Approve the nfts for transfer
    const approveTx = await nft.setApprovalForAll(fxRootAddress, true);
    await approveTx.wait();
    console.log("Approval confirmed");

    // Deposit the nfts to the FXRoot contract
    for (const tokenId of tokenIds) {
      const depositTx = await fxRoot.depositERC721(nft.address, tokenId, network);
      await depositTx.wait();
      console.log(`Token ${tokenId} deposited to FXChain`);
    }

    console.log("Approved and deposited");

    // Test balanceOf
    const balance = await nft.balanceOf(wallet.address);

    // Print the balance of the wallet
    console.log(
      "IndianNFT wallet balance",
      wallet.address,
      "is: ",
      balance.toString()
    );
  } catch (error) {
    console.error("An error occurred during the transfer:", error);
    process.exit(1);
  }
}

// Call the transfer function
transferTokensToFxChain();
