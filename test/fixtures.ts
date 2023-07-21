import { ethers } from "hardhat";

/**
 * 
 * @description Use local hardhat signer
 * 
 * @param name NFT Contract Name Param
 * @param symbol NFT Contract Symbol Param
 */
export async function deployCalypsoHH(name: string = "NFT Name", symbol: string = "NFT Symbol", destinationChainName: string = "staging-fast-active-bellatrix") {
    const [ signer ] = await ethers.getSigners();

    const factory = await ethers.getContractFactory("CalypsoNFT", signer);
    const contract = await factory.deploy(name, symbol, destinationChainName);

    return { contract, signer };
}

/**
 * 
 * @description Use local hardhat signer
 * 
 * @param name NFT Contract Name Param
 * @param symbol NFT Contract Symbol Param
 */
export async function deployRorrimHH(calypsoNFTAddress: string = ethers.ZeroAddress, name: string = "NFT Name", symbol: string = "NFT Symbol", destinationChainName: string = "staging-utter-unripe-menkar") {
    const [ signer ] = await ethers.getSigners();

    const factory = await ethers.getContractFactory("RorrimNFT", signer);
    const contract = await factory.deploy(name, symbol, destinationChainName, calypsoNFTAddress);

    return { contract, signer };
}