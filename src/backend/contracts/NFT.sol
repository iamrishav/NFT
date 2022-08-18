// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFT is ERC721URIStorage {
    uint public mtokenCount;
    constructor() ERC721("DApp NFT", "DAPP"){}
    function mint(string memory _tokenURI) external returns(uint) {
        mtokenCount ++;
        _safeMint(msg.sender, mtokenCount);
        _setTokenURI(mtokenCount, _tokenURI);
        return(mtokenCount);
    }
}