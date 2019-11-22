import React from "react";
import {
     BrowserRouter as Router, 
     Link
} from 'react-router-dom'

// reactstrap components
import {
    UncontrolledCollapse,
    NavbarBrand,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    Container,
    Row,
    Col,
    Button
  } from "reactstrap";

class Header extends React.Component{
    componentDidMount(){

    }
    render(){
        return (
            <> 
            <header className="header-global">
                <Navbar className="navbar-main navbar-light" expand="lg" id="navbar-main">
        
                        <NavbarBrand>
                            <img alt="..." src={require("../assets/img/brand/logo_white.png")}></img>
                        </NavbarBrand>
                        <button className="navbar-toggler" id="navbar_global">
                            <span className="navbar-toggler-icon" />
                        </button>

                        <UncontrolledCollapse navbar toggler="#navbar_global">
                            <div className="navbar-collapse-header">
                                <Row>
                                    <Col className="collapse-brand" xs="6">
                                    <Router>
                                    <Link to="/">
                                        <img
                                        alt="..."
                                        src={require("../assets/img/brand/logo.png")}
                                        />
                                    </Link>
                                    </Router>
                                    </Col>
                                    <Col className="collapse-close" xs="6">
                                    <button className="navbar-toggler" id="navbar_global">
                                        <span />
                                        <span />
                                    </button>
                                    </Col>
                                </Row>
                            </div>
                          
                            <Nav className="ml-lg-auto" navbar>
                                <NavItem>
                                    <Button className="btn-icon" color="warning">
                                            <span className="nav-link-inner--text ml-1">
                                                <Link to="/" className="text-white">Home</Link>
                                            </span>
                                        </Button>
                                </NavItem>
                                <NavItem>
                                    <Button className="btn-icon" color="warning">
                                            <span className="nav-link-inner--text ml-1">
                                                <Link to="/Sdgs" className="text-white">SDGS</Link></span>
                                        </Button>
                                </NavItem>
                                <NavItem>
                                    <Button className="btn-icon" color="warning">
                                            <span className="nav-link-inner--text ml-1">
                                            <Link to="/Dashboard" className="text-white">Dashboard</Link>
                                            </span>
                                        </Button>
                                </NavItem>
                                <NavItem>
                                    <Button className="btn-icon" color="warning">
                                            <span className="nav-link-inner--text ml-1">
                                            <Link to="/CountryProfile" className="text-white">Country Profile</Link>
                                            </span>
                                        </Button>
                                </NavItem>
                                <NavItem>
                                    <Button className="btn-icon" color="warning">
                                            <span className="nav-link-inner--text ml-1">
                                            <Link to="/Agenda2063" className="text-white">Agenda 2063</Link>
                                            </span>
                                        </Button>
                                </NavItem>
                                <NavItem>
                                    <Button className="btn-icon" color="warning">
                                            <span className="nav-link-inner--text ml-1">
                                            <Link to="/About" className="text-white">About us</Link>
                                            </span>
                                        </Button>
                                </NavItem>
                                <NavItem>
                                    <Button className="btn-icon" color="warning">
                                            <span className="nav-link-inner--text ml-1">
                                            <Link to="/Faqs" className="text-white">FAQS</Link>
                                            </span>
                                        </Button>
                                </NavItem>
                            </Nav>
                          
                        </UncontrolledCollapse>
                  
                </Navbar>
            </header> 
            </>
        );
    }
}

export default Header;