import { useEffect, useState } from 'react'
import { Card, Button, Row, Col } from 'react-bootstrap'
import { ethers } from "ethers"

const Home = ({ myMarket, myNft }) => {
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])
  const loadMarketplaceItems = async () => {
    const itemCount = await myMarket.itemCount()
    let items = []
    for (let i = 1; i <= itemCount; i++) {
      const item = await myMarket.items(i)
      if (!item.sold) {
        const uri = await myNft.tokenURI(item.tokenId)
        const response = await fetch(uri)
        const metadata = await response.json()
        const totalPrice = await myMarket.getTotalPrice(item.itemId)
        items.push({
          totalPrice,
          itemId: item.itemId,
          seller: item.seller,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image
        })
      }
    }
    setLoading(false)
    setItems(items)
  }

  const buyMarketItem = async (item) => {
    await (await myMarket.purchaseItem(item.itemId, { value: item.totalPrice })).wait()
    loadMarketplaceItems()
  }

  useEffect(() => {
    loadMarketplaceItems()
  }, [])
  if (loading) return (
    <main style={{ padding: "1rem 0" }}>
      <h2 style={{color:"white"}} >Loading...</h2>
    </main>
  )
  return (
    <div className="flex justify-center">
      {items.length > 0 ?
        <div className="px-5 container">
          <Row xs={1} md={2} lg={4} className="g-4 py-5">
            {items.map((item, idx) => (
              <Col key={idx} className="overflow-hidden">
                <Card style={{padding: "12px"}}>
                  <Card.Img src={item.image} style={{height:"300px"}}/>
                  <Card.Body color="secondary">
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text style={{height:"60px"}}>
                      {item.description}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <div className='d-grid'>
                      <Button onClick={() => buyMarketItem(item)} variant="primary" size="lg" style={{backgroundColor: '#4A148C'}}>
                        Buy for {ethers.utils.formatEther(item.totalPrice)} ETH
                      </Button>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
        : (

          <main style={{ padding: "3rem 0", height: "500px", color: "white"}}>
            <h2 style={{margin: "180px"}}>You don't have any assets</h2>
          </main>
        )}
    </div>
  );
}
export default Home