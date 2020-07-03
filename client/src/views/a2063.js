import React, {useState, useEffect} from "react";
import {
    Row, Col, Input, Button, Label, Container, Modal
} from "reactstrap";
import CheckboxTree from 'react-checkbox-tree';
import classnames from "classnames";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Header from "../components/a2063Header";
import Footer from "../components/footer";
import SdgMap from "../visualizations/sdgMap";
import SdgHighChart from "../visualizations/a2063HighChart";
import IndexMap from "../visualizations/indexMap";
import TreeMap from "../visualizations/highTreeMap";
import Spinner from "../visualizations/spinner";
import LineChart from "../visualizations/lineChart";

function A2063(props){
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
    const [goals, setGoals] = useState([]);
    const [goalID, setGoalID] = useState(1);
    const [indicator, setIndicator] = useState(1);
    const [indicators, setIndicators] = useState([]);
    const [firstIndicator, setFirstIndicator] = useState('');

    let   years = [2019];
    const [year, setYear] = useState('2006');
    const [dataSource, setDataSource] = useState('pan');
    const [mapChartType, setMapChartType] = useState('map');
    const [indexMapData, setIndexMapData] = useState([]);
    const [country, setCountry] = useState('DZ');
    const [aspirationTitle, setAspirationTitle] = useState('');
    const [toggleModal, setOpenModal] = useState(false);
    const [isChecked, setIsChecked] = useState(["DZ", "AO", "BJ", "BW", "CM", "BI"])
    const isExpanded = ["North", "West", "Southern", "Central", "East"]
    const [regionCountries, setRegionCountries] = useState([])

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

    const handleA2063Change = (a2063) => {
        setGoal(1)
        setActiveTab(parseInt(a2063))
        setIndicator(firstIndicator)
    }

    useEffect(() =>{
        handleA2063Change(activeTab);
    }, [activeTab])

   

    const parseMapData = (data) => {
        const mapData = [];
        data.forEach(function(d){
            mapData.push({
                "code": (d.id),
                "value": Math.round(parseFloat(d.Score) * 100) / 100,
                "name": d.Country
            })
        })
        setMapData(mapData);
    }

    const parseChartData = (data) =>{
        const chartData = [];
        data.forEach(function(d){
            chartData.push([d.id, parseInt(d.Score)])  
        })
       return chartData;
    }

    const parseLineData = (data) => {
        let countryData = []
        years =  years.sort((a, b) => a - b);
        data.forEach(function(d){
                if(country.toLowerCase() === d.id){
                    countryData.push(parseInt(d[indicator]))
                }   
             
        })
        setLineChartData(countryData); 
    }

    const parseNormalizedData = (data) => {
        const goals = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17'];
        const mapData = [];
        const radarData = [];

        data.forEach(function(d){
            mapData.push({
                "code": (d.id),
                "value": Math.round(parseFloat(d.Score) * 100) / 100,
                "name": d.Country
            })
        })
        goals.forEach(function(goal) {
            data.forEach(function(d){
                if(country === d.id){
                    radarData.push({
                        "category": goal,
                        value1 : d["goal"+goal],
                    })
                }
            })
        })
        setIndexMapData(mapData);
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
    function handleSdgChildClick(country){
        setMapChartType('line');
        setCountry(country);
    }

    useEffect(() => {
        const nodes = parseCountriesRegions()
        setRegionCountries(nodes)
    }, [])

    useEffect(() => {
        console.log(activeTab)
        let isSubscribed = true;
        if(dataSource === 'pan'){
            csvDataSourceData = require("../assets/data/a2063DummyData.csv");
        }else if (dataSource === 'gdb'){
            csvDataSourceData = require("../assets/data/a2063DummyData.csv");
        }

        if(parseInt(activeTab) !== 0){
            const a2063Goals = agenda2063[activeTab-1].goals;
            setGoals(a2063Goals);
            setGoalID(1)

            let a2063Indicators = []
            a2063Indicators = agenda2063[activeTab-1].goals[goalID-1].indicators;
            setIndicators(a2063Indicators);
            setFirstIndicator(a2063Indicators[0])
            
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

        const loadSdgData = (sdgCsvFile) => {
            setIsLoading(true);
            Papa.parse(sdgCsvFile, {
                download: true,
                header: true,
                complete: function(results){
                    if(isSubscribed){
                        parseMapData(results.data)
                        const chartData = parseChartData(results.data)
                        filterChartData(chartData);
                        parseLineData(results.data);
                        setIsLoading(false);
                    }
                }
            })
        }
        loadSdgData(csvDataSourceData);
        return () => isSubscribed = false
    }, [dataSource, indicator, goal, year, activeTab, isChecked]);

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

    
    const handleGoalChange = (e) => {
        setGoal(parseInt(e.target.value))
        setGoalID(parseInt(e.target.value))
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

    const openModal = (countryId) => {
        setOpenModal(true);
    }
    const closeModal = () => {
        setOpenModal(false);
    }
    function handleIndexChildClick(country){
        setCountry(country);
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
                                            return <option key={index} value={indicator}> INDICATOR {indicator}</option>
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
                                        <SdgMap mySdgData ={mapData} onCountryClick={handleSdgChildClick}></SdgMap>
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
                                                {/* <Button className="btn-link ml-1 add-country-btn" color="info" type="button" onClick={openModal}>
                                                        <i className="fa fa-plus-circle mr-1" />
                                                        Add a country
                                                </Button> */}
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
                {/* //     ):(
                //         <div>
                //             <Row className="mt-4 optionButtons ">
                //                 <Col>
                //                     <Label className="all-sdgs-label">ALL ASPIRATIONS </Label>
                //                 </Col>
                //                 <Col>
                //                     <Input type="select" name="yearSelect"  onChange={handleYearChange} value={year}> 
                //                             {
                //                                 years.map((year, index) => {
                //                                 return <option key={index} value={year}> {year} </option>
                //                                 })
                //                             }
                //                     </Input>
                //                 </Col>   
                //                 <Col className="lastChild">
                //                     <Input type="select" name="datasourceSelect" onChange={handleDataSourceChange} value={dataSource}>
                //                             <option value="gdb">Global Database</option>
                //                             <option value="mrs">PanAfrican MRS</option>
                //                     </Input>
                //                 </Col>      
                //             </Row>
                //             <Row>
                //                 <Col lg="6" md="6" sm="12" xs="12">
                //                     <IndexMap mySdgData ={indexMapData} onCountryClick={handleIndexChildClick}></IndexMap>
                //                 </Col>
                //                 <Col lg="6" md="6" sm="12" xs="12">
                //                     <TreeMap treeMapData = {aspirationsData} ></TreeMap>
                //                 </Col>
                //             </Row>
                //         </div>
                //     )
                // } */}

                <Container>
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