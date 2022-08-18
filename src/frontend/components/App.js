import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ethers } from "ethers"
import { useState } from 'react'
import { Spinner } from 'react-bootstrap'

import MarketplaceAbi from '../contractsData/Marketplace.json'
import MarketplaceAddress from '../contractsData/Marketplace-address.json'
import NFTAbi from '../contractsData/NFT.json'
import NFTAddress from '../contractsData/NFT-address.json'

import MyPurchases from './MyPurchasesNFT.js'
import MyNavigation from './Navbar';
import MyListedItems from './MyItemsNFT.js'
import Home from './Home.js'
import Create from './CreateNFT.js'

import './App.css';
import lightBackgroundImage from './photo-1624280433509-b01afeaf68e5.avif'
// src\frontend\components\ricardo-l-2bCEHNTW324-unsplash.jpg
// D:\IIITD\Summer\BlockChain\NFT\src\frontend\components\photo-1624280433509-b01afeaf68e5.avif

function App() {
  const [myNft, setNFT] = useState({})
  const [myMarket, setMarketplace] = useState({})
  const [loading, setLoading] = useState(true)
  const [account, setAccount] = useState(null)
  
  // MetaMask Login/Connect
  const myHandler = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0])
    // Get provider from Metamask, and Setting signer
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()

    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload();
    })

    window.ethereum.on('accountsChanged', async function (accounts) {
      setAccount(accounts[0])
      await myHandler()
    })

    loadContracts(signer)
  }
  const loadContracts = async (signer) => {
    // Get deployed copies of contracts
    const myMarket = new ethers.Contract(MarketplaceAddress.address, MarketplaceAbi.abi, signer)
    setMarketplace(myMarket)
    const myNft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer)
    setNFT(myNft)
    setLoading(false)
  }

  return (
    <BrowserRouter>
      <div className="App lightBackgroundImage" > 
      {/* style={{  backgroundImage: `url(${lightBackgroundImage})`}}> */}
        <>
          <MyNavigation myHandler={myHandler} account={account} />
        </>
        <div>
          {loading ? (
            <div style={{ alignItems: 'center', minHeight: '80vh', display: 'flex', justifyContent: 'center' }}>
              <Spinner style={{ display: 'flex' }} animation="border" />
              <p className='mx-3 my-0' style={{color:"white"}} >Awaiting Metamask Connection...</p>
            </div>
          ) : (
            <Routes>
              <Route path="/" element={
                <Home myMarket={myMarket} myNft={myNft} />
              } />
              <Route path="/create" element={
                <Create myMarket={myMarket} myNft={myNft} />
              } />
              <Route path="/my-listed-items" element={
                <MyListedItems myMarket={myMarket} myNft={myNft} account={account} />
              } />
              <Route path="/my-purchases" element={
                <MyPurchases myMarket={myMarket} myNft={myNft} account={account} />
              } />
            </Routes>
          )}
        </div>
      </div>
    </BrowserRouter>

  );
}

export default App;
