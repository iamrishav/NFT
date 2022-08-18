import { useEffect, useState } from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import { ethers } from "ethers"

export default function MyPurchases({ myMarket, myNft, account }) {
  const [loading, setLoading] = useState(true)
  const [myBuyings, setMyBuyings] = useState([])
  const loadPurchasedItems = async () => {

    const filter =  myMarket.filters.Bought(null,null,null,null,null,account)
    const results = await myMarket.queryFilter(filter)

    const myBuyings = await Promise.all(results.map(async uniqueI => {
      // fetch arguments from each result, get uri url from myNft contract, use uri to fetch the myNft metadata stored on ipfs 
      uniqueI = uniqueI.args
      const uri = await myNft.tokenURI(uniqueI.tokenId)
      const response = await fetch(uri)
      const metadata = await response.json()
      
      const totalPrice = await myMarket.getTotalPrice(uniqueI.itemId)
      let purchasedItemBundle = {
        totalPrice,
        price: uniqueI.price,
        itemId: uniqueI.itemId,
        name: metadata.name,
        description: metadata.description,
        image: metadata.image
      }
      return purchasedItemBundle
    }))

    setLoading(false)
    setMyBuyings(myBuyings)
  }

  useEffect(() => {
    loadPurchasedItems()
  }, [])

  if (loading) return (
    <main style={{ padding: "1rem 0", color: "white"}}>
      <h2>Your Data is Loading...</h2>
    </main>
  )
  return (
    <div className="justify-center flex" style={{height: "1000px"}}>
      {myBuyings.length > 0 ?
        <div className="container px-5">
          <Row className="g-4 py-5" xs={1} lg={4} md={2}>
            {myBuyings.map((item, idx) => (
              <Col className="overflow-hidden" key={idx}>
                <Card style={{padding: "12px"}}>
                  <Card.Img src={item.image} style={{height:"300px"}}/>
                  <Card.Footer>{ethers.utils.formatEther(item.totalPrice)} ETH</Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
        : (
          <main style={{ padding: "3rem 0", color: "white", height: "500px"}}>
            <h2 style={{ margin: "130px"}} >No Buyings till now</h2>
          </main>
        )}
    </div>
  );
}