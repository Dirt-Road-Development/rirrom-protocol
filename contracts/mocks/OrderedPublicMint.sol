// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { CalypsoNFT } from "../CalypsoNFT.sol";
import { Counters } from "@openzeppelin/contracts/utils/Counters.sol";

contract OrderedPublicMint is CalypsoNFT {

    using Counters for Counters.Counter;

    Counters.Counter public tokenIdCounter;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _destinationChainName
    ) CalypsoNFT(_name, _symbol, _destinationChainName) {}

    function publicMint() external {
        _safeMint(msg.sender, tokenIdCounter.current());
        tokenIdCounter.increment();
    }

    function publicMintTo(address to) external {
        _safeMint(to, tokenIdCounter.current());
        tokenIdCounter.increment();
    }
}