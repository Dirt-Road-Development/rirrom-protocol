// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import "@skalenetwork/ima-interfaces/schain/IMessageProxyForSchain.sol";
import {MintNotice, TransferNotice} from "./Types.sol";

error MessageMustComeFromCalypso();
error RorrimAddressNotSet();

contract CalypsoNFT is ERC721, Ownable {
    bytes32 public destinationChainHash;
    IMessageProxyForSchain public proxy;
    address public rorrimNFTAddress;

    event SetRorrimAddress(address indexed addr);

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _destinationChainName
    ) ERC721(_name, _symbol) {
        destinationChainHash = keccak256(
            abi.encodePacked(_destinationChainName)
        );
        proxy = IMessageProxyForSchain(
            0xd2AAa00100000000000000000000000000000000
        );
    }

    function ownerMint(address to, uint256 tokenId) external onlyOwner {
        _safeMint(to, tokenId);
    }    

    function setRorrimAddress(address _rorrimNFTAddress) external onlyOwner {
        rorrimNFTAddress = _rorrimNFTAddress;
        emit SetRorrimAddress(_rorrimNFTAddress);
    }

    function _beforeTokenTransfer(address from, address to, uint256 firstTokenId, uint256 batchSize) internal virtual override {
        if (rorrimNFTAddress == address(0)) revert RorrimAddressNotSet();
        super._beforeTokenTransfer(from, to, firstTokenId, batchSize);
    }

    function _afterTokenTransfer(
        address from,
        address to,
        uint256 firstTokenId,
        uint256 batchSize
    ) internal virtual override {
        super._afterTokenTransfer(from, to, firstTokenId, batchSize);
        if (from == address(0)) {
            proxy.postOutgoingMessage(
                destinationChainHash,
                rorrimNFTAddress,
                abi.encode(
                    "mint",
                    abi.encode(MintNotice({to: to, tokenId: firstTokenId}))
                )
            );
        } else {
            proxy.postOutgoingMessage(
                destinationChainHash,
                rorrimNFTAddress,
                abi.encode(
                    "transfer",
                    abi.encode(TransferNotice({to: to, tokenId: firstTokenId}))
                )
            );
        }
    }
}
