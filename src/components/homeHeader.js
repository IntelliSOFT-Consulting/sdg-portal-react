import React from "react";
import { BrowserRouter, Link} from 'react-router-dom'

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

class HomeHeader extends React.Component{
    componentDidMount(){

    }
    render(){
        return (
            <> 
            <header className="header-global">
                <Navbar className="navbar-main navbar-transparent navbar-light headroom" expand="lg" id="navbar-main">
                    <Container>
                        
                        <NavbarBrand>
                            <img alt="..." src={require("../assets/img/brand/logo.png")}></img>
                        </NavbarBrand>
                        <button className="navbar-toggler" id="navbar_global">
                            <span className="navbar-toggler-icon" />
                        </button>

                        <UncontrolledCollapse navbar toggler="#navbar_global">
                            <div className="navbar-collapse-header">
                                <Row>
                                    <Col className="collapse-brand" xs="6">
                                    <BrowserRouter>
                                    <Link to="/">
                                        <img
                                        alt="..."
                                        src={require("../assets/img/brand/logo.png")}
                                        />
                                    </Link>
                                    </BrowserRouter>
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
                                    <Button className="btn-icon" color="warning" href="#!" target="_blank">
                                            <span className="btn-inner--icon"><i className="fa fa-home mr-2" /></span>
                                            <br></br>
                                            <span className="nav-link-inner--text ml-1">Home</span>
                                        </Button>
                                </NavItem>
                                <NavItem>
                                    <Button className="btn-icon" color="warning" href="#!" target="_blank">
                                            <span className="btn-inner--icon"><i className="fa fa-cloud-download mr-2" /></span>
                                            <br></br>
                                            <span className="nav-link-inner--text ml-1">SDGS</span>
                                        </Button>
                                </NavItem>
                                <NavItem>
                                    <Button className="btn-icon" color="warning" href="#!" target="_blank">
                                            <span className="btn-inner--icon"><i className="fa fa-table mr-2" /></span>
                                            <br></br>
                                            <span className="nav-link-inner--text ml-1">Dashboard</span>
                                        </Button>
                                </NavItem>
                                <NavItem>
                                    <Button className="btn-icon" color="warning" href="#!" target="_blank">
                                            <span className="btn-inner--icon"><i className="fa fa-flag mr-2" /></span>
                                            <br></br>
                                            <span className="nav-link-inner--text ml-1">Country <br></br> Profiles</span>
                                        </Button>
                                </NavItem>
                                <NavItem>
                                    <Button className="btn-icon" color="warning" href="#!" target="_blank">
                                            <span className="btn-inner--icon"><i className="fa fa-globe mr-2" /></span>
                                            <br></br>
                                            <span className="nav-link-inner--text ml-1">Agenda <br></br> 2063</span>
                                        </Button>
                                </NavItem>
                                <NavItem>
                                    <Button className="btn-icon" color="warning" href="#!" target="_blank">
                                            <span className="btn-inner--icon"><i className="fa fa-info mr-2" /></span>
                                            <br></br>
                                            <span className="nav-link-inner--text ml-1">About us</span>
                                        </Button>
                                </NavItem>
                                <NavItem>
                                    <Button className="btn-icon" color="warning" href="#!" target="_blank">
                                            <span className="btn-inner--icon"><i className="fa fa-question mr-2" /></span>
                                            <br></br>
                                            <span className="nav-link-inner--text ml-1">FAQS</span>
                                        </Button>
                                </NavItem>
                            </Nav>
                        </UncontrolledCollapse>
                    </Container>
                </Navbar>
            </header> 
            </>
        );
    }
}

export default HomeHeader;