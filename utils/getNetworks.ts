export type ConfigurationOption = "mainnet" | "testnet" | "testnet-chaos";
export type NetworkName = "calypso" | "nebula" | "calypso-testnet" | "nebula-testnet" | "chaos-testnet";

export const getNetworks = (configurationOption: ConfigurationOption) : [string, string]=> {
    if (configurationOption === "mainnet") return ["calypso", "nebula"];
    else if (configurationOption === "testnet") return ["calypso-testnet", "nebula-testnet"];
    else if (configurationOption === "testnet-chaos") return ["calypso-testnet", "chaos-testnet"];
    else throw new Error("Invalid Network Configuration");
}

const mainnetRPCUrl = (name: string) => `https://mainnet.skalenodes.com/v1/${name}`;
const testnetRPCUrl = (name: string) => `https://staging-v3.skalenodes.com/v1/${name}`;

export const getRPCUrl = (networkName: NetworkName) : string => {
    const chainName: string = getOfficialChainName(networkName);
    if (networkName === "calypso") return mainnetRPCUrl(chainName);
    else if (networkName === "nebula") return mainnetRPCUrl(chainName);
    else if (networkName === "calypso-testnet") return testnetRPCUrl(chainName);
    else if (networkName === "nebula-testnet") return testnetRPCUrl(chainName);
    else if (networkName === "chaos-testnet") return testnetRPCUrl(chainName);
    else throw new Error("Invalid Network Name");
}

export const getOfficialChainName = (networkName: string) : string => {
    if (networkName === "calypso") return "honorable-steel-rasalhague";
    else if (networkName === "nebula") return "green-giddy-denebola";
    else if (networkName === "calypso-testnet") return "staging-utter-unripe-menkar";
    else if (networkName === "nebula-testnet") return "staging-faint-slimy-achird";
    else if (networkName === "chaos-testnet") return "staging-fast-active-bellatrix";
    else throw new Error("Invalid Network Name");
}