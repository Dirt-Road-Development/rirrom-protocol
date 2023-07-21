import IMA from "../config/ima.json";
import chalk from "chalk";
import { ethers } from "ethers";

const EXTRA_CONTRACT_REGISTRAR_ROLE = ethers.id("EXTRA_CONTRACT_REGISTRAR_ROLE");

export async function registerContractSchain(
    contractAddress: string,
    toChainName: string,
    signer: ethers.Wallet
) {
    
    const messageProxyForSchain = new ethers.Contract(IMA["message_proxy_chain_address"], IMA["message_proxy_chain_abi"], signer);
    
    const hasRole: boolean = await messageProxyForSchain.hasRole(EXTRA_CONTRACT_REGISTRAR_ROLE, signer.address);
    if (!hasRole) throw new Error(chalk.redBright("You need EXTRA_CONTRACT_REGISTRAR_ROLE"));

    try {
        const res = await messageProxyForSchain.registerExtraContract(toChainName, ethers.getAddress(contractAddress));   
        chalk.green(res);
    } catch (err) {
        chalk.red(err);
        throw err;
    }
}