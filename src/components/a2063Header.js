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

function Header( {onActiveA2063Changed} ){

    const images = require.context('../assets/img/a2063_icons', true);
    const agenda2063 = [{
            id :1,
            image  : "Aspirations_1_0",
            image2 : "Aspirations_1_hover",
            image3 : "Aspiration_1",
            iconSquare : "Aspirations_icons_1_Integrated_Africa",
            iconSquareHover : "Aspirations_icons_1_Integrated_Africa_hover"
        },{
            id:2,
            image  : "Aspirations_2_0",
            image2 : "Aspirations_2_hover",
            image3 : "Aspiration_2",
            iconSquare : "Aspirations_icons_2_Integrated_Africa",
            iconSquareHover : "Aspirations_icons_2_Integrated_Africa_hover"
        },{
            id:3,
            image  : "Aspirations_3_0",
            image2 : "Aspirations_3_hover",
            image3 : "Aspiration_3",
            iconSquare : "Aspirations_icons_3_Integrated_Africa",
            iconSquareHover : "Aspirations_icons_3_Integrated_Africa_hover"
        },{
            id:4,
            image  : "Aspirations_4_0",
            image2 : "Aspirations_4_hover",
            image3 : "Aspiration_4",
            iconSquare : "Aspirations_icons_4_Integrated_Africa",
            iconSquareHover : "Aspirations_icons_4_Integrated_Africa_hover"
        },{
            id:5,
            image: "Aspirations_5_0",
            image2 : "Aspirations_5_hover",
            image3 : "Aspiration_5",
            iconSquare : "Aspirations_icons_5_Integrated_Africa",
            iconSquareHover : "Aspirations_icons_5_Integrated_Africa_hover"
        },{
            id:6,
            image: "Aspirations_6_0",
            image2 : "Aspirations_6_hover",
            image3 : "Aspiration_6",
            iconSquare : "Aspirations_icons_6_Integrated_Africa",
            iconSquareHover : "Aspirations_icons_6_Integrated_Africa_hover"
        },{
            id:7,
            image: "Aspirations_7_0",
            image2 : "Aspirations_7_hover",
            image3 : "Aspiration_7",
            iconSquare : "Aspirations_icons_7_Integrated_Africa",
            iconSquareHover : "Aspirations_icons_7_Integrated_Africa_hover"
        }
        
    ];

    const [activeA2063, setActiveA2063] = useState(0);

    useEffect(() =>{
       // console.log(activeSdg);
    })

    const handleA2063Change = (e) => {
        setActiveA2063(e.currentTarget.value);
        onActiveA2063Changed(e.currentTarget.value);
    }

        return (
            <> 
            <header className="header-global agenda2063Header">
                <Navbar>
                    <NavbarBrand>
                        <Link to="/">
                            <img alt="..." src={require("../assets/img/brand/logo.png")}></img>
                        </Link>   
                    </NavbarBrand>
                    <Nav className="a2063-icon-padding ">
                        <Col></Col>
                        <Col></Col>
                        { 
                        agenda2063.map(function(a2063, index){
                                let  imgSrc = images(`./${a2063.image}.png`);
                                let  imgHover = images(`./${a2063.image2}.png`);
                                let  imgClear = images(`./${a2063.image3}.png`);
                                let  iconSquare = images(`./${a2063.iconSquare}.png`);
                                let  iconSquareHover = images(`./${a2063.iconSquareHover}.png`);

                                const backgroundHoverStyles = {
                                    backgroundImage: `url(${iconSquareHover})`,
                                    width: '90px',
                                    height: '90px',
                                    backgroundPosition : 'center'

                                }
                                const backgroundStyles = {
                                    backgroundImage: `url(${iconSquare})`,
                                    width: '90px',
                                    height: '90px',
                                    backgroundPosition : 'center'
                                }
                                let sdgNumber = index + 1;
                                let url = "Sdgs/Sdg_" + sdgNumber;
                                return <Col key={index}>
                                            
                                            <Button style={ backgroundHoverStyles } onClick={handleA2063Change} value={index} className={ activeA2063 == index ? 'active': '' }>
                                                {/* <CardImg alt="..." src={ imgSrc }></CardImg> */}
                                              {  console.log(backgroundStyles)}
                                                <img src={iconSquare} ></img>
                                            </Button>
                                        </Col>
                        })}
                        <Col></Col>
                        <Col></Col>
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