import { Link } from "react-router-dom";
import iiitdIcon from './style1colorsmall.png'
import { Button, Container, Navbar, Nav } from 'react-bootstrap'

const MyNavigation = ({ myHandler, account }) => {
    return (
        <Navbar className="text-white" style={{ backgroundColor: "#4A148C" }}>
            <Container>
                <Navbar.Brand href="https://www.iiitd.ac.in/">
                    <img src={iiitdIcon}  height="40" width="80"/><span  style={{fontSize: "25px", color:"white", margin:"12px"}}>MαɾƙҽƚPʅαƈҽ</span> 
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto mx-5" fill variant="tabs" size="lg">
                        <Nav.Item><Nav.Link className="px-5 py-3" style={{color:"white"}} as={Link} to="/">ℍ𝕠𝕞𝕖</Nav.Link></Nav.Item>
                        
                        <Nav.Item><Nav.Link className="px-5 py-3" style={{color:"white"}} as={Link} to="/create">ℂ𝕣𝕖𝕒𝕥𝕖</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link className="px-5 py-3" style={{color:"white"}} as={Link} to="/my-listed-items">𝕄𝕪 𝕃𝕚𝕤𝕥𝕖𝕕 𝕀𝕥𝕖𝕞𝕤</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link className="px-5 py-3" style={{color:"white"}} as={Link} to="/my-purchases">𝕄𝕪 ℙ𝕦𝕣𝕔𝕙𝕒𝕤𝕖𝕤</Nav.Link></Nav.Item>
                    </Nav>

                    <Nav>
                        {account ? (
                            <Nav.Link
                                rel="noopener noreferrer"
                                target="_blank"
                                href={`https://etherscan.io/address/${account}`}
                                            
                                className="nav-button button mx-3 btn-sm">
                                
                                <Button variant="outline-light"> {account.slice(0, 5) + '...' + account.slice(38, 42)} </Button>
                            </Nav.Link>

                        ) : (
                            <Button onClick={myHandler} variant="outline-light">Connect Wallet</Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )

}

export default MyNavigation;