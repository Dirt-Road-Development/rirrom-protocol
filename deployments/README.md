# Deployments

This project does not have hardhat-deploy installed due to issuses with multi-network.
To simplify the launch scripts to reduce complexity so they can be easily extended this
project maintains it's own deployment manager.

Sub-directories within this directory will be random id's (uuidv4) and will contain files under them pertaining to each deployment. 
Currently this protocol is built to be run on Calypso by default so either calypso.json or calypso-testnet.json will be found in every deployment.
This will always be the side where the NFT can be transferred.