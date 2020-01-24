import React, { useState , useEffect, useCallback} from "react";
import {
    Container, Row, Col, Card, CardImg, Button, Input, Nav, TabContent, TabPane
} from "reactstrap";
import { css } from '@emotion/core';
import ClipLoader from 'react-spinners/ClipLoader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Select from 'react-select';

import Header from "../../components/header";
import SdgMap from "../../visualizations/sdgMap";
import Footer from "../../components/footer";
import SdgChart from "../../visualizations/sdgChart";
import SdgHighChart from "../../visualizations/sdgHighChart";
import LineChart from "../../visualizations/lineChart";
import classnames from "classnames";
import { indexOf } from "@amcharts/amcharts4/.internal/core/utils/Array";

function Sdg(){
    const override = css`
        display: block;
        margin: 0 auto;
        border-color: red;`;

    const Papa = require("papaparse/papaparse.min.js");
    const data = require('../../assets/data/globalDatabase.json');
    const sdg = data[0];
    const targets = sdg.targets;

    const image = require.context('../../assets/img/sdg_icons', true);
    const imgSrc = image(`./${sdg.image}.jpg`);

    //const countries = require("../../assets/data/countries.json");
    const [years, setYears] = useState([]);
    const [indicators, setIndicators] = useState([]);

    const [sdgMapData, setSdgMapData] = useState([]);
    const [sdgChartData, setSdgChartData] = useState([]);
    const [lineChartData, setLineChartData] = useState([]);
    const [dataSource, setDataSource] = useState('pan');
    const [activeTab, setActiveTab] = useState('1.2');
    const [isLoading, setIsLoading] = useState(false);
    const [isChartLoading, setIsChartLoading] = useState(false);
    const [mapChartType, setMapChartType] = useState('map');
    const [year, setYear] = useState('2006');
    const [indicator, setIndicator] = useState('3.2 Child mortality rate of girls (per 1 000 births) (per 1 000 live births)');
    
    let csvDataSourceData = '';
    let sdgData = '';
    let ind = [];  

    useEffect(() => {
        if(dataSource == 'pan'){
            csvDataSourceData = require("../../assets/data/sdg/pan.csv");
            sdgData = require('../../assets/data/globalDatabase.json');
        }else if (dataSource == 'gdb'){
            csvDataSourceData = require("../../assets/data/sdg/gdb.csv");
            sdgData = require('../../assets/data/globalDatabase.json');
        }

        const targetData = sdgData[0].targets;
        targetData.forEach(function(data){
            if(data.code == activeTab){
                ind = data.indicators;
                //console.log(ind);
            }
        })
        console.log(ind);
        
        setIndicators(ind);
    }, [activeTab])

    useEffect(() => {
        let isSubscribed = true;
        if(dataSource === 'pan'){
            csvDataSourceData = require("../../assets/data/sdg/pan.csv");
            sdgData = require('../../assets/data/globalDatabase.json');
        }else if (dataSource === 'gdb'){
            csvDataSourceData = require("../../assets/data/sdg/gdb.csv");
            sdgData = require('../../assets/data/globalDatabase.json');
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
                        parseLineData(results.data)
                        setIsLoading(false);
                    }
                    
                }
            })
        }
        loadSdgData(csvDataSourceData);

        return () => isSubscribed = false
    }, [dataSource, indicator, year, activeTab]);

    const parseMapData = (data) => {
        const years = [];
        const indicatorData = [];
        data.forEach(function(d){
            if(d.Year === year ){
                indicatorData.push({
                    "code": d.Code,
                    "drilldown" : d.Code + "/" + d.Code + "-all",
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
        setSdgMapData(indicatorData);
    }

    const parseChartData = (data) => {
        const indicatorData = [];
        data.forEach(function(d){
            if(d.Year === year ){
                indicatorData.push([d.Entity, parseInt(d[indicator])])  
            }
        })
        //console.log(indicatorData)
        let filteredData = indicatorData.slice(0, 5);
       setSdgChartData(filteredData)
    }

    const indexOf = (country, countriesData) => {
        let i = 0;
        for(i = 0; i < countriesData.length; i++){
            if(country == countriesData[i].name){
                return i;
            }  
        }
        return -1;
    }

    const parseLineData = (data) => {
        let countriesData = []
        let countryData = {}
       
        data.forEach(function(d){
            let indicatorData = []
                indicatorData.push( parseInt(d[indicator]))
                countryData = {
                    "name": d.Entity,
                    "data": indicatorData
                }
            if(countriesData.length === 0){
                countriesData.push(countryData)  
            } else{
                if(indexOf(d.Entity, countriesData, countriesData) === -1){
                    countriesData.push(countryData)
                }else{
                    let index = indexOf(d.Entity, countriesData, countriesData);
                    let oldData = countriesData[index].data;
                    oldData.push(parseInt(d[indicator]))
                    countriesData[index].data = oldData
                }
            }
           
             
        })

        countriesData.forEach(function(countryData){
            let data = countryData.data;
            let filteredData = data.slice(0, 5);
            countryData.data = filteredData

        })
        let filteredData = countriesData.slice(0, 5);
        setLineChartData(filteredData);
        console.log(filteredData)
    }
   
    const setGDBData = () => {
        setDataSource('gdb');
    }
    const setPanAfricanData = () =>{
        setDataSource('pan');
    }
    const handleIndicatorChange = (e) =>{
        setIndicator(e.target.value);
    }
    const handleYearChange = (e) =>{
        setYear(e.target.value);
    }
    const targetClick = (e) =>{
        setActiveTab(e.target.value);
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
                                return <Button key={index} onClick={targetClick} value={target.code}> 
                                            Target {target.code}
                                        </Button>
                            })
                        }  
                        </Nav>
                </div>
                <Container>
                    <Card className="mapChartCard">
                        <TabContent activeTab={activeTab}>
                            {
                                targets.map((target, index) =>{
                                    return <TabPane tabId={target.code} key={index}>
                                        <p className="p-3"> Target {target.code}: {target.title} </p>
                                        <Row className="text-center selectButtons"> 
                                            <Col md="6">
                                                <Button color="primary" onClick={setPanAfricanData} className={ dataSource === 'pan' ? 'active': '' } >PanAfrican MRS</Button>
                                                <Button color="primary" onClick={setGDBData} className={ dataSource === 'gdb' ? 'active': '' }  >Global Database</Button>
                                                

                                            </Col>
                                            <Col md="3">
                                               
                                                <Input type="select" name="indicatorSelect" className="btn btn-primary" onChange={handleIndicatorChange} value={indicator}>
                                                    <option>Select indicator</option>
                                                    {
                                                        indicators.map((indicator, index) => {
                                                         return <option key={index} value={indicator.title}>{indicator.title}</option>
                                                        })
                                                    }
                                                </Input>
                                            </Col>
                                            <Col md="3">
                                                <Input type="select" name="yearSelect" className="btn btn-primary" onChange={handleYearChange} value={year}> 
                                                <option>Select year</option>
                                                    {
                                                        years.map((year, index) => {
                                                        return <option key={index} value={year}> {year} </option>
                                                        })
                                                    }
                                                </Input>
                                            </Col>
                                            {/* <Col md="3">
                                                <Input type="select" name="countrySelect" className="btn btn-primary" onChange={handleYearChange} value={year}> 
                                                    <option>Select country</option>
                                                    {
                                                        years.map((year, index) => {
                                                        return <option key={index} value={year}> {year} </option>
                                                        })
                                                    }
                                                </Input>
                                            </Col> */}
                                        </Row>
                                    </TabPane>
                                })
                            }
                        </TabContent>  
                        {
                            mapChartType === 'map' ? (
                                 isLoading ? (
                                    <div className='sweet-loading mt-4'>
                                        <ClipLoader css={override} sizeUnit={"px"} size={50}
                                        color={'#123abc'} loading={isLoading} />
                                    </div> 
                                ) : (
                                    <div className="mt-3 ">
                                        <SdgMap mySdgData ={sdgMapData}></SdgMap>
                                    </div>
                                )
                            ): null
                        }

                        {
                            mapChartType === 'chart' ? (
                                 isLoading ? (
                                    <div className='sweet-loading mt-4'>
                                        <ClipLoader css={override} sizeUnit={"px"} size={50}
                                        color={'#123abc'} loading={isLoading} />
                                    </div> 
                                ) : (
                                    <div className="mt-3 ">
                                        <SdgHighChart myChartData = {sdgChartData} indicator = {indicator} years = {years}></SdgHighChart>
                                    </div>
                                )
                            ): null
                        }

                        {
                            mapChartType === 'line' ? (
                                 isLoading ? (
                                    <div className='sweet-loading mt-4'>
                                        <ClipLoader css={override} sizeUnit={"px"} size={50}
                                        color={'#123abc'} loading={isLoading} />
                                    </div> 
                                ) : (
                                    <div className="mt-3 ">
                                        <LineChart lineChartData = {lineChartData} indicator = {indicator} years = {years}></LineChart>
                                    </div>
                                )
                            ): null
                        }

                        <div>
                            <Button color="primary" type="button" className={ classnames("btn-icon" , { active: mapChartType === 'map' })} onClick={setMapType}>
                            <FontAwesomeIcon icon="globe-africa" />
                               
                            </Button>
                            <Button color="primary" type="button" className={ classnames("btn-icon" , { active: mapChartType === 'chart' })}  onClick={setChartType}> 
                            <FontAwesomeIcon icon="chart-bar" />
                            
                            </Button>
                            <Button color="primary" type="button" className={ classnames("btn-icon" , { active: mapChartType === 'line' })}  onClick={setLineChartType}> 
                            <FontAwesomeIcon icon="chart-line" />
                             
                            </Button>
                        </div>
                    </Card>
                </Container>
            </div>
            <Footer></Footer>
        </>
    )
}
export default Sdg;