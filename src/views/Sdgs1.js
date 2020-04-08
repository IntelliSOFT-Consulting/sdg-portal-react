import React, { useState , useEffect} from "react";
import { Row, Col, Input, Button, Container, Modal, Label, CustomInput } from "reactstrap";
import ClipLoader from 'react-spinners/ClipLoader';
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
    
    //const activeSdgData = data[activSdg];
    //const targets = activeSdgData.targets;

    const countries = require("../assets/data/countries.json");
    const regions = ["North", "West", "Southern", "Central", "East"]
   
    const [target, setTarget] = useState('1.2');
    const [indicators, setIndicators] = useState([]);
    //const [years, setYears] = useState([]);
    let years = [2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000];

    const [sdgMapData, setSdgMapData] = useState([]);
    const [sdgChartData, setSdgChartData] = useState([]);
    const [lineChartData, setLineChartData] = useState([]);
    const [victoryChartData, setVictoryChartData] = useState([]);

    const [country, setCountry] = useState('DZ');
    const [dataSource, setDataSource] = useState('pan');
    const [year, setYear] = useState('2006');
    const [indicator, setIndicator] = useState('3.2 Child mortality rate of girls (per 1 000 births) (per 1 000 live births)');
    const [mapChartType, setMapChartType] = useState('map');
    const [checkedItems, setCheckedItems] = useState({DZ: true, AO: true, BJ: true, BW: true, CM:true, BI:true});
    const [firstIndicator, setFirstIndicator] = useState('');
    const [sdgTargets, setSdgTargets] = useState([]);
    
    const [isLoading, setIsLoading] = useState(false);
    const [toggleModal, setOpenModal] = useState(false);
    const [toggleRegionModal, setOpenRegionModal] = useState(false);
    const [isChecked, setIsChecked] = useState(["DZ", "AO", "BJ", "BW", "CM", "BI"])
    const [isExpanded, setIsExpanded] = useState(["North", "West", "Southern", "Central", "East"])
    const [regionCountries, setRegionCountries] = useState([])
    const [goalTitle, setGoalTitle] = useState('');
    
    let csvDataSourceData = '';
    let normalizedData = '';
    let sdgData = '';
    let ind = [];
    let indi = [];    
    let targ = [];
    let redirectSdg = 0;

    const nodes = [{
        value: 'mars',
        label: 'Mars',
        children: [
            { value: 'phobos', label: 'Phobos' },
            { value: 'deimos', label: 'Deimos' },
        ],
    }];

    const [indexMapData, setIndexMapData] = useState([]);
    const [indexRadarChartData, setIndexRadarChartData] = useState([]);

    if(props.location.state != null){
        if(props.location.state == 18){
            redirectSdg = 0
        }else{
            redirectSdg = props.location.state
        }

    }
    console.log(redirectSdg)
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
                label : region,
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

    console.log(props)

    useEffect(() => {
        const indexMapData = require('../assets/data/sdg/emptyCountriesMapData.json');
        const nodes = parseCountriesRegions()
        setRegionCountries(nodes)
    }, [])

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

        const unIndicators = require('../assets/data/unsdgapi.json');
        if(activSdg != 0){
            const targets = unIndicators[activSdg-1].targets;
            targ = targets
        }
        setSdgTargets(targ);

        if(activSdg != 0){
            sdgTargets.forEach(function(sdgtarget){
                if(sdgtarget.code == target){
                }
            })
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
                        parseVictoryChartData(results.data);
                        setIsLoading(false);
                    }
                }
            })
        }
        loadSdgData(csvDataSourceData);
        console.log(data)
        getGoalTitles(data)
        return () => isSubscribed = false
    }, [dataSource, indicator, year, target, activSdg, isChecked]);

    const parseIndicatorData = (sdgTarget, sdgCompiledData) => {
        let indicators = []
        let keys = Object.keys(sdgCompiledData[0]);
        let ind = keys.slice(3, keys.length)
        ind.forEach(function(indicator){
            if(indicator.startsWith(sdgTarget)){
                indi.push(indicator);
            }
        })
        setIndicators(indi);
        setFirstIndicator(indi[0]);
        //console.log(target);
        console.log(indi[0]);
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
        console.log(indicator)
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
        let countryData = []
        years =  years.sort((a, b) => a - b);
        
        data.forEach(function(d){
            years.forEach(function(year){
                //console.log(year, d.Year, country, d.Code)
                if(year == d.Year && country.toLowerCase() == d.Code){
                    console.log(d[indicator])
                    countryData.push(parseInt(d[indicator]))
                }
            })
             
        })
        setLineChartData(countryData); 
    }

    const parseVictoryChartData = (data) => {
       const victoryData = [];
        data.forEach(function(d){
            if(d.Code == 'ke' && d[indicator] !== null && d[indicator] !== ''){
                victoryData.push({
                    x: d.Year,
                    y: (d[indicator])
                })
            }
        })
        let filteredData = victoryData.slice(-10);
        setVictoryChartData(filteredData);
       // console.log(data);
       
    }

    //Choose SDG
    const handleSdgChange = (sdg) => {
        setActiveSdg(sdg);
        setTarget(sdg + ".1" );
        setIndicator(firstIndicator);
    }

    //Choose target
    const handleTargetChange = (e) => {
        setTarget(e.target.value);
        setIndicator(firstIndicator);
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

    const openRegionModal = () => {
        setOpenRegionModal(true)
    }
    const closeRegionModal = () => {
        setOpenRegionModal(false)
    }

    const handleChange = (event) => {
        setCheckedItems({...checkedItems, [event.target.name]: event.target.checked});
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