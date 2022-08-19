// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "hardhat/console.sol";

contract Marketplace is ReentrancyGuard {

    address payable public immutable maccountFee; 
    uint public immutable mpercentFee; 
    uint public itemCount; 

    struct Item {
        uint itemId;
        IERC721 nft;
        uint tokenId;
        uint price;
        address payable seller;
        bool sold;
    }

    mapping(uint => Item) public items;

    event Offered(
        uint itemId,
        address indexed nft,
        uint tokenId,
        uint price,
        address indexed seller
    );
    event Bought(
        uint itemId,
        address indexed nft,
        uint tokenId,
        uint price,
        address indexed seller,
        address indexed buyer
    );

    constructor(uint _mpercentFee) {
        maccountFee = payable(msg.sender);
        mpercentFee = _mpercentFee;
    }

    function makeItem(IERC721 _nft, uint _tokenId, uint _price) external nonReentrant {
        require(_price > 0, "Price must be greater than zero");
        itemCount ++;
        _nft.transferFrom(msg.sender, address(this), _tokenId);
        items[itemCount] = Item (
            itemCount,
            _nft,
            _tokenId,
            _price,
            payable(msg.sender),
            false
        );
        emit Offered(
            itemCount,
            address(_nft),
            _tokenId,
            _price,
            msg.sender
        );
    }

  

    function purchaseItem(uint _itemId) external payable nonReentrant {
        uint _totalPrice = mreturnTotalETH(_itemId);
        Item storage item = items[_itemId];
        require(_itemId > 0 && _itemId <= itemCount, "assests doesn't exist");
        require(msg.value >= _totalPrice, "not enough ether to cover assets price and marketplace fee");
        require(!item.sold, "assets already sold");
        item.seller.transfer(item.price);
        maccountFee.transfer(_totalPrice - item.price);
        item.sold = true;
        item.nft.transferFrom(address(this), msg.sender, item.tokenId);
        emit Bought(
            _itemId,
            address(item.nft),
            item.tokenId,
            item.price,
            item.seller,
            msg.sender
        );
    }
    function mreturnTotalETH(uint _itemId) view public returns(uint){
        return((items[_itemId].price*(100 + mpercentFee))/100);
    }
}
