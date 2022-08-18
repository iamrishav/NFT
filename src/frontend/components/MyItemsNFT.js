import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Row, Col, Card, Button } from 'react-bootstrap'

function renderSoldItems(items) {
  return (
    <>
      <h2 style={{color:"white"}}>Sold</h2>
      <Row xs={1} md={2} lg={4} className="g-4 py-3">
        {items.map((item, idx) => (
          <Col key={idx} className="overflow-hidden">
            <Card style={{padding: "12px"}}>
              <Card.Img variant="top" src={item.image}  style={{height:"300px"}}/>
              <Card.Footer>
                For {ethers.utils.formatEther(item.totalPrice)} ETH - Recieved {ethers.utils.formatEther(item.price)} ETH
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default function MyListedItems({ myMarket, myNft, account }) {
  const [loading, setLoading] = useState(true)
  const [listedItems, setListedItems] = useState([])
  const [soldItems, setSoldItems] = useState([])
  const loadListedItems = async () => {
    const itemCount = await myMarket.itemCount()
    let listedItems = []
    let soldItems = []
    for (let indx = 1; indx <= itemCount; indx++) {
      const i = await myMarket.items(indx)
      if (i.seller.toLowerCase() === account) {
        const uri = await myNft.tokenURI(i.tokenId)
        const response = await fetch(uri)
        const metadata = await response.json()
        
        const totalPrice = await myMarket.getTotalPrice(i.itemId)
        
        let item = {
          totalPrice,
          price: i.price,
          itemId: i.itemId,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image
        }
        listedItems.push(item)
        if (i.sold) soldItems.push(item)
      }
    }
    setLoading(false)
    setListedItems(listedItems)
    setSoldItems(soldItems)
  }


  useEffect(() => {
    loadListedItems()
  }, [])
  if (loading) return (
    <main style={{ padding: "1rem 0", color: "white"}}>
      <h2>Loading...</h2>
    </main>
  )
  return (
    <div className="flex justify-center">
      {listedItems.length > 0 ?
        <div className="px-5 py-3 container" >
            <h2 style={{color:"white"}} >Listed</h2>
          <Row xs={1} md={2} lg={4} className="g-4 py-3">
            {listedItems.map((item, idx) => (
              <Col key={idx} className="overflow-hidden">
                <Card style={{padding: "12px"}}>
                  <Card.Img variant="top" src={item.image}  style={{height:"300px"}}/>
                  <Card.Footer>{ethers.utils.formatEther(item.totalPrice)} ETH </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
            {soldItems.length > 0 && renderSoldItems(soldItems)}
        </div>
        : (
          <main style={{ padding: "1rem 0", color:"white"}}>
            <h2>No listed assets</h2>
          </main>
        )}
    </div>
  );
}