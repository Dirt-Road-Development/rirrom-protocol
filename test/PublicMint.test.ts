import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { it, describe } from "mocha";
import { ethers } from "hardhat";
import { PublicMint, RorrimNFT } from "../typechain-types";

describe("PublicMint Mock Test", () => {
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY as string);
    let calypso: PublicMint;
    let rorrim: RorrimNFT;
    
    before(async() => {
        calypso = await ethers.getContractAt("PublicMint", "0x2cD9F65285B4d3E16b287B45341ff9c907581a93", signer.connect(new ethers.JsonRpcProvider("https://staging-v3.skalenodes.com/v1/staging-utter-unripe-menkar")));
        rorrim = await ethers.getContractAt("RorrimNFT", "0x7Dcc444B1B94ACcf24C39C2ff2C0465D640cFC3F", signer.connect(new ethers.JsonRpcProvider("https://staging-v3.skalenodes.com/v1/staging-fast-active-bellatrix")));
    })

    it("Check Initial CalypsoNFT State", async() => {
        expect(await calypso.destinationChainHash()).to.be.equal("0x0000050877ed6397218923b67054bfcfd054c0012d0682fe896667859b4dede9");
        expect(await calypso.proxy()).to.be.equal("0xd2AAa00100000000000000000000000000000000");
        expect(await calypso.rorrimNFTAddress()).to.be.equal("0x7Dcc444B1B94ACcf24C39C2ff2C0465D640cFC3F");
        expect(await calypso.name()).to.be.equal("TestCollection");
        expect(await calypso.symbol()).to.be.equal("TEST");
    });

    it("Check Initial RorrimNFT State", async() => {
        expect(await rorrim.calypsoChainHash()).to.be.equal("0x000001482a7b2d8f437ab73ee59d30383ee20f31a189ec0816ccbca589940930");
        expect(await rorrim.calypsoNFT()).to.be.equal("0x2cD9F65285B4d3E16b287B45341ff9c907581a93");
        expect(await rorrim.name()).to.be.equal("TestCollection");
        expect(await rorrim.symbol()).to.be.equal("TEST");
    });

    /**
     * Commented Temporarily
     * Hard to replicate due to signer issues
     * Will be easier with ordered version
     */
    // it("Mirror Mint", async() => {
        // const publicMintOnCalypso = await calypso.publicMint(2, {
        //     gasLimit: 10000000,
        //     type: 0
        // });
        // console.log("Public Mint on Calypso: ", publicMintOnCalypso);
        // const transfer = await calypso.transferFrom(signer.address, "", 1)
        // const transfer = await rorrim.transferFrom(signer.address, "", 2)
    // })
});