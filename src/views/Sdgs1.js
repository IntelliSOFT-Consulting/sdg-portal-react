import React, { useState , useEffect} from "react";
import { Row, Col, Input, Button, Container, Modal, Label } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from "classnames";
import { css } from '@emotion/core';
import CheckboxTree from 'react-checkbox-tree';

import Header from "../components/sdgsHeader";
import SdgMap from "../visualizations/sdgMap";
import Footer from "../components/footer";
import SdgHighChart from "../visualizations/sdgHighChart";
import LineChart from "../visualizations/lineChart";
import Spinner from "../visualizations/spinner";
import RadarChart from "../visualizations/radarChart";
import IndexMap from "../visualizations/indexMap";


  
function Sdgs1(props) {
    const override = css`
        display: block;
        margin: 0 auto;
        border-color: red;`;
    const Papa = require("papaparse/papaparse.min.js");
    const data = require('../assets/data/globalDatabase.json');
    const countries = require("../assets/data/countries.json");
    const regions = ["North", "West", "Southern", "Central", "East"]
   
    const [target, setTarget] = useState('1.1');
    const [sdgTargets, setSdgTargets] = useState([]);

    const [indicator, setIndicator] = useState('');
    const [indicators, setIndicators] = useState([]);

    let years = [2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000];
    let sdgAllYears = [2019]

    const [sdgMapData, setSdgMapData] = useState([]);
    const [sdgChartData, setSdgChartData] = useState([]);
    const [lineChartData, setLineChartData] = useState([]);
    const [countryLabel,setCountryLabel] = useState('')

    const [country, setCountry] = useState('DZ');
    const [dataSource, setDataSource] = useState('pan');
    const [year, setYear] = useState('2006');
    
    const [mapChartType, setMapChartType] = useState('map');
    const [firstIndicator, setFirstIndicator] = useState('');
    
    const [isLoading, setIsLoading] = useState(false);
    const [toggleModal, setOpenModal] = useState(false);
    const [isChecked, setIsChecked] = useState(["DZ", "AO", "BJ", "BW", "CM", "BI"])
    const [isExpanded, setIsExpanded] = useState(["North", "West", "Southern", "Central", "East"])
    const [regionCountries, setRegionCountries] = useState([])
    const [goalTitle, setGoalTitle] = useState('');
    
    let csvDataSourceData = '';
    const unIndicators = require('../assets/data/unsdgapi.json');
    
    let indi = [];    
    let targ = [];
    let redirectSdg = 0;

    const [indexMapData, setIndexMapData] = useState([]);
    const [indexRadarChartData, setIndexRadarChartData] = useState([]);

    if(props.location.state != null){
        if(props.location.state == 18){
            redirectSdg = 0
        }else{
            redirectSdg = props.location.state
        }
    }

    const [activSdg, setActiveSdg] = useState(redirectSdg);
    
    const parseCountriesRegions = () =>{
        let nodes = []
        regions.forEach(function(region){
            let countriesPerRegion = []
            countries.forEach(function(country){
                if(country.region == region){
                    countriesPerRegion.push({
                        value: country.alpha2Code,
                        label: country.name
                    })
                }
            })
            nodes.push({
                value : region,
                label : region + " Africa",
                children: countriesPerRegion
            })
        })
        return nodes
    }
    
    function handleIndexChildClick(country){
        setCountry(country);
    }

    function handleSdgChildClick(country){
        setMapChartType('line');
        setCountry(country);
    }

    //Set the country and regions popup data
    useEffect(() => {
        const nodes = parseCountriesRegions()
       // console.log(nodes)
        setRegionCountries(nodes)
    }, [])

    //Changes spider chart based on index map country click
    useEffect(() => {
        const normalizedData = require('../assets/data/normalizedGoalValues.csv')
        const loadNormalizedData = (normalizedDataFile) => {
            Papa.parse(normalizedDataFile, {
                download: true,
                header: true,
                skipEmptyLines: true,
                complete: function(results){
                    parseNormalizedData(results.data);
                }
            })
        }
        loadNormalizedData(normalizedData);
    }, [country]);


    useEffect(() => {
        if(activSdg != 0){
            targ = unIndicators[activSdg-1].targets;
        }
         
        setSdgTargets(targ);

    }, [target])

    useEffect(() => {
       //console.log(indicator)
        let isSubscribed = true;
        if(dataSource === 'pan'){
            csvDataSourceData = require("../assets/data/sdg/pan.csv");
        }else if (dataSource === 'gdb'){
            csvDataSourceData = require("../assets/data/sdg/gdb.csv");
        }

        const loadSdgData = (sdgCsvFile) => {
            setIsLoading(true);
            Papa.parse(sdgCsvFile, {
                download: true,
                header: true,
                complete: function(results){
                    if(isSubscribed){
                        parseIndicatorData(target, results.data);
                        parseMapData(results.data);
                        const chartData = parseChartData(results.data)
                        filterChartData(chartData);
                        parseLineData(results.data);
                        setIsLoading(false);
                    }
                }
            })
        }
        loadSdgData(csvDataSourceData);
        getGoalTitles(data)
        return () => isSubscribed = false
    }, [dataSource, indicator, year, target, activSdg, isChecked]);

    const parseIndicatorData = (sdgTarget, sdgCompiledData) => {
        let keys = Object.keys(sdgCompiledData[0]);
        let ind = keys.slice(3, keys.length)
        ind.forEach(function(indicator){
            if(indicator.startsWith(sdgTarget)){
                indi.push(indicator);
            }
        })
        setIndicators(indi);
        setFirstIndicator(indi[0]);
    }

    const parseNormalizedData = (data) => {
        const goals = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17'];
        const mapData = [];
        const radarData = [];

        data.forEach(function(d){
            mapData.push({
                "code": (d.id),
                "value": parseFloat(d.Score),
                "name": d.Country
            })
        })
        goals.forEach(function(goal) {
            data.forEach(function(d){
                if(country == d.id){
                    radarData.push({
                        "category": goal,
                        value1 : d["goal"+goal],
                    })
                }
            })
        })
        
        setIndexMapData(mapData);
        setIndexRadarChartData(radarData);
    }

    const parseMapData = (data) => {
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
    const filterChartData = (myChartData) =>{
        let filteredChartData = []
        isChecked.forEach(function(checked){
            myChartData.forEach(function(data){
                if(data.includes(checked.toLowerCase())){
                    for(const country of countries){
                        if (country.alpha2Code === checked){
                            data[0] = country.name
                        }
                    }
                    filteredChartData.push(data)
                }
            })
        })
        setSdgChartData(filteredChartData);
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
        let countryData = []
        let countryLabel = ''


        years =  years.sort((a, b) => a - b);
        
        data.forEach(function(d){
            years.forEach(function(year){
                if(year == d.Year && country.toLowerCase() == d.Code){
                    countryData.push(parseInt(d[indicator]))
                    countryLabel = d.Entity
                }
            })
        })
        setCountryLabel(countryLabel)
        setLineChartData(countryData);
        console.log(countryData) 
    }

    //Choose SDG
    const handleSdgChange = (sdg) => {
        setActiveSdg(sdg);
        setTarget(sdg + ".1" );
       //setIndicator(firstIndicator);
    }

    //Choose target
    const handleTargetChange = (e) => {
        setTarget(e.target.value);
        //setIndicator(firstIndicator);
    }

    //Choose indicator
    const handleIndicatorChange = (e) => {
        setIndicator(e.target.value);
    }

     //Choose year
     const handleYearChange = (e) => {
        setYear(e.target.value);
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
    const handleCountryChange = (event) => {
        setCountry(event.target.value);
    }
    const handleCheck = (event) => {
        setIsChecked(event)
    }
    const getGoalTitles = (data) => {
        data.forEach(function(d){
            if(activSdg == d.id){
                setGoalTitle(d.title)
            }
        })
    }
    

    return(
        <>
        <Header onActiveSdgChanged={handleSdgChange}></Header>
            <main className="sdg">
            <div className="container">  
            {
                 activSdg != 0 ? (
                   <div>
                        <h4 className="aspiration-title p-3"> GOAL  {activSdg} :  {goalTitle} </h4>
                        <Row className="mt-4 optionButtons ">
                            <Col>
                            
                                <Input type="select" name="targetSelect" onChange={handleTargetChange} value={target}>
                                        {
                                        sdgTargets.map((target, index) =>{
                                        return <option key={index} value={target.code}>{target.code}</option>
                                        })
                                    }
                                </Input>
                            </Col>
                            <Col>
                                <Input type="select" name="indicatorSelect" onChange={handleIndicatorChange} value={indicator}>
                                    <option> Choose indicator </option>
                                    {
                                        indicators.map((indicator, index) => {
                                            return <option key={index} value={indicator}>{indicator}</option>
                                        })
                                    }
                                </Input>
                            </Col>
                            {
                                mapChartType == 'line' ? (
                            <Col>
                                <Input type="select" name="countrySelect" onChange={handleCountryChange} value={country}>
                                    {
                                        countries.map((country, index) => {
                                            return <option key={index} value={country.alpha2Code}>{country.name}</option>
                                        })
                                    }
                                </Input>
                            </Col>
                                ):(
                            <Col>
                                <Input type="select" name="yearSelect"  onChange={handleYearChange} value={year}> 
                                        {
                                            years.map((year, index) => {
                                            return <option key={index} value={year}> {year} </option>
                                            })
                                        }
                                </Input>
                            </Col> 
                            )  }
                            <Col className="lastChild">
                                <Input type="select" name="datasourceSelect" onChange={handleDataSourceChange} value={dataSource}>
                                        <option value="gdb">Global Database</option>
                                        <option value="mrs">PanAfrican MRS</option>
                                </Input>
                            </Col>      
                        </Row>
                        <Row className="mt-5">
                            <Col md="11" className="map-chart-container">
                                {
                                    mapChartType === 'map' ? (
                                        isLoading ? (
                                            <Spinner></Spinner>
                                        ) : (
                                            <div>
                                                <SdgMap mySdgData ={sdgMapData} onCountryClick={handleSdgChildClick}></SdgMap>
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
                                                            Select country/ region
                                                    </Button>
                                                    {/* <Button className="btn-link ml-1 add-country-btn" color="info" type="button" onClick={openRegionModal}>
                                                            <i className="fa fa-plus-circle mr-1" />
                                                            Select region
                                                    </Button> */}
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
                                                {/* <Button className="btn-link ml-1 add-country-btn" color="info" type="button" onClick={openModal}>
                                                        <i className="fa fa-plus-circle mr-1" />
                                                        Add year
                                                </Button> */}
                                            </div>
                                            
                                                <LineChart lineChartData = {lineChartData} indicator = {indicator} years = {years} country ={countryLabel}></LineChart>
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
                   </div>
                ) : (
                    <div>
                        <Row className="mt-4 optionButtons ">
                            <Col>
                                <Label className="all-sdgs-label">ALL SDGs </Label>
                            </Col>
                            <Col>
                                <Input type="select" name="countrySelect" onChange={handleCountryChange} value={country}>
                                    {
                                        countries.map((country, index) => {
                                            return <option key={index} value={country.alpha2Code}>{country.name}</option>
                                        })
                                    }
                                </Input>
                            </Col>
                            <Col>
                                <Input type="select" name="yearSelect"  onChange={handleYearChange} value={year}> 
                                        {
                                            sdgAllYears.map((year, index) => {
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
                    
                        <Row className="mt-3">
                            <Col lg="6" md="12">
                                <IndexMap mySdgData ={indexMapData} onCountryClick={handleIndexChildClick}></IndexMap>
                            </Col>
                            <Col lg="6" md="12">
                                <RadarChart radarData={indexRadarChartData}></RadarChart>
                            </Col>
                        </Row>
                    </div>
                )
            }

                <Container className="pb-3">
                    <Modal size="xl" className="modal-dialog-centered" isOpen={toggleModal}
                        toggle={toggleModal}  >
                        <div className="modal-header">
                        <h6 className="">Choose data to show</h6>
                            <button aria-label="Close" className="close" data-dismiss="modal" type="button"
                                onClick={closeModal} >
                                <span aria-hidden={true}>×</span>
                            </button>
                        </div>
                        <div className="modal-body" >
                            <Container className="pb-3">
                                <Row>
                                <CheckboxTree
                                    nodes={regionCountries}
                                    checked={isChecked}
                                    expanded={isExpanded}
                                    onCheck={handleCheck} showNodeIcon={false} showExpandAll={false}
                                />
                                    
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