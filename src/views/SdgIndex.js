import React, { useState, useEffect } from 'react';
import SdgIndexMenu from '../visualizations/SdgIndexMenu';
import Radialmenu from '../visualizations/radialMenu';
import Header from '../components/header'
import {
  Container, Row, Col, CardImg, Button
} from "reactstrap";

import { Link, Redirect} from 'react-router-dom'
function SdgIndex() {

  const [activeSdg, setActiveSdg] = useState('1');
  const [redirect, setRedirect] = useState(false);
  const images = require.context('../assets/img/sdg_icons', true);
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
      },{
        id:18,
        image: "E_SDG_Icons-18",
        color : "#19486A"
    }
      
  ];
  const sdgMetaData = require("../assets/data/sdgs.json");

  const handleOnClick = (sdg) =>{
    setActiveSdg(sdg.currentTarget.value);
  }

    // const setRedirect = () => {
    //   setRedirect(true);
    // }

    const renderRedirect = (sdg) =>{
      if(redirect){
        return <Redirect to={{ pathname:"/Sdgs",
                                state: sdg
        }}></Redirect>
      }
    }

    const handleExploreButton = () =>{
      setRedirect(true)
    }

    useEffect(() => {
      console.log(activeSdg)
    }, [activeSdg])


      return(
        <>
        <Header></Header>
        <div className="sdg-index">
          <Row>
              <Col>
                    {
                      sdgs.map(function(sdg, index){
                          let  imgSrc = images(`./${sdg.image}.jpg`);
                          let sdgNumber = index + 1;
                          let url = "Sdgs/Sdg_" + sdgNumber;
                          let border = '3px solid ' + sdg.color; 

                        return sdgNumber == activeSdg ? (
                          <div style={{border}} className="sdg-goal-div">
                            <div>
                              <Button>
                                  <CardImg src={ imgSrc }></CardImg>
                              </Button>
                              <p>
                              The UN explains: Extreme poverty rates have fallen by more than half since 1990. While this is a remarkable achievement, one-in-five people in developing regions still live on less than $1.90 a day. Millions more make little more than this daily amount and are at risk of slipping back into extreme poverty.
                              Sustainable Development Goal 1 (SDG1) aims to eradicate extreme poverty by 2030. The visualizations and data below present the latest data on our progress there.
                              Longer-term trends, correlates and additional data on extreme poverty can be found at the Our World in Data entry on Global Extreme Poverty.
                              The UN has defined 7 Targets and 14 Indicators for SDG 1. Targets specify the goals and Indicators represent the metrics by which the world aims to track whether these Targets are achieved. Below we quote the original text of all Targets and show the data on the agreed Indicators.
                              </p>
                            </div>
                          </div>
                          ) : null   
                        })
                    }
                  
                    <div className="text-center pt-3">
                        <Button onClick={handleExploreButton} className="btn btn-explore">Explore data</Button>
                        {renderRedirect(activeSdg)}
                    </div>
              </Col>
              <Col>
                    <h5>Select a goal to view Africa's progress and linked views</h5>
                  <Row className="no-gutters">
                  { 
                              sdgs.map(function(sdg, index){
                                  let  imgSrc = images(`./${sdg.image}.jpg`);
                                  let sdgNumber = index + 1;
                                  let url = "Sdgs/Sdg_" + sdgNumber;
                                  return <Col md="2" className="sdg-index-images" key={index}>
                                    <Button value={ index+1 } onClick={handleOnClick}>
                                      <CardImg src={ imgSrc } ></CardImg>
                                    </Button>
                                      
                                  </Col>
                          })}
                  </Row>
              </Col>

             
            </Row>
        </div>
         
        </>
      );
    }
  
    export default SdgIndex;