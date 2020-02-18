import React, {useState, useEffect, useCallback} from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Map from "../visualizations/map";
import SdgMap from "../visualizations/sdgMap";
import SdgHighChart from "../visualizations/sdgHighChart";

import classnames from "classnames";
import {
    Row, Col, Nav,NavItem, NavLink, Card, TabContent, TabPane, Input, Button
} from "reactstrap";


function A2063(){
    const Papa = require("papaparse/papaparse.min.js");
    const agenda2063 = require('../assets/data/agenda2063.json');
    const a2063DataSource = require("../assets/data/sdg/pan.csv");

    const [activeTab, setActiveTab] = useState(1);
    const [innerTab, setInnerTab] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const [years, setYears] = useState([]);
    const [indicators, setIndicators] = useState([]);

    const [indicator, setIndicator] = useState('3.2 Child mortality rate of girls (per 1 000 births) (per 1 000 live births)');
   //const [indicator, setIndicator] = useState(1);
    const [dataSource, setSource] = useState('gdb');
    const [year, setYear] = useState('2006');
    const [mapChartType, setMapChartType] = useState('chart');
    const [mapData, setMapData] = useState([]);
    const [chartData, setChartData] = useState([]);

    let csvDataSourceData = '';
    let sdgData = '';
    let ind = [];

    const getIndicators = useCallback(() => {
        const targetData = sdgData[1].targets;
        targetData.forEach(function(data){
            if(data.code === activeTab){
                ind = data.indicators;
            }
        })
        return ind;
    }, [indicator]); 

    const setChartType = () => {
        setMapChartType('chart');
    }
    const setMapType = () => {
        setMapChartType('map');
    }

    const parseMapData = (data) => {
        const years = [];
        const indicatorData = [];
        data.forEach(function(d){
            if(d.Year === year ){
                indicatorData.push({
                    "code": d.Code,
                    "drilldown" : d.Code,
                    "value": d[indicator],
                    "country": d.Entity
                })  
            }
            if(d.Entity === "Mauritius"){
                years.push(d.Year);
                years.sort((a, b) => b - a);
            }
        })
        setYears(years);
        setMapData(indicatorData);
    }

    const parseChartData = (data) =>{
        const indicatorData = [];
        data.forEach(function(d){
            if(d.Year === year ){
                indicatorData.push([d.Entity, parseInt(d[indicator])])  
            }
        })
        console.log(indicatorData)
       setChartData(indicatorData)
    }

    useEffect(() => {
        let isSubscribed = true;
        if(dataSource === 'pan'){
            csvDataSourceData = require("../assets/data/sdg/pan.csv");
            sdgData = require('../assets/data/globalDatabase.json');
        }else if (dataSource === 'gdb'){
            csvDataSourceData = require("../assets/data/sdg/gdb.csv");
            sdgData = require('../assets/data/globalDatabase.json');
        }
        const indicators = getIndicators();
        setIndicators(indicators);

        const loadSdgData = (sdgCsvFile) => {
            setIsLoading(true);
            Papa.parse(sdgCsvFile, {
                download: true,
                header: true,
                complete: function(results){

                    if(isSubscribed){
                        parseMapData(results.data)
                        parseChartData(results.data)
                        setIsLoading(false);
                    }
                    
                }
            })
        }
        loadSdgData(csvDataSourceData);

        return () => isSubscribed = false
    }, [dataSource, indicator, year, activeTab]);


    return (
        <>
        <Header></Header>
            <main className="container-fluid agenda2063">
                <Row>
                    <Col md="2" className="agenda2063Side">
                        <div className="nav-wrapper">
                            <Nav className="flex-column " id="tabs-icons-text" pills role="tablist">
                                { 
                                    agenda2063.map((data, index) =>{
                                    return <NavItem key={index}>
                                                <NavLink key={index}
                                                    className={classnames("mb-sm-3 mb-md-0", { active: activeTab === index+1 })}
                                                    onClick={ () =>setActiveTab(index+1) } href="#!" role="tab">
                                                    Aspiration {data.agenda} : {data.title}
                                                </NavLink>
                                            </NavItem>
                                    })
                                }
                            </Nav>
                        </div>
                    </Col>
                    <Col md="10">
                        <TabContent activeTab={activeTab }>
                        { 
                            agenda2063.map((data, index) =>{
                                let newID = index + 1
                                let tabId = "plainTabs"+newID
                                let goals = []
                                goals = data.goals
                                
                                return <TabPane key={index} tabId={index+1} className={ activeTab === index+1 ? "active" : ""} >
                                            <div className="agenda2063Header">
                                                <Col md="12">
                                                    <h5 className="display-4 mt-2 mb-2 text-center">
                                                    Aspiration {data.agenda} : {data.title}
                                                    </h5>
                                                    <div className="nav-wrapper goalButtons">
                                                        <Nav className="flex-column flex-md-row" id="tabs-icons-text" pills role="tablist">
                                                            { 
                                                                goals.map((goalData, index) =>{
                                                                return <NavItem key={index}>
                                                                            <NavLink aria-selected={index+1 } 
                                                                                className={classnames("btn btn-warning", { active: innerTab === index+1 })}
                                                                                onClick={  () =>setInnerTab(index+1)  } href="#!" role="tab">
                                                                                Goal {goalData.number}
                                                                            </NavLink>
                                                                        </NavItem>
                                                                })
                                                            }
                                                        </Nav>
                                                    </div>
                                                </Col>
                                            </div>
                                         
                                            <TabContent activeTab={"innerTabs"}>
                                                { 
                                                    goals.map((goalData, index) =>{
                                                        //console.log(goalData.indicators);
                                                        let indicators = goalData.indicators;
                                                        let newID = index + 1
                                                        let tabId = "innerTabs"+newID
                                                        return <TabPane key={index} tabId={index+1} className={ innerTab === index+1 ? "active" : ""}> 
                                                                    <Card>
                                                                        <Row className="selectButtons mt-2 mb-2">
                                                                            <Col md="3">
                                                                                <Input type="select" name="indicatorSelect" id="indicatorSelect" className="btn btn-primary">
                                                                                   { indicators.map((indicator, index) => {
                                                                                        return <option key={index}>{indicator}</option>
                                                                                    })
                                                                                }
                                                                                </Input>
                                                                            </Col>
                                                                            <Col md="6">
                                                                                <Button color="primary" type="button">Global Database</Button>
                                                                                <Button color="primary" type="button">PanAfrican MRS</Button>
                                                                            </Col>
                                                                            <Col md="3">
                                                                            <Input type="select" name="yearSelect" id="yearSelect" className="btn btn-primary"> 
                                                                                    <option>2019</option>
                                                                                    <option>2018</option>
                                                                                    <option>2017</option>
                                                                                </Input>
                                                                            </Col>
                                                                        </Row>
                                                                    </Card>
                                                                </TabPane>
                                                    })
                                                }
                                            </TabContent>
                                           
                                        </TabPane>    
                                    })
                                    }
                        </TabContent>
                        <Card>
                            {
                                mapChartType === 'map' ? (
                                    <SdgMap mySdgData ={mapData}></SdgMap>
                                ) : (
                                    <SdgHighChart myChartData = {chartData} indicator = {indicator} years = {years}></SdgHighChart>
                                )
                            }

                            
                                 <div>
                                    <Button color="primary" type="button" className={ classnames("btn-icon" , { active: mapChartType === 'map' })} onClick={setMapType}>
                                        <span className="btn-inner--icon">
                                            <i className="fa fa-globe" />
                                        </span>
                                        <span className="btn-inner--text">MAP</span>
                                    </Button>
                                    <Button color="primary" type="button" className={ classnames("btn-icon" , { active: mapChartType === 'chart' })}  onClick={setChartType}> 
                                        <span className="btn-inner--icon">
                                        <i className="fa fa-chart-bar"></i>
                                        </span>
                                        <span className="btn-inner--text">CHART</span>
                                    </Button>
                                </div>
                        </Card>
                    </Col>
                </Row> 
            </main>
            <Footer></Footer>
        </>
    )


}

export default A2063;