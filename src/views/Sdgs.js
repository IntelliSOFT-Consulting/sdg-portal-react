import React from "react";
import Footer from "../components/footer";

import {
    Card, 
    CardImg,
    Row,
    Col
} from "reactstrap";

class Sdgs extends React.Component {
    render(){
        var images = require.context('../assets/img/sdg_icons', true);
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
            },{
                id:18,
                image: "E_SDG_Icons-18"
            }
            
        ];

        return(
            <>
             <main className="sdg">
                 <div className="container">
                 <Row>
                    {sdgs.map(function(sdg, index){
                        let  imgSrc = images(`./${sdg.image}.jpg`)
                        return <Col md="2">
                                         <CardImg key={index} alt="..." src={ imgSrc }></CardImg>     
                                    
                                </Col>
                    })}
                 </Row>
                 </div>
                 
                    
            </main>
            <Footer></Footer>
            </>
        )
    }
}

export default Sdgs;