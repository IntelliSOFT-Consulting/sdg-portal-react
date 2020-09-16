import React, {useState, useEffect} from "react";
import {
    Row, Col, Input, Button, Container, Modal
} from "reactstrap";
import CheckboxTree from 'react-checkbox-tree';
import classnames from "classnames";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Header from "../components/a2063Header";
import Footer from "../components/footer";
import Map from "../visualizations/sdgMap";
import SdgHighChart from "../visualizations/a2063HighChart";
import Spinner from "../visualizations/spinner";
import LineChart from "../visualizations/lineChart";

function A2063(props){
    const API_BASE = process.env.REACT_APP_API_BASE;
    const Papa = require("papaparse/papaparse.min.js");
    const agenda2063 = require('../assets/data/agenda2063.json');
    const aspirationsData = require("../assets/data/aspirationsData.json");
    const countries = require("../assets/data/countries.json");
    const regions = ["North", "West", "Southern", "Central", "East"]
    const [isLoading, setIsLoading] = useState(false);
    const [mapData, setMapData] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [lineChartData, setLineChartData] = useState([]);
    const [goal, setGoal] = useState(1);
    const [goalIndex, setGoalIndex] = useState(1);
    const [goals, setGoals] = useState([]);
    const [goalID, setGoalID] = useState(1);
    const [indicator, setIndicator] = useState('');

    let years = [2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000];
    const [year, setYear] = useState('2006');
    const [dataSource, setDataSource] = useState('pan');
    const [mapChartType, setMapChartType] = useState('map');
    const [country, setCountry] = useState('DZ');
    const [aspirationTitle, setAspirationTitle] = useState('');
    const [toggleModal, setOpenModal] = useState(false);
    const [isChecked, setIsChecked] = useState(["DZ", "AO", "BJ", "BW", "CM", "BI"])
    const isExpanded = ["North", "West", "Southern", "Central", "East"]
    const [regionCountries, setRegionCountries] = useState([])
    const [indicators, setIndicators] = useState([]);
    const [countryLabel,setCountryLabel] = useState('')

    const toggle = () => setOpenModal(!toggleModal);

    let csvDataSourceData = '';
    let redirectAgenda2063 = 1;

    if(props.location.state != null){
        if(parseInt(props.location.state) === 0){
            redirectAgenda2063 = 1
        }else{
            redirectAgenda2063 = props.location.state
        }
    }
    const [activeTab, setActiveTab] = useState(redirectAgenda2063);

    useEffect(() =>{
        handleA2063Change(activeTab);
    }, [activeTab])

    const parseMapData = (data) => {
        let indicatorData = ''
        const mapData = [];
        data.forEach(function(d){
            if(d.Year === year ){
                if(d[indicator] === ""){
                    indicatorData = null
                }else{
                    indicatorData = parseInt(d[indicator])
                }
                mapData.push({
                    "code": d.Code,
                    "drilldown" : d.Code + "/" + d.Code + "-all",
                    "value": Math.round(parseFloat(indicatorData) * 100) / 100,
                    "country": d.Entity
                })  
            }
        })
        setMapData(mapData);
    }

    const parseChartData = (data) =>{
        const chartData = [];
        data.forEach(function(d){
            if(d.Year === year){
                chartData.push([d.Code, parseInt(d[indicator])]) 
            } 
        })
       return chartData;
    }

    const parseLineData = (data) => {
        let countryLabel = ''
        let lineChartData = []
        years =  years.sort((a, b) => a - b);

        countries.forEach(function(country){
            let countryData = []
            data.forEach(function(d){
                years.forEach(function(year){
                    if(parseInt(year) === parseInt(d.Year) && country.alpha2Code.toLowerCase() === d.Code ){
                        countryData.push(parseInt(d[indicator]))
                    }
                })
            })

            lineChartData.push({
                code: country.alpha2Code,
                name: country.name,
                data: countryData
            })
        })

        setCountryLabel(countryLabel) 
        return lineChartData;
    }

    const parseCountriesRegions = () =>{
        let nodes = []
        regions.forEach(function(region){
            let countriesPerRegion = []
            countries.forEach(function(country){
                if(country.region === region){
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

    useEffect(() => {
        const nodes = parseCountriesRegions()
        setRegionCountries(nodes)
    }, [])

    function handleSdgChildClick(country){
        setMapChartType('chart');
        const code = country.toUpperCase();
        setCountry(code);
        setIsChecked([code])
    }

    useEffect(() => {
        let isSubscribed = true;
        if(dataSource === 'pan'){
            csvDataSourceData = require("../assets/data/a2063/a2063CompiledData.csv");
        }else if (dataSource === 'gdb'){
            csvDataSourceData = require("../assets/data/a2063/a2063CompiledData.csv");
        }

        if(parseInt(activeTab) !== 0){
            const a2063Goals = agenda2063[activeTab-1].goals;
            setGoals(a2063Goals);
            //setGoalID(1)
            let a2063Indicators = []
            a2063Indicators = agenda2063[activeTab-1].goals[goalIndex-1].indicators;
            setIndicators(a2063Indicators);

        }
        getAspirationTitles(aspirationsData);

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
            setChartData(filteredChartData)
        }

        const filterLineData = (myLineData) =>{
            let filteredLineData = []
            isChecked.forEach(function(checked){
                myLineData.forEach(function(data){
                    if(data.code == checked){
                        filteredLineData.push(data)
                    }
                })
            })
            setLineChartData(filteredLineData)
        }

        const loadA2063Data = (sdgCsvFile) => {
            setIsLoading(true);
            Papa.parse(sdgCsvFile, {
                download: true,
                header: true,
                complete: function(results){
                    if(isSubscribed){
                        parseMapData(results.data)
                        const chartData = parseChartData(results.data)
                        filterChartData(chartData);

                        const lineData = parseLineData(results.data);
                        filterLineData(lineData)

                        setIsLoading(false);
                    }
                }
            })
        }
        loadA2063Data(csvDataSourceData);
        return () => isSubscribed = false
    }, [dataSource, indicator, goal, year, activeTab, isChecked, country]);
    
    //Choose Aspiration
    const handleA2063Change = (a2063) => {
        setActiveTab(parseInt(a2063))

        setGoalIndex(agenda2063[activeTab-1].goals[0].id)
        setGoal(agenda2063[activeTab-1].goals[0].number)

        setIndicators(agenda2063[activeTab-1].goals[goalIndex-1].indicators)
        setIndicator(agenda2063[activeTab-1].goals[goalIndex-1].indicators[0])
    }

    //Choose goal
    const handleGoalChange = (e) => {
        const goalIndex = e.target.value
        setGoalIndex(goalIndex)
        setGoal(parseInt(e.target.value))
        setGoalID(parseInt(e.target.value))

        setIndicators(agenda2063[activeTab-1].goals[goalIndex-1].indicators)
        setIndicator(agenda2063[activeTab-1].goals[goalIndex-1].indicators[0])
    }

    //Choose indicator
    const handleIndicatorChange = (e) => {
        setIndicators(agenda2063[activeTab-1].goals[goalIndex-1].indicators)
        setIndicator(e.target.value);
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

    const openModal = (countryId) => {
        setOpenModal(true);
    }
    const closeModal = () => {
        setOpenModal(false);
    }
    const getAspirationTitles = (data) => {
        data.forEach(function(d){
            if(parseInt(activeTab) === d.id){
                setAspirationTitle(d.description)
            }
        })
    }

    const handleCheck = (event) => {
        setIsChecked(event)
    }

    const handleCountryChange = (event) => {
        setCountry(event.target.value);
    }

    return (
       
        <>
       
        <Header onActiveA2063Changed={handleA2063Change}></Header>
            <main className="container agenda2063">
                        <div>
                            <h4 className="aspiration-title p-3"> ASPIRATION  {activeTab} :  {aspirationTitle} </h4>
                        <Row className="mt-4 optionButtons no-gutters">
                            <Col md="2">
                                <Input type="select" name="goalSelect" onChange={handleGoalChange} value={goal}>
                                        {
                                        goals.map((goal, index) =>{
                                        return <option key={index} value={goal.id}> GOAL {goal.number}</option>
                                        })
                                    }
                                </Input>
                            </Col>
                            <Col md="5">
                                <Input type="select" name="indicatorSelect" onChange={handleIndicatorChange} value={indicator}>
                                    {
                                        indicators.map((indicator, index) => {
                                            return <option key={index} value={indicator}> {indicator}</option>
                                        })
                                    }
                                </Input>
                            </Col>

                            {
                                mapChartType === 'line' ? (
                                    <Col md="2">
                                        <Input type="select" name="countrySelect"  onChange={handleCountryChange} value={country}> 
                                                {
                                                     countries.map((country, index) => {
                                                        return <option key={index} value={country.alpha2Code}>{country.name}</option>
                                                    })
                                                }
                                        </Input>
                                    </Col>  
                                ):(
                                    <Col md="2">
                                    <Input type="select" name="yearSelect"  onChange={handleYearChange} value={year}> 
                                            {
                                                years.map((year, index) => {
                                                return <option key={index} value={year}> {year} </option>
                                                })
                                            }
                                    </Input>
                                </Col>   
                                )
                            }
                           
                            <Col md="3" className="lastChild">
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
                                        <Map mySdgData ={mapData} onCountryClick={handleSdgChildClick}></Map>
                                    ) : null
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
                                                            Add a country/ region
                                                    </Button>
                                                </div>
                                                <SdgHighChart myChartData = {chartData} indicator = {indicator} years = {years}></SdgHighChart>
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

                <Container>
                    <Modal size="xl" className="modal-dialog-centered" isOpen={toggleModal}
                        toggle={toggle}  >
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
                   
            </main>
            <Footer></Footer>
        </>
    )


}

export default A2063;