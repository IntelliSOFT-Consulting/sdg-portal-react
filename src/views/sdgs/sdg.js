import React, { useState , useEffect} from "react";
import {
    Container, Row, Col, Card, CardImg, Button, Input, Nav, NavItem, NavLink, TabContent, TabPane
} from "reactstrap";

import Header from "../../components/header";
import SdgMap from "../../visualizations/sdgMap";
import Footer from "../../components/footer";
import SdgChart from "../../visualizations/sdgChart";
import classnames from "classnames";

function Sdg(){
    const data = require('../../assets/data/globalDatabase.json');
    const sdg = data[0];
    const targets = sdg.targets;
    let indicators = [];
    
    //console.log(data);
    const image = require.context('../../assets/img/sdg_icons', true);
    const imgSrc = image(`./${sdg.image}.jpg`);
    const period = "2017";
    
    const [sdgMapData, setSdgMapData] = useState([]);
    const [activeTab, setActiveTab] = useState(0);

     useEffect(() => {
        const Papa = require("papaparse/papaparse.min.js");
        const csvFile = require("../../assets/data/sdg/sdgTarget_11_mrs.csv");
        const sdgCompiled = require("../../assets/data/sdg/sdgDataCompiled.csv");

        const loadSdgMapData = (callback) => {
            Papa.parse(csvFile, {
                download: true,
                header: true,
                complete: function(results){
                    callback(results.data);
                }
            })  
        }

        const loadCompiledData = (callback) =>{
            Papa.parse(sdgCompiled, {
                download: true,
                header: true,
                complete: function(results){
                    callback(results.data);
                }
            })
        }
        
        loadSdgMapData(parseData);
        loadCompiledData(parseCompiledData);

    }, []);

    
    function parseCompiledData(data){
        console.log(data);
        const targetData = [];
        for(let j=0; j<data.length; j++){
            

        }
    }

    function parseData(data){
        const newCountryData = [];
        for (let i = 0; i < data.length; i++) {
            let dataPoint = data[i];
            newCountryData.push({
                    "code": dataPoint.code,
                    "drilldown": dataPoint.drilldown,
                    "value": dataPoint[period],
                    "country":dataPoint.country
                });        
        }
        setSdgMapData(newCountryData);
    }

    return(
        <>
        <Header></Header>
            <div className="container-fluid">
                <Row className="sdgBackground">
                    <Col md="2">
                        <CardImg alt=".." src={imgSrc}></CardImg>
                    </Col>
                    <Col md="10">
                    <h5 className="display-4 mt-2 mb-2"> {sdg.title} </h5>
                    <p> {sdg.description} </p>
                    </Col>
                </Row>
                <div className="targetButtons text-center mt-1 pt-1 pb-3">
                    <h5 className="display-4"> SDG {sdg.id} Targets  </h5>
                    <Nav className="justify-content-center">
                        {
                            targets.map((target, index) =>{
                                return <NavItem key={index}>
                                            <NavLink 
                                                className={classnames("ml-4 mr-4 text-white btn btn-warning", 
                                                { active: activeTab === index })} 
                                                onClick={() => setActiveTab(index)} >
                                                Target {target.code}
                                            </NavLink>
                                        </NavItem>          
                            })
                        }  
                        </Nav>
                </div>
                <Container>
                    <Card>
                        <TabContent activeTab={activeTab}>
                            {
                                targets.map((target, index) =>{
                                    indicators = target.indicators;
                                    return <TabPane tabId={index} key={index}>
                                        <p className="p-3"> Target {target.code}: {target.title} </p>
                                        <Row className="text-center selectButtons"> 
                                            <Col md="6">
                                                <Button color="primary">PanAfrican MRS</Button>
                                                <Button color="primary" >Global Database</Button>
                                                
                                            </Col>
                                            <Col md="3">
                                                <Input type="select" name="yearSelect" className="btn btn-primary">
                                                    <option>Select indicator</option>
                                                    {
                                                        indicators.map((indicator, index) => {
                                                         return <option key={index}>{indicator.title}</option>
                                                        })
                                                    }
                                                </Input>
                                            </Col>
                                            <Col md="3">
                                                <Input type="select" name="yearSelect" className="btn btn-primary"> 
                                                    <option>Select year</option>
                                                    <option>2019</option>
                                                    <option>2018</option>
                                                    <option>2017</option>
                                                </Input>
                                            </Col>
                                        </Row>
                                        <div className="mt-3">
                                            <SdgMap mySdgData ={sdgMapData}></SdgMap>
                                        </div>
            
                                        <div>
                                            {/* <SdgChart></SdgChart> */}
                                        </div>
                                    </TabPane>
                                })
                            }
                        
                        </TabContent>  
                        </Card>
                    
                </Container>
            </div>
            <Footer></Footer>
        </>
    )
}



export default Sdg;