import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types";
import { registerContractSchain } from "../utils/ima";

task("register-contract-ima", "Register Contract with MessageProxyForSchain")
    .addParam("address", "Contract Address to Whitelist")
    .addParam("chain", "Chain Name to Whitelist for")
    .addParam("rpc", "RPC URL")
    .setAction(async(args: TaskArguments, hre: HardhatRuntimeEnvironment) => {
        const { ethers} = hre;

        const wallet = new ethers.Wallet(process.env.PRIVATE_KEY as string).connect(new ethers.JsonRpcProvider(args.rpc));
        
        await registerContractSchain(args.address, args.chain, wallet);
    });