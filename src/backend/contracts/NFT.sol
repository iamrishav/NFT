// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFT is ERC721URIStorage {
    uint public mtokenCount;
    constructor() ERC721("IIITD NFT", "IIITD"){}
    function mint(string memory mtokenURI) external returns(uint) {
        mtokenCount ++;
        _safeMint(msg.sender, mtokenCount);
        _setTokenURI(mtokenCount, mtokenURI);
        return(mtokenCount);
    }
}