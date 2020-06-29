import React from "react";
import { BrowserRouter, Link} from 'react-router-dom';

// reactstrap components
import {
    UncontrolledCollapse,
    NavbarBrand,
    Navbar,
    NavItem,
    Nav,
    Row,
    Col
  } from "reactstrap";

  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class HomeHeader extends React.Component{
    componentDidMount(){

    }
    render(){
        return (
            <> 
            <header className=" home-header">
                <Navbar className="navbar-main navbar-transparent navbar-light headroom" expand="lg" id="navbar-main">
                    <div className="container-fluid">
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
                                    <Link to="/" className="btn btn-header btn-icon text-white">
                                        <span className="btn-inner--icon">
                                            <img className="icon mb-1" alt=".." src={require('../assets/img/home_icons/Home.png')}></img>
                                        </span>
                                        <br></br>
                                        <span className="nav-link-inner--text ml-1">HOME</span>
                                    </Link>
                                </NavItem>
                                <NavItem>
                                    <Link to="/SdgLanding" className="btn btn-header btn-icon text-white">
                                        <img className="icon mb-1" alt=".." src={require('../assets/img/home_icons/Sdg.png')}></img>
                                        <br></br>
                                        <span className="nav-link-inner--text ml-1">SDGs</span>
                                    </Link>
                                </NavItem>
                                <NavItem>
                                    <Link to="/Dashboard" className="btn btn-header btn-icon text-white">
                                        <img className="icon mb-1" alt=".." src={require('../assets/img/home_icons/Dashboard.png')}></img>
                                        <br></br>
                                        <span className="nav-link-inner--text ml-1">DASHBOARD</span>
                                    </Link>
                                </NavItem>
                                <NavItem>
                                    <Link to="/CountryProfile" className="btn btn-header btn-icon text-white">
                                        <img className="icon mb-1" alt=".." src={require('../assets/img/home_icons/CountryProfile.png')}></img>
                                            <br></br>
                                            <span className="nav-link-inner--text ml-1">COUNTRY <br></br> PROFILE</span>
                                    </Link>
                                </NavItem>
                                <NavItem>
                                    <Link to="/A2063Landing" className="btn btn-header btn-icon text-white">
                                        <img className="icon mb-1" alt=".." src={require('../assets/img/home_icons/A2063.png')}></img>
                                        <br></br>
                                        <span className="nav-link-inner--text ml-1">AGENDA <br></br> 2063</span>
                                    </Link>
                                </NavItem>
                                <NavItem>
                                    <Link to="/About" className="btn btn-header btn-icon text-white">
                                        <img className="icon mb-1" alt=".." src={require('../assets/img/home_icons/AboutUs.png')}></img>
                                        <br></br>
                                        <span className="nav-link-inner--text ml-1">ABOUT US</span>
                                    </Link>
                                </NavItem>
                                <NavItem>
                                    <Link to="/Faqs" className="btn btn-header btn-icon text-white">
                                        <img className="icon mb-1" alt=".." src={require('../assets/img/home_icons/FAQs.png')}></img>
                                        <br></br>
                                        <span className="nav-link-inner--text ml-1">FAQs</span>
                                    </Link>
                                </NavItem>
                                <NavItem>
                                    <Link to="/DataUpload" className="btn btn-header btn-icon text-white">
                                    <FontAwesomeIcon icon={['fas', 'user-circle']} size="175x" color="black"/>
                                        <br></br>
                                        <span className="nav-link-inner--text ml-1">ADMIN</span>
                                    </Link>
                                </NavItem>
                            </Nav>
                        </UncontrolledCollapse>
                    </div>
                </Navbar>
            </header> 
            </>
        );
    }
}

export default HomeHeader;