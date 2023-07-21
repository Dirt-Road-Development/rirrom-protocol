// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { CalypsoNFT } from "../CalypsoNFT.sol";

contract PublicMint is CalypsoNFT {

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _destinationChainName
    ) CalypsoNFT(_name, _symbol, _destinationChainName) {}

    function publicMint(uint256 tokenId) external {
        _safeMint(msg.sender, tokenId);
    }

    function publicMintTo(address to, uint256 tokenId) external {
        _safeMint(to, tokenId);
    }
}