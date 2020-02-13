import React, { useState , useEffect} from "react";
import { Row, Col, Input, Button, Container, Modal, Label, CustomInput } from "reactstrap";
import ClipLoader from 'react-spinners/ClipLoader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from "classnames";
import { css } from '@emotion/core';

import Header from "../components/sdgsHeader";
import SdgMap from "../visualizations/sdgMap";
import Footer from "../components/footer";
import SdgHighChart from "../visualizations/sdgHighChart";
import LineChart from "../visualizations/lineChart";
import Spinner from "../visualizations/spinner";

function Sdgs1() {
    const override = css`
        display: block;
        margin: 0 auto;
        border-color: red;`;
    const Papa = require("papaparse/papaparse.min.js");
    const data = require('../assets/data/globalDatabase.json');
    const [activSdg, setActiveSdg] = useState(0);
    const activeSdgData = data[activSdg];
    const targets = activeSdgData.targets;

    const countries = require("../assets/data/countries.json");
   
    const [target, setTarget] = useState('1.1');
    const [indicators, setIndicators] = useState([]);
    const [years, setYears] = useState([]);

    const [sdgMapData, setSdgMapData] = useState([]);
    const [sdgChartData, setSdgChartData] = useState([]);
    const [lineChartData, setLineChartData] = useState([]);

    const [dataSource, setDataSource] = useState('pan');
    const [year, setYear] = useState('2006');
    const [indicator, setIndicator] = useState('3.2 Child mortality rate of girls (per 1 000 births) (per 1 000 live births)');
    const [mapChartType, setMapChartType] = useState('map');
    const [checkedItems, setCheckedItems] = useState({DZ: true, AO: true, BJ: true, BW: true, CM:true, BI:true});
    
    const [isLoading, setIsLoading] = useState(false);
    const [toggleModal, setOpenModal] = useState(false);
    let csvDataSourceData = '';
    let normalizedData = '';
    let sdgData = '';
    let ind = [];  

    useEffect(() => {
        if(dataSource === 'pan'){
            csvDataSourceData = require("../assets/data/sdg/pan.csv");
            sdgData = require('../assets/data/globalDatabase.json');
        }else if (dataSource === 'gdb'){
            csvDataSourceData = require("../assets/data/sdg/gdb.csv");
            sdgData = require('../assets/data/globalDatabase.json');
        }

        const targetData = sdgData[activSdg].targets;
        targetData.forEach(function(data){
            if(data.code === target){
                ind = data.indicators;
            }
        })
        console.log(ind)
        setIndicators(ind);
    }, [activSdg, target])

    useEffect(() => {
        let isSubscribed = true;
        if(dataSource === 'pan'){
            csvDataSourceData = require("../assets/data/sdg/pan.csv");
            sdgData = require('../assets/data/globalDatabase.json');
        }else if (dataSource === 'gdb'){
            csvDataSourceData = require("../assets/data/sdg/gdb.csv");
            sdgData = require('../assets/data/globalDatabase.json');
        }
        normalizedData = require('../assets/data/sdg/normalizedGoalValues.csv')

        const filterChartData = (myChartData) =>{
            let filteredChartData = []
            const keys = Object.keys(checkedItems);
            for (const key of keys){
                for(const data of myChartData){
                    if(data.includes(key.toLowerCase()) && checkedItems[key] === true){
                        for(const country of countries){
                            if (country.alpha2Code === key){
                                data[0] = country.name
                            }
                        }
                        
                        filteredChartData.push(data)
                    }
                }
            }
            setSdgChartData(filteredChartData);

        }

        const loadSdgData = (sdgCsvFile) => {
            setIsLoading(true);
            Papa.parse(sdgCsvFile, {
                download: true,
                header: true,
                complete: function(results){
                    if(isSubscribed){
                        parseMapData(results.data);
                        const chartData = parseChartData(results.data)
                        filterChartData(chartData);
                        parseLineData(results.data);
                        setIsLoading(false)
                    }
                }
            })
        }
        loadSdgData(csvDataSourceData);
        return () => isSubscribed = false
    }, [dataSource, indicator, year, target, checkedItems, activSdg]);

    const parseMapData = (data) => {
        const years = [2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000];
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
        })
        setYears(years);
        setSdgMapData(indicatorData);
    }
    const parseChartData = (data) => {
        const indicatorData = [];
        data.forEach(function(d){
            if(d.Year === year ){
                indicatorData.push([ d.Code, parseInt(d[indicator])])  
            }
        })
       return indicatorData
    }

    const indexOf = (country, countriesData) => {
        let i = 0;
        for(i = 0; i < countriesData.length; i++){
            if(country === countriesData[i].name){
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
    }

    //Choose SDG
    const handleSdgChange = (sdg) => {
        setActiveSdg(sdg);
    }

    //Choose target
    const handleTargetChange = (e) => {
        setTarget(e.target.value);
    }

    //Choose indicator
    const handleIndicatorChange = (e) => {
        setIndicator(e.target.value);
    }

     //Choose year
     const handleYearChange = (e) => {
        setYear(e.target.value);
    }

    // Choose datasource
    const setGDBData = () => {
        setDataSource('gdb');
    }
    const setPanAfricanData = () => {
        setDataSource('pan');
    }
    
    const handleDataSourceChange = (e) => {
        setDataSource(e.target.value);
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

    const openModal = (countryId) => {
        setOpenModal(true);
    }
    const closeModal = () => {
        setOpenModal(false);
    }

    const handleChange = (event) => {
        setCheckedItems({...checkedItems, [event.target.name]: event.target.checked});
    }

    return(
        <>
        <Header onActiveSdgChanged={handleSdgChange}></Header>
            <main className="sdg">
            <div className="container">  
                <Row className="mt-4 optionButtons ">
                    <Col>
                        <Input type="select" name="targetSelect" onChange={handleTargetChange} value={target}>
                                {
                                targets.map((target, index) =>{
                                return <option key={index} value={target.code}>{target.code}</option>
                                })
                            }
                        </Input>
                    </Col>
                    <Col>
                        <Input type="select" name="indicatorSelect" onChange={handleIndicatorChange} value={indicator}>
                            
                            {
                                indicators.map((indicator, index) => {
                                    return <option key={index} value={indicator.title}>{indicator.title}</option>
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
                                isLoading ? (
                                    <Spinner></Spinner>
                                ) : (
                                    <div>
                                        
                                        <SdgMap mySdgData ={sdgMapData}></SdgMap>
                                        
                                        <Container className="play-controls">
                                            <Button id="play-pause-button" type="button" className="btn-icon" title="play">
                                                <i className="fa fa-play"></i>
                                            </Button>
                                            <CustomInput type="range" id="play-range" name="customRange" />
                                            <Label id="play-output" htmlFor="play-range" name="year">2009</Label>
                                        </Container>
                                    </div>
                                
                                )
                            ): null
                        }

                        {
                            mapChartType === 'chart' ? (
                                isLoading ? (
                                    <Spinner></Spinner> 
                                ) : (
                                    <div>
                                        <div className="add-country-div">
                                            <Button className="btn-link ml-1 add-country-btn" color="info" type="button" onClick={openModal}>
                                                    <i className="fa fa-plus-circle mr-1" />
                                                    Add a country
                                            </Button>
                                        </div>
                                        
                                        <SdgHighChart myChartData = {sdgChartData} indicator = {indicator} years = {years}></SdgHighChart>
                                    </div>        
                                )
                            ): null
                        }

                        {
                            mapChartType === 'line' ? (
                                isLoading ? (
                                    <Spinner></Spinner> 
                                ) : (
                                    <div>
                                    <div className="add-country-div">
                                        <Button className="btn-link ml-1 add-country-btn" color="info" type="button" onClick={openModal}>
                                                <i className="fa fa-plus-circle mr-1" />
                                                Add a country
                                        </Button>
                                    </div>
                                    
                                        <LineChart lineChartData = {lineChartData} indicator = {indicator} years = {years}></LineChart>
                                    </div>
                                )
                            ): null
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

                <Container>
                    <Modal size="lg" className="modal-dialog-centered" isOpen={toggleModal}
                        toggle={toggleModal}  >
                        <div className="modal-header">
                        <h6 className="">Choose data to show</h6>
                            <button aria-label="Close" className="close" data-dismiss="modal" type="button"
                                onClick={closeModal} >
                                <span aria-hidden={true}>×</span>
                            </button>
                        </div>
                        <div className="modal-body" >
                            <Container>
                                <Row>
                                    {
                                        countries.map((country, index) => {
                                        return <Col md="4">
                                        <Label key={index} check>
                                                    <Input type="checkbox" name={country.alpha2Code} value={country.alpha2Code} checked={!!checkedItems[country.alpha2Code]} onChange={handleChange}/>{' '}
                                                {country.name}
                                                </Label>
                                                </Col>    
                                        })
                                    }
                                </Row>
                            </Container>   
                        </div>
                    </Modal>
                </Container>
            </div>
        </main>
        <Footer></Footer>
        </>
    )
}

export default Sdgs1;