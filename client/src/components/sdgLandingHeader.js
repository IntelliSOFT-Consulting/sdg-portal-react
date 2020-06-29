import React from "react";
import {Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';

// reactstrap components
import { Navbar,Nav, } from "reactstrap";

class SsdgLandingHeader extends React.Component{
    componentDidMount(){

    }
    render(){
        return (
            <> 
            <header className="header-global sdg-landing-header">
            <Navbar>
               
                    <Link to="/" className="navbar-brand">
                        <img alt="..." src={require("../assets/img/brand/logo.png")}></img>
                    </Link>   
               
                <Nav className="about-title">
                <h5 className="sdg-index-title">Select a goal to view Africa's progress and linked views</h5>
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

export default SsdgLandingHeader;








