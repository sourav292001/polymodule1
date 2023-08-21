// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "erc721a/contracts/ERC721A.sol";

contract cricketer is ERC721A {
    address public owner;

    // Maximum number of tokens that can be minted
    uint256 public maxQuantity = 5;

    // Base URL for the NFTs
    string private baseUrl = "https://gateway.pinata.cloud/ipfs/QmcX3QoHU2kSJwEacBDqXpLJ3XhEGf3cawpffjarGwMqaQ/";

    // URL for the prompt description
    string public prompt = "A cricketer wearing blue jersey cheering the crowd";

    constructor() ERC721("cricketer", "CRT") {
         owner = msg.sender;
    }
    // Modifier that only allows the owner to excute a function
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action!");
         ;
    }

    // Function to mint NFT which only owner can perform
    function mint (uint256 quantity) external payable onlyowner {
        require(
            totalSupply() + quantity <= maxQuantity,
            "You can not mint more than 5"
        );
        _mint(msg. sender, quantity);
    }


    // Override the baseURI function to return the base URL for the NFTs
    function_baseURI() internal view override returns (string memory) {
        return baseUrl;
    }


    // return the URI for the prompt description
    function promptDescription() external view returns (string memory) {
        return prompt;
    }
}
