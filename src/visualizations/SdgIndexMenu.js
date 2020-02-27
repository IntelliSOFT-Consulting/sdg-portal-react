import React from 'react';
import PieMenu, { Slice } from 'react-pie-menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Container, Row, Col
  } from "reactstrap";
  import Header from '../components/header';
import { PieCenter } from 'react-pie-menu/dist/index.prod';

function SdgIndexMenu( {x, y}) {
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
    const Center = () =>(
        <PieCenter>
             <img alt="..." src={require("../assets/img/sdgs_icons/E_SDG_Icons-00.jpg")}>
             </img>
        </PieCenter>
    )

      return(
        <>
        <Header></Header>
        <Container className="pt-3">
            <Row>
                <Col>
                </Col>
                <Col>
                    <PieMenu 
                        radius='250px' centerRadius='40px' Center={Center}>
                        { 
                            sdgs.map(function(sdg, index){
                                let  imgSrc = images(`./${sdg.image}.jpg`);
                                let sdgNumber = index + 1;
                                let url = "Sdgs/Sdg_" + sdgNumber;
                                return <Slice key={index}>
                                            <p> {sdgNumber} </p>
                                                {/* <img  alt="..." src={ imgSrc }></img> */}
                                            
                                        </Slice>
                        })}

                    </PieMenu>
                </Col>
            </Row>
           
        </Container>
       
        </>
      );
    }
  
export default SdgIndexMenu;