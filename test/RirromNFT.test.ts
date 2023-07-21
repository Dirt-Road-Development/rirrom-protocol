import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { it, describe } from "mocha";
import { deployRirromHH } from "./fixtures";
import { ethers } from "hardhat";

describe("RirromNFT Contract Test", () => {
    it("Deployment", async() => {
        expect(await loadFixture(deployRirromHH)).to.not.throw;
    });

    it("Check State", async() => {
        const { contract } = await loadFixture(deployRirromHH);
        expect(await contract.calypsoChainHash()).to.be.equal("0x000001482a7b2d8f437ab73ee59d30383ee20f31a189ec0816ccbca589940930");
        expect(await contract.calypsoNFT()).to.be.equal(ethers.ZeroAddress);
        expect(await contract.name()).to.be.equal("NFT Name");
        expect(await contract.symbol()).to.be.equal("NFT Symbol");
    });
});