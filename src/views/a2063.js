import React, {useState, useEffect, useCallback} from "react";
import Header from "../components/a2063Header";
import Footer from "../components/footer";
import Map from "../visualizations/map";
import SdgMap from "../visualizations/sdgMap";
import SdgHighChart from "../visualizations/sdgHighChart";

import classnames from "classnames";
import {
    Row, Col, Nav,NavItem, NavLink, Card, TabContent, TabPane, Input, Button, Label
} from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function A2063(){
    const Papa = require("papaparse/papaparse.min.js");
    const agenda2063 = require('../assets/data/agenda2063.json');
    const a2063DataSource = require("../assets/data/sdg/pan.csv");

    const [activeTab, setActiveTab] = useState(0);
    const [innerTab, setInnerTab] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const [mapData, setMapData] = useState([]);
    const [chartData, setChartData] = useState([]);

    const [goal, setGoal] = useState(0);
    const [goals, setGoals] = useState([]);

    const [indicator, setIndicator] = useState(1);
    const [indicators, setIndicators] = useState([]);

    let   years = [2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000];
    const [year, setYear] = useState('2006');

    const [dataSource, setDataSource] = useState('pan');

    const [mapChartType, setMapChartType] = useState('map');

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
        //setYears(years);
        setMapData(indicatorData);
    }

    const parseChartData = (data) =>{
        const indicatorData = [];
        data.forEach(function(d){
            if(d.Year === year ){
                indicatorData.push([d.Entity, parseInt(d[indicator])])  
            }
        })
       // console.log(indicatorData)
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
        //setIndicators(indicators);

        if(activeTab != 0){
            const a2063Goals = agenda2063[activeTab-1].goals;
            setGoals(a2063Goals);
    
            const a2063Indicators = agenda2063[activeTab-1].goals[goal].indicators;
            setIndicators(a2063Indicators);
            
            console.log(agenda2063[activeTab-1].goals);
        }

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
    }, [dataSource, indicator, goal, year, activeTab]);

    const handleA2063Change = (a2063) => {
        setActiveTab(parseInt(a2063))
    }
    const handleGoalChange = (e) => {
        setGoal(parseInt(e.target.value))
    }
    const handleIndicatorChange = (e) => {
        setIndicator(parseInt(e.target.value));
    }
    const handleDataSourceChange = (e) => {
        setDataSource(e.target.value);
    }
    const handleYearChange = (e) => {
        setYear(e.target.value);
    }
    const setMapType = () =>{
        setMapChartType('map')
    }
    const setChartType = () =>{
        setMapChartType('chart')
    }
    const setLineChartType = () => {
        setMapChartType('line')
    }

    return (
        <>
        <Header onActiveA2063Changed={handleA2063Change}></Header>
            <main className="container agenda2063">
                {
                    activeTab != 0 ? (
                        <div>
                        <Row className="mt-4 optionButtons ">
                            <Col>
                                <Input type="select" name="goalSelect" onChange={handleGoalChange} value={goal}>
                                        {
                                        goals.map((goal, index) =>{
                                        return <option key={index} value={index}> GOAL {goal.number}</option>
                                        })
                                    }
                                </Input>
                            </Col>
                            <Col>
                                <Input type="select" name="indicatorSelect" onChange={handleIndicatorChange} value={indicator}>
                                
                                    {
                                        indicators.map((indicator, index) => {
                                            return <option key={index} value={indicator}>{indicator}</option>
                                        })
                                    }
                                </Input>
                            </Col>
                            <Col>
                                <Input type="select" name="yearSelect"  onChange={handleYearChange} value={year}> 
                                        {
                                            years.map((year, index) => {
                                            return <option key={index} value={year}> {year} </option>
                                            })
                                        }
                                </Input>
                            </Col>   
                            <Col className="lastChild">
                                <Input type="select" name="datasourceSelect" onChange={handleDataSourceChange} value={dataSource}>
                                        <option value="gdb">Global Database</option>
                                        <option value="mrs">PanAfrican MRS</option>
                                </Input>
                            </Col>      
                        </Row>
                
                        <Row className="mt-5">
                            <Col md="11">   
                                {
                                    mapChartType === 'map' ? (
                                        <SdgMap mySdgData ={mapData}></SdgMap>
                                    ) : (
                                        <SdgHighChart myChartData = {chartData} indicator = {indicator} years = {years}></SdgHighChart>
                                    )
                                }
                            </Col>
                            
                            <Col md="1">
                                <div>
                                    <br></br><br></br>
                                    <Button color="primary" type="button" className={ classnames("btn-icon" , { active: mapChartType === 'map' })} onClick={setMapType}>
                                    <FontAwesomeIcon icon="globe-africa" />
                                    
                                    </Button>
                                    <br></br><br></br>
                                    <Button color="primary" type="button" className={ classnames("btn-icon" , { active: mapChartType === 'chart' })}  onClick={setChartType}> 
                                    <FontAwesomeIcon icon="chart-bar" />
                                    
                                    </Button>
                                    <br></br><br></br>
                                    <Button color="primary" type="button" className={ classnames("btn-icon" , { active: mapChartType === 'line' })}  onClick={setLineChartType}> 
                                    <FontAwesomeIcon icon="chart-line" />
                                    
                                    </Button>
                                </div>
                            </Col>             
                        </Row> 
                        </div>
                    ):(
                        <div>
                        <Row className="mt-4 optionButtons ">
                            <Col>
                                <Label className="all-sdgs-label">ALL ASPIRATIONS </Label>
                            </Col>
                            <Col>
                                <Label className="all-sdgs-label">ALL SDGs </Label>
                            </Col>
                            <Col>
                                <Input type="select" name="yearSelect"  onChange={handleYearChange} value={year}> 
                                        {
                                            years.map((year, index) => {
                                            return <option key={index} value={year}> {year} </option>
                                            })
                                        }
                                </Input>
                            </Col>   
                            <Col className="lastChild">
                                <Input type="select" name="datasourceSelect" onChange={handleDataSourceChange} value={dataSource}>
                                        <option value="gdb">Global Database</option>
                                        <option value="mrs">PanAfrican MRS</option>
                                </Input>
                            </Col>      
                        </Row>
                        </div>
                    )
                }
                   
            </main>
            <Footer></Footer>
        </>
    )


}

export default A2063;