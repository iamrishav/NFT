import { useState } from 'react'
import { ethers } from "ethers"
import { Row, Form, Button } from 'react-bootstrap'
import { Buffer } from 'buffer';

import { create as ipfsHttpClient } from 'ipfs-http-client'

const ipfsClient = require('ipfs-http-client');
// const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')
const projectId = '2DX9uuchX2X2lDLI2hKbbsIPqdX';
const projectSecret = 'bf8cf2c7b20982256992725c38a2be31';
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
const client = ipfsClient.create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
      authorization: auth,
  },
});

const Create = ({ myMarket, myNft }) => {
  const [price, setPrice] = useState(null)
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  
  const uploadToIPFS = async (event) => {
    event.preventDefault()
    const file = event.target.files[0]
    if (typeof file !== 'undefined') {
      try {
        const result = await client.add(file)
        console.log(result)
        setImage(`https://iiitd-nft.infura-ipfs.io/ipfs/${result.path}`)
      } catch (error){
        console.log("ipfs image upload error: ", error)
      }
    }
  }
  const createNFT = async () => {
    if (!image || !price || !name || !description) return
    try{
      const result = await client.add(JSON.stringify({image, price, name, description}))
      mintThenList(result)
    } catch(error) {
      console.log("ipfs uri upload error: ", error)
    }
  }
  const mintThenList = async (result) => {
    const uri = `https://iiitd-nft.infura-ipfs.io/ipfs/${result.path}`
    // mint nft, and generate tokenId of new myNft, approving maket to spend myNft, and adding myNft to myMarket
    await(await myNft.mint(uri)).wait()
    const id = await myNft.mtokenCount()
    
    await(await myNft.setApprovalForAll(myMarket.address, true)).wait()
    const listingPrice = ethers.utils.parseEther(price.toString())
    
    await(await myMarket.makeItem(myNft.address, id, listingPrice)).wait()
  }
  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <main role="main" className="col-lg-5 mx-auto" style={{ maxWidth: '1000px', height: "600px"}}>
          <div className="content mx-auto">
            <Row className="g-4 #CE93D8">
              <Form.Control type="file" name="file" onChange={uploadToIPFS} required  />

              <Form.Control onChange={(e) => setName(e.target.value)} size="lg" required type="text" placeholder="Name" />
              <Form.Control onChange={(e) => setDescription(e.target.value)} size="lg" required as="textarea" placeholder="Description" />
              <Form.Control onChange={(e) => setPrice(e.target.value)} size="lg" required type="number" placeholder="Price in ETH" />
              <div className="d-grid px-0">
                <Button onClick={createNFT} style={{backgroundColor: '#4A148C'}} size="lg">
                  Create & List NFT!
                </Button>
              </div>
              
            </Row>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Create