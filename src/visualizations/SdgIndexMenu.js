import React from 'react';
import PieMenu, { Slice } from 'react-pie-menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Container, Row, Col
  } from "reactstrap";
  import Header from '../components/header';
import { PieCenter } from 'react-pie-menu/dist/index.prod';
import * as styles from '../indexMenuStyles';
import { ThemeProvider } from 'styled-components';

function SdgIndexMenu( {x, y}) {
    const images = require.context('../assets/img/sdgs_icons', true);
    const sdgs = [{
            id :1,
            image : "E_SDG_Icons-01",
            color : "red" 
        },{
            id:2,
            image : "E_SDG_Icons-02",
            color : "mustard"
        },{
            id:3,
            image: "E_SDG_Icons-03",
            color : "kelly-green"
        },{
            id:4,
            image: "E_SDG_Icons-04",
            color : "dark-red"
        },{
            id:5,
            image: "E_SDG_Icons-05",
            color : "red-orange"
        },{
            id:6,
            image: "E_SDG_Icons-06",
            color : "bright-blue"
        },{
            id:7,
            image: "E_SDG_Icons-07", 
            color : "yellow"
        },{
            id:8,
            image: "E_SDG_Icons-08",
            color : "burgundy-red"
        },{
            id:9,
            image: "E_SDG_Icons-09",
            color : "orange"
        },{
            id:10,
            image: "E_SDG_Icons-10", 
            color : "magenta"
        },{
            id:11,
            image: "E_SDG_Icons-11",
            color : "golden-yellow"
        },{
            id:12,
            image: "E_SDG_Icons-12",
            color : "dark-mustard"
        },{
            id:13,
            image: "E_SDG_Icons-13",
            color : "green"
        },{
            id:14,
            image: "E_SDG_Icons-14",
            color : "blue"
        },{
            id:15,
            image: "E_SDG_Icons-15",
            color : "lime-green"
        },{
            id:16,
            image: "E_SDG_Icons-16",
            color : "royal-blue"
            } ,{
            id:17,
            image: "E_SDG_Icons-17",
            color : "navy-blue"
        }
        
    ];

    const theme = {
        pieMenu: {
          container: styles.container,
          center: styles.center,
        },
        slice: {
          container: styles.button,
        },
      };

    const Center = () =>(
        <PieCenter>
            <p>  {'Ding!'} </p>
             <img alt="..." src={require("../assets/img/sdgs_icons/E_SDG_Icons-00.jpg")}>
             </img>
        </PieCenter>
    )
    const Sdg = props =>(
        <Slice {...props}>
        </Slice>
    )

      return(
        <>
        <Header></Header>
        <Container className="pt-3 index-menu">
            <Row>
                <Col>
                </Col>
                <Col>
                <ThemeProvider theme={theme}>
                    <PieMenu 
                        radius='250px' centerRadius='40px' Center={Center}>
                        { 
                            sdgs.map(function(sdg, index){
                                let  imgSrc = images(`./${sdg.image}.jpg`);
                                let sdgNumber = index + 1;
                                let url = "Sdgs/Sdg_" + sdgNumber;
                                return <Sdg backgroundColor={sdg.color}>

                                        </Sdg>
                                // return <Slice key={index} className="red">
                                //             <img  alt="..." src={ imgSrc }></img>
                                //             <p> {sdgNumber} </p>
                                //         </Slice>
                        })}

                    </PieMenu>
                </ThemeProvider>
                </Col>
            </Row>
           
        </Container>
       
        </>
      );
    }
  
export default SdgIndexMenu;