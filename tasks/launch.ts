import chalk from "chalk";
import { task } from "hardhat/config";
import { NetworkName, getNetworks, getOfficialChainName, getRPCUrl } from "../utils/getNetworks";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

type Location = "mainnet" | "testnet" | "testnet-chaos";

task("launch", "Launch Rirrom Protocol Contracts")
    .addParam("location", "Location of Deployment: [\"mainnet\", \"testnet\", \"testnet-chaos\"]", "testnet-chaos")
    .addParam("name", "NFT Contract Name")
    .addParam("symbol", "NFT Contract Symbol")
    .setAction(async({ location, name, symbol }: { location: Location, name: string, symbol: string }, hre) => {

        // 1. Get the network names
        const [ origin, destination ] = getNetworks(location);
        
        // 2. Get Signer
        const signer = new hre.ethers.Wallet(process.env.PRIVATE_KEY as string);

        // 3. Build Networks
        const calypso = new hre.ethers.JsonRpcProvider(getRPCUrl(origin as NetworkName))
        const target = new hre.ethers.JsonRpcProvider(getRPCUrl(destination as NetworkName));
        
        console.log("Calypso: ", getRPCUrl(origin as NetworkName));
        console.log("Dest: ", getRPCUrl(destination as NetworkName));

        // 4. Build Contracts
        const calypsoFactory = await hre.ethers.getContractFactory("CalypsoNFT", signer.connect(calypso));
        const targetFactory = await hre.ethers.getContractFactory("RirromNFT", signer.connect(target));

        // 5. Deploy Calypso Contract
        const calypsoDeployment = await calypsoFactory.deploy(name, symbol, getOfficialChainName(destination));
        await calypsoDeployment.waitForDeployment();

        // 6. Deploy Target Contract
        const targetDeployment = await targetFactory.deploy(name, symbol, getOfficialChainName(origin), await calypsoDeployment.getAddress())
        await targetDeployment.waitForDeployment();
        
        await calypsoDeployment.setRirromAddress(await targetDeployment.getAddress());

        const randomBytes = hre.ethers.randomBytes(16);
        const uuid = hre.ethers.uuidV4(randomBytes);

        // 7. Create Folder
        await mkdir(path.resolve(__dirname, "../deployments/", uuid));

        // 7. Store Deployment to Calypso
        const calypsoPath = path.resolve(__dirname, "../deployments/", `${uuid}/${origin}.json`);
        await writeFile(calypsoPath, JSON.stringify({
            address: await calypsoDeployment.getAddress(),
            abi: calypsoFactory.interface.formatJson(),
            owner: signer.address,
            deployer: signer.address
        }), "utf-8");
        // await hre.deployments.save(`/deployments/${location}/${origin}`, {
        //     ...calypsoDeployment,
        //     abi: calypsoFactory.interface.formatJson() as any,
        //     address: await calypsoDeployment.getAddress()
        // });

        // 8. Store Deployment to Destination
        const targetPath = path.resolve(__dirname, "../deployments/", `${uuid}/${destination}.json`);
        await writeFile(targetPath, JSON.stringify({
            address: await targetDeployment.getAddress(),
            abi: targetFactory.interface.formatJson(),
            deployer: signer.address
        }), "utf-8");
        // await hre.deployments.save(`/deployments/${location}/${destination}`, {
        //     ...targetDeployment,
        //     abi: targetFactory.interface.formatJson() as any,
        //     address: await targetDeployment.getAddress()
        // });
    });