# IIITD NFT Marketplace

## Marketplace Flow -
 - Seller mint Images as the NFT
 - Seller list the NFT in the MarketPlace
 - Payer can see and buy the NFT from the Marketplace

## Technology  & Tools

## frontEnd -
 - ReactJS (Javascript Framework)
 - Bootstrap (for CSS)
## BackEnd - 
 - Solidity - for smart contract
 - openzeppeling library - for smart contract standards  - ERC721
 - Hardhat - for local testing purpose
 - IPFS - for storing NFT

 ## how to run - 
1. Install all dependencies  - npm install
2. Create Infura account and make IPFS project, and fillin project ID and project secret in CreateNFT.js file
3. Run local blockchain using hardhat- npx hardhat node
4. Deploy smart contract on local host  -  npx hardhat run src/backend/scripts/deploy.js --network localhost
5. run project - npm run start

 ## Notes - 
[Self made notes on Blockchain and Etherium](https://drive.google.com/file/d/1wfgyhrt7d4XwMMGSxgEZPCk7J2szOrHk/view?usp=sharing)

 ## References - 
 [openzepplin ERC721 standards](https://docs.openzeppelin.com/contracts/4.x/api/token/erc721#ERC721)
 [Dapp university article](https://www.dappuniversity.com/articles/the-ultimate-ethereum-dapp-tutorial)
 [DAPP University Youtube](https://youtu.be/2bjVWclBD_s)

 ## Demo Images of the Platform -
 [Home Page](demoHome.png)
 [Create Page](democreate.png)
 [ListedItem Page](demoListedItems.png)
 [Purchase Page](demoPurchases.png)



