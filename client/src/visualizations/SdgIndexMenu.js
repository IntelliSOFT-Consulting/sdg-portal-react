import React from 'react';
import PieMenu, { Slice } from 'react-pie-menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Container, Row, Col
  } from "reactstrap";
  import Header from '../components/header';
import { PieCenter } from 'react-pie-menu/dist/index.prod';
import * as styles from '../indexMenuStyles';
import { ThemeProvider, css } from 'styled-components';


function SdgIndexMenu( {x, y}) {
    const images = require.context('../assets/img/sdgs_icons', true);
    const sdgs = [{
            id :1,
            image : "E_SDG_Icons-01",
            color : "#E5243B" 
        },{
            id:2,
            image : "E_SDG_Icons-02",
            color : "#DDA63A"
        },{
            id:3,
            image: "E_SDG_Icons-03",
            color : "#4C9F38"
        },{
            id:4,
            image: "E_SDG_Icons-04",
            color : "#C5192D"
        },{
            id:5,
            image: "E_SDG_Icons-05",
            color : "#FF3A21"
        },{
            id:6,
            image: "E_SDG_Icons-06",
            color : "#26BDE2"
        },{
            id:7,
            image: "E_SDG_Icons-07", 
            color : "#FCC30B"
        },{
            id:8,
            image: "E_SDG_Icons-08",
            color : "#A21942"
        },{
            id:9,
            image: "E_SDG_Icons-09",
            color : "#FD6925"
        },{
            id:10,
            image: "E_SDG_Icons-10", 
            color : "#DD1367"
        },{
            id:11,
            image: "E_SDG_Icons-11",
            color : "#FD9D24"
        },{
            id:12,
            image: "E_SDG_Icons-12",
            color : "#BF8B2E"
        },{
            id:13,
            image: "E_SDG_Icons-13",
            color : "#3F7E44"
        },{
            id:14,
            image: "E_SDG_Icons-14",
            color : "#0A97D9"
        },{
            id:15,
            image: "E_SDG_Icons-15",
            color : "#56C02B"
        },{
            id:16,
            image: "E_SDG_Icons-16",
            color : "#00689D"
            } ,{
            id:17,
            image: "E_SDG_Icons-17",
            color : "#19486A"
        }
        
    ];

    const theme = {
        pieMenu: {
          container: styles.container,
          center: styles.center,
          item : styles.item
        },
        slice: {
            container: styles.button,
            contentContainer: css`
            border : 2px solid white;
            // center content...
            `,
            content: css`
            
            // rotate content...
            `,
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
             <img alt="..." src={require("../assets/img/sdgs_icons/E_SDG_Icons-00.jpg")}></img>
                <p>Sdg</p>
        </Slice>
    )

      return(
        <>
        <Header></Header>
        <Container className="pt-3 index-menu">
            <Row>
                {/* <Col>
                </Col> */}
                <Col>
                <ThemeProvider theme={theme}>
                    <PieMenu 
                        radius='250px'  startOffsetAngle={65}  Center={Center}>
                        { 
                            sdgs.map(function(sdg, index){
                                let  imgSrc = images(`./${sdg.image}.jpg`);
                                let sdgNumber = index + 1;
                                let url = "Sdgs/Sdg_" + sdgNumber;
                                return <Sdg backgroundColor={sdg.color}>

                                        </Sdg>
                                // return <Slice key={index} className="red" backgroundColor={sdg.color}>
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