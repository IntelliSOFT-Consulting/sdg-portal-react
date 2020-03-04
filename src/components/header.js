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

class Header extends React.Component{
    componentDidMount(){

    }
    render(){
        return (
            <> 
            <header className="header-global">
            <NavbarBrand>
                <Link to="/">
                    <img alt="..." src={require("../assets/img/brand/logo_white.png")}></img>
                </Link>   
            </NavbarBrand>
               
            <Menu right>
                <Link to="/" className="text-white">HOME</Link> 
                <Link to="/Sdgs" className="text-white">SDGs</Link>
                <Link to="/Dashboard" className="text-white">DASHBOARD</Link>
                <Link to="/CountryProfile" className="text-white">COUNTRY PROFILE</Link>
                <Link to="/Agenda2063" className="text-white">AGENDA 2063</Link>
                <Link to="/About" className="text-white">ABOUT US</Link>
                <Link to="/Faqs" className="text-white">FAQs</Link>
            </Menu>
            </header> 
          
            </>
        );
    }
}

export default Header;