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
    const code = '1.1';
    const period = "2006";
    const selectedIndicator = "3.2 Child mortality rate of girls (per 1 000 births) (per 1 000 live births)";
    
    //console.log(data);
    const image = require.context('../../assets/img/sdg_icons', true);
    const imgSrc = image(`./${sdg.image}.jpg`);
    
    
    const [years, setYears] = useState("2018");
    const [sdgMapData, setSdgMapData] = useState([]);
    const [activeTab, setActiveTab] = useState(0);
    const [dataSource, setDataSource] = useState('pan');

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
        loadGDBIndicators(targets);
    }, []);

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
        //setSdgMapData(newCountryData);
    }

    function parseCompiledData(data){
        const indicators = [];
        const keys = [];
        let singleData = data[0];

        for (let s in singleData) keys.push(s);
        
        keys.forEach(function(key){
            if(key.startsWith(code)){
                indicators.push(key);
            }
        })
        const indicatorData = [];
            data.forEach(function(d){
                if(d.Year == period ){
                    indicatorData.push({
                        "code": d.Code,
                        "drilldown" : d.Code,
                        "value": d[selectedIndicator],
                        "country": d.Entity
                    })  
                }
            })
            setSdgMapData(indicatorData);
    }

   
    const setGDBData = () => {
         setDataSource('gdb');
    }
    const setPanAfricanData = () =>{
        setDataSource('pan');
        const Papa = require("papaparse/papaparse.min.js");
        const csvFile = require("../../assets/data/sdg/sdgTarget_11_mrs.csv");
    }

    function loadGDBIndicators(targets){
        for(let k=0; k<targets.length; k++){
            let indicators = targets[k].indicators;
            //console.log(indicators);
        }
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
                                                <Button color="primary" onClick={setPanAfricanData} className={ dataSource === 'pan' ? 'active': '' } >PanAfrican MRS</Button>
                                                <Button color="primary" onClick={setGDBData} className={ dataSource === 'gdb' ? 'active': '' }  >Global Database</Button>
                                                
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
                                            <SdgChart></SdgChart>
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