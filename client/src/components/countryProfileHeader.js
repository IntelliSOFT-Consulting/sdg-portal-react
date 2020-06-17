import React from "react";
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';

// reactstrap components
import { NavbarBrand, Navbar, Nav } from "reactstrap";

class CountryProfileHeader extends React.Component{
    componentDidMount(){
    }
    render(){
        return (
            <> 
            <header className="header-global country-profile-header">
            <Navbar>
                <NavbarBrand>
                    <Link to="/">
                        <img alt="..." src={require("../assets/img/brand/logo.png")}></img>
                    </Link>   
                </NavbarBrand>
                <Nav className="country-profile-title">
                <h5 className="display-3 mb-4 mt-2 text-center"> African Country Profiles</h5>
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

export default CountryProfileHeader;