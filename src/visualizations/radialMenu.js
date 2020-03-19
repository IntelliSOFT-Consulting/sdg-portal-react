import React from "react";
import $ from 'jquery';
import RadialMenu from "react-radial-menu"
import centerImage from '../assets/img/a2063_icons/white.png'
import { Container } from 'reactstrap'


function SdgLandingMenu(){
        const items = [
            {"href":"http://www.facebook.com", "image":"url(assets/img/a2063_icons/Aspiration_1.png)"},
            {"href":"http://www.reddit.com", "image":"url(examples/dist/images/social/reddit.png)"},
            {"href":"http://www.flickr.com", "image":"url(examples/dist/images/social/flickr.png)"},
            {"href":"http://www.google.com", "image":"url(examples/dist/images/social/googleplus.png)"},
            {"href":"http://www.linkedin.com", "image":"url(examples/dist/images/social/linkedin.png)"},
            {"href":"http://www.twitter.com", "image":"url(examples/dist/images/social/twitter.png)"},
            {"href":"http://www.twitter.com", "image":"url(examples/dist/images/social/twitter.png)"}
        ];
        
        const center = {
            "image": `url(${centerImage})`
        };

        const images = require.context('../assets/img/a2063_icons', true);
        const agenda2063 = [{
                    id :1,
                    image  : "Aspirations_1_0",
                    image2 : "Aspirations_1_hover",
                    iconSmallHover : "Aspirations1_hover",
                    iconSmall : "Aspirations1",
                    iconSquare : "Aspirations_icons_1_Integrated_Africa",
                    iconSquareHover : "Aspirations_icons_1_Integrated_Africa_hover",
                    color: [241, 90, 46]
                },{
                    id:2,
                    image  : "Aspirations_2_0",
                    image2 : "Aspirations_2_hover",
                    iconSmallHover : "Aspirations2_hover",
                    iconSmall : "Aspirations2",
                    iconSquare : "Aspirations_icons_2_Integrated_Africa",
                    iconSquareHover : "Aspirations_icons_2_Integrated_Africa_hover",
                    color: [69, 86, 164]
                },{
                    id:3,
                    image  : "Aspirations_3_0",
                    image2 : "Aspirations_3_hover",
                    iconSmallHover : "Aspirations3_hover",
                    iconSmall : "Aspirations3",
                    iconSquare : "Aspirations_icons_3_Integrated_Africa",
                    iconSquareHover : "Aspirations_icons_3_Integrated_Africa_hover",
                    color: [143, 63, 152]
                },{
                    id:4,
                    image  : "Aspirations_4_0",
                    image2 : "Aspirations_4_hover",
                    iconSmallHover : "Aspirations4_hover",
                    iconSmall : "Aspirations4",
                    iconSquare : "Aspirations_icons_4_Integrated_Africa",
                    iconSquareHover : "Aspirations_icons_4_Integrated_Africa_hover",
                    color: [3, 152, 136]
                },{
                    id:5,
                    image: "Aspirations_5_0",
                    image2 : "Aspirations_5_hover",
                    iconSmallHover : "Aspirations5_hover",
                    iconSmall : "Aspirations5",
                    iconSquare : "Aspirations_icons_5_Integrated_Africa",
                    iconSquareHover : "Aspirations_icons_5_Integrated_Africa_hover",
                    color: [251, 193, 25]
                },{
                    id:6,
                    image: "Aspirations_6_0",
                    image2 : "Aspirations_6_hover",
                    iconSmallHover : "Aspirations6_hover",
                    iconSmall : "Aspirations6",
                    iconSquare : "Aspirations_icons_6_Integrated_Africa",
                    iconSquareHover : "Aspirations_icons_6_Integrated_Africa_hover",
                    color: [232, 32, 101]
                },{
                    id:7,
                    image: "Aspirations_7_0",
                    image2 : "Aspirations_7_hover",
                    iconSmallHover : "Aspirations7_hover",
                    iconSmall : "Aspirations7",
                    iconSquare : "Aspirations_icons_7_Integrated_Africa",
                    iconSquareHover : "Aspirations_icons_7_Integrated_Africa_hover",
                    color: [84, 37, 60]
                }
        
        ];

        const a2063Arr = []
 
        agenda2063.map(function(a2063, index){
                let  imgSrc = images(`./${a2063.image}.png`);
                let  imgHover = images(`./${a2063.image2}.png`);

                let  iconSquare = images(`./${a2063.iconSquare}.png`);
                let  iconSquareHover = images(`./${a2063.iconSquareHover}.png`);

                let  iconSmall = images(`./${a2063.iconSmall}.png`);
                let  iconSmallHover = images(`./${a2063.iconSmallHover}.png`);
                a2063Arr.push({
                    href: "/Agenda2063",
                    image: `url(${imgSrc})`
                })
        })

        // const {items, center} = this.props
        return <div className="radial-outside-container">
            <div className="radial-menu-content">
                     <div className="radial-menu-container">
                        <RadialMenu
                        items={a2063Arr}
                        center={center}  distance={100} itemsSize={130}/>
                    </div>
                </div>
        </div>
        
        
       
        
       
      
}

export default SdgLandingMenu;
