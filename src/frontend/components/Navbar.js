import { Link } from "react-router-dom";
import iiitdIcon from './style1colorsmall.png'
import { Button, Container, Navbar, Nav } from 'react-bootstrap'

const MyNavigation = ({ myHandler, account }) => {
    return (
        <Navbar style={{ backgroundColor: "#666" }}>
            <Container>
                <Navbar.Brand href="https://www.iiitd.ac.in/">
                    <img src={iiitdIcon}  height="40" width="80" /> Marketplace Of IIITD
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/create">Create</Nav.Link>
                        <Nav.Link as={Link} to="/my-listed-items">My Listed Items</Nav.Link>
                        <Nav.Link as={Link} to="/my-purchases">My Purchases</Nav.Link>
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