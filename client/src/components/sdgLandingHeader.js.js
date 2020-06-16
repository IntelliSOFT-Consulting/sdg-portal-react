import React from "react";
import {
     BrowserRouter as Router, 
     Link
} from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';

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

class AboutHeader extends React.Component{
    componentDidMount(){

    }
    render(){
        return (
            <> 
            <header className="header-global about-header">
            <Navbar>
                <NavbarBrand>
                    <Link to="/">
                        <img alt="..." src={require("../assets/img/brand/logo.png")}></img>
                    </Link>   
                </NavbarBrand>
                <Nav className="about-title">
                <h5 className="display-3 mb-4 mt-2 text-center">The SDG and Agenda 2063 Data Portal for Africa</h5>
                </Nav>
                
                <Menu right>
                    <Link to="/" className="text-white">HOME</Link> 
                    <Link to="/SdgLanding" className="text-white">SDGs</Link>
                    <Link to="/Dashboard" className="text-white">DASHBOARD</Link>
                    <Link to="/CountryProfile" className="text-white">COUNTRY PROFILE</Link>
                    <Link to="/A2063Landing" className="text-white">AGENDA 2063</Link>
                    <Link to="/About" className="text-white">ABOUT US</Link>
                    <Link to="/Faqs" className="text-white">FAQs</Link>
                    <Link to="/DataUpload" className="text-white">ADMIN</Link>
                </Menu>
            </Navbar>
            </header> 
          
            </>
        );
    }
}

export default AboutHeader;







