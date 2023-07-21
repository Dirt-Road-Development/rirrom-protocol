// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {MintNotice, TransferNotice} from "./Types.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

error InvalidAction(string action);
error InvalidSender();
error MessageMustComeFromCalypso();

contract RorrimNFT is ERC721 {

    bytes32 public calypsoChainHash;
    address public calypsoNFT;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _calypsoChainName,
        address _calypsoNFT
    ) ERC721(_name, _symbol) {
        calypsoChainHash = keccak256(abi.encodePacked(_calypsoChainName));
        calypsoNFT = _calypsoNFT;
    }

    function postMessage(
        bytes32 schainHash,
        address sender,
        bytes calldata data
    ) external {
        if (schainHash != calypsoChainHash) revert MessageMustComeFromCalypso();
        if (sender != calypsoNFT) revert InvalidSender();

        (string memory action, bytes memory obj) = abi.decode(
            data,
            (string, bytes)
        );

        if (Strings.equal(action, "mint")) {
            MintNotice memory notice = abi.decode(obj, (MintNotice));
            _safeMint(notice.to, notice.tokenId);
        } else if (Strings.equal(action, "transfer")) {
            TransferNotice memory notice = abi.decode(obj, (TransferNotice));
            address currentOwner = ownerOf(notice.tokenId);
            _safeTransfer(currentOwner, notice.to, notice.tokenId, "");
        } else {
            revert InvalidAction(action);
        }
    }

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override {}

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override {}
}
