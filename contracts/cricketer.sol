// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CricketerNFT is ERC721URIStorage, Ownable {
    // Maximum number of tokens that can be minted
    uint256 public maxQuantity = 5;

    // Base URL for the NFTs
    string private baseUrl = "https://gateway.pinata.cloud/ipfs/QmcX3QoHU2kSJwEacBDqXpLJ3XhEGf3cawpffjarGwMqaQ/";

    // URL for the prompt description
    string public prompt = "A cricketer wearing blue jersey cheering the crowd";

    constructor() ERC721("CricketerNFT", "CRT") {}

    // Function to mint NFTs, only owner can perform
    function mint(address to, uint256 quantity) external onlyOwner {
        require(totalSupply() + quantity <= maxQuantity, "Cannot mint more than maxQuantity");
        for (uint256 i = 0; i < quantity; i++) {
            uint256 tokenId = totalSupply();
            _mint(to, tokenId);
            _setTokenURI(tokenId, string(abi.encodePacked(baseUrl, tokenId.toString())));
        }
    }

    // Update the base URL for the NFTs
    function updateBaseUrl(string memory newBaseUrl) external onlyOwner {
        baseUrl = newBaseUrl;
    }

    // Update the prompt description
    function updatePrompt(string memory newPrompt) external onlyOwner {
        prompt = newPrompt;
    }

    // Return the URL for the prompt description
    function getPromptDescription() external view returns (string memory) {
        return prompt;
    }
}
