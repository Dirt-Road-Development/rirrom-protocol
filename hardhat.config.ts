import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
import "hardhat-deploy-ethers";
import "solidity-coverage";
import dotenv from "dotenv";
import "./tasks/launch";

dotenv.config();

const PRIVATE_KEY: string | undefined = process.env.PRIVATE_KEY;

if (!PRIVATE_KEY) {
    throw new Error("Private Key Not Set in .env");
}

const config: HardhatUserConfig = {
    solidity: "0.8.19",
    networks: {
        calypso: {
            url: "https://mainnet.skalenodes.com/v1/honorable-steel-rasalhague",
            accounts: [PRIVATE_KEY],
        },
        nebula: {
            url: "https://mainnet.skalenodes.com/v1/green-giddy-denebola",
            accounts: [PRIVATE_KEY],
        },
        "calypso-testnet": {
            url: "https://staging-v3.skalenodes.com/v1/staging-utter-unripe-menkar",
            accounts: [PRIVATE_KEY],
        },
        "chaos-testnet": {
            url: "https://staging-v3.skalenodes.com/v1/staging-fast-active-bellatrix",
            accounts: [PRIVATE_KEY],
        },
        "nebula-testnet": {
            url: "https://staging-v3.skalenodes.com/v1/staging-faint-slimy-achird",
            accounts: [PRIVATE_KEY],
        }
    }
};

export default config;
