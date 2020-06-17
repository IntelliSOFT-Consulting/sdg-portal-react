import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';

// reactstrap components
import { NavbarBrand, Navbar, Nav, Col, CardImg, Button} from "reactstrap";

function Header( {onActiveSdgChanged} ){

    const images = require.context('../assets/img/sdgs_icons', true);
    const sdgs = [
        {
            id :0,
            image : "E_SDG_Icons-00"
        },{
            id :1,
            image : "E_SDG_Icons-01"
        },{
            id:2,
            image : "E_SDG_Icons-02"
        },{
            id:3,
            image: "E_SDG_Icons-03"
        },{
            id:4,
            image: "E_SDG_Icons-04"
        },{
            id:5,
            image: "E_SDG_Icons-05"
        },{
            id:6,
            image: "E_SDG_Icons-06"
        },{
            id:7,
            image: "E_SDG_Icons-07"
        },{
            id:8,
            image: "E_SDG_Icons-08"
        },{
            id:9,
            image: "E_SDG_Icons-09"
        },{
            id:10,
            image: "E_SDG_Icons-10"
        },{
            id:11,
            image: "E_SDG_Icons-11"
        },{
            id:12,
            image: "E_SDG_Icons-12"
        },{
            id:13,
            image: "E_SDG_Icons-13"
        },{
            id:14,
            image: "E_SDG_Icons-14"
        },{
            id:15,
            image: "E_SDG_Icons-15"
        },{
            id:16,
            image: "E_SDG_Icons-16"
            } ,{
            id:17,
            image: "E_SDG_Icons-17"
        }
        
    ];
    const [activeSdg, setActiveSdg] = useState(0);

    const handleSdgChange = (e) => {
        setActiveSdg(e.currentTarget.value);
        onActiveSdgChanged(e.currentTarget.value);
    }

        return (
            <> 
            <header className="header-global sdgsHeader">
                <Navbar>
                <Link to="/" className="navbar-brand">
                        <img alt="..." src={require("../assets/img/brand/logo.png")}></img>
                    </Link>
                    <Nav className="sdg-icon-padding ">
                        { 
                        sdgs.map(function(sdg, index){
                                let  imgSrc = images(`./${sdg.image}.jpg`);
                                return <Col key={index}>
                                            <Button onClick={handleSdgChange} value={index} className={ parseInt(activeSdg) === index ? 'active': '' }>
                                                <CardImg  alt="..." src={ imgSrc }></CardImg>
                                            </Button>
                                </Col>
                        })}
                    </Nav>
                </Navbar>
          
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
            </header> 
          
            </>
        );
    
}

export default Header;