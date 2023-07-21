import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { it, describe } from "mocha";
import { deployCalypsoHH } from "./fixtures";
import { ethers } from "hardhat";

describe("CalypsoNFT Contract Test", () => {
    it("Deployment", async() => {
        expect(await loadFixture(deployCalypsoHH)).to.not.throw;
    });

    it("Check State", async() => {
        const { contract } = await loadFixture(deployCalypsoHH);
        expect(await contract.destinationChainHash()).to.be.equal("0x0000050877ed6397218923b67054bfcfd054c0012d0682fe896667859b4dede9");
        expect(await contract.proxy()).to.be.equal("0xd2AAa00100000000000000000000000000000000");
        expect(await contract.rirromNFTAddress()).to.be.equal(ethers.ZeroAddress);
        expect(await contract.name()).to.be.equal("NFT Name");
        expect(await contract.symbol()).to.be.equal("NFT Symbol");
    });
});