import React, {useState, useEffect} from "react";
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
    Col,
    CardImg,
    Button
  } from "reactstrap";

function Header( {onActiveSdgChanged} ){

    const images = require.context('../assets/img/sdgs_icons', true);
    const sdgs = [
        
        {
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

    useEffect(() =>{
       // console.log(activeSdg);
    })

    const handleSdgChange = (e) => {
        setActiveSdg(e.currentTarget.value);
        onActiveSdgChanged(e.currentTarget.value);
    }

        return (
            <> 
            <header className="header-global sdgsHeader">
                <Navbar>
                    <NavbarBrand>
                        <Link to="/">
                            <img alt="..." src={require("../assets/img/brand/logo_white.png")}></img>
                        </Link>   
                    </NavbarBrand>
                    <Nav className="sdg-icon-padding ">
                        { 
                        sdgs.map(function(sdg, index){
                                let  imgSrc = images(`./${sdg.image}.jpg`);
                                let sdgNumber = index + 1;
                                let url = "Sdgs/Sdg_" + sdgNumber;
                                return <Col key={index}>
                                            <Button onClick={handleSdgChange} value={index} className={ activeSdg == index ? 'active': '' }>
                                                <CardImg  alt="..." src={ imgSrc }></CardImg>
                                            </Button>
                                </Col>
                        })}
                    </Nav>
                </Navbar>
          
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

export default Header;