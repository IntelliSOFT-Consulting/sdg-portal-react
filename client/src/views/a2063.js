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
    const [mapChartType, setMapChartType] = useState('line');
    const [country, setCountry] = useState('DZ');
    const [aspirationTitle, setAspirationTitle] = useState('');
    const [toggleModal, setOpenModal] = useState(false);
    const [isChecked, setIsChecked] = useState(["DZ", "AO", "BJ", "BW", "CM", "BI"])
    const isExpanded = ["North", "West", "Southern", "Central", "East"]
    const [regionCountries, setRegionCountries] = useState([])
    const [indicators, setIndicators] = useState([]);
    const [countryLabel,setCountryLabel] = useState('')

    const a2063Keys = ["Indicator 1: Gross National Income (GNI) per capita","Indicator 2: Unemployment rate","Indicator 3: Prevalence of underweight among children under 5","Indicator 4: Percentage of population with access to safe drinking water","Indicator 5: Percentage of household with access to electricity","Indicator 6: Percentage of household using electricity","Indicator 7: Percentage of population with access to the internet","Indicator 8: Percentage of population using internet","Indicator 9: Percentage of children in pre-school age attending preschool","Indicator 10: Net enrolment rate in basic education level","Indicator 11: Proportion of teachers qualified in Science or Technology or Engineering or Mathematics (STEM)","Indicator 12: Secondary school net enrolment rate.","Indicator 13: Percentage of women in the reproductive age 15-49 who have access to sexual and reproductive health service","Indicator 14: Maternal mortality ratio","Indicator 15: Neonatal mortality rate (per 1,000 live births)","Indicator 16: Under five mortality rate","Indicator 17: Percentage of deliveries attended by skilled health personnel","Indicator 18: Number of new HIV infections per 1000 population","Indicator 19: TB incidence per 100,000","Indicator 20: Malaria incidence per 1000 per year","Indicator 21: Percentage of eligible population with HIV having access to ARV treatment","Indicator 22: Real GDP % Growth","Indicator 23: Manufacturing Value Added (as percentage of GDP)","Indicator 24: Research and development expenditure as a proportion of GDP","Indicator 25: Tourism value added as a proportion of GDP","Indicator 26: Total Factor Productivity (TFP)","Indicator 27: Percentage of small-scale farmers graduating into small-scale commercial farming","Indicator 28: Fisheries Sector Value added (as share of GDP)","Indicator 29: Marine-biotechnology value added (as share of GDP)","Indicator 30: Percentage of agricultural land placed under sustainable land management practice","Indicator 31: ","Indicator 32: No. of Non-tariff barriers (NTBs) reported and eliminated","Indicator 33 : Percentage change in volume of intra-African Trade","Indicator 34: Percentage of progress made on the implementation of trans Africa highway missing link","Indicator 35: Percentage of the progress made on the implementation of the African High Speed Rail Network","Indicator 36: No. of protocols on African open skies Implemented","Indicator 37: Number of additional Mega Watts added onto the national grid","Indicator 38: Proportion of population using mobile phones","Indicator 39: ICT Sector Value Addition as share of GDP","Indicator 40: Percentage of people who believe that there are effective mechanisms and oversight institutions to hold their leaders accountable","Indicator 41: Percentage of people who perceive that there is freedom of the press.","Indicator 42: Percentage of people who believe that the elections are free, fair and transparent.","Indicator 43: Proportion of persons who had at least one contact with a public official and asked or paid a bribe during the previous twelve months","Indicator 44: Conflict related deaths per 100,000 population","Indicator 45: Existence of a national peace council (Need to review the indicator with the view to understand its function, composition and roles)","Indicator 46: Proportion of the content of the curricula on indigenous African culture, values and language in primary and secondary schools","Indicator 47: Proportion of total agricultural population with ownership or secure rights over agricultural land.","Indicator 48: Proportion of seats held by women in national parliaments, regional and local bodies","Indicator 49: Proportion of women and girls subjected to sexual and physical violence [SM5]","Indicator 50: Proportion of girls and women aged 15-49 years who have gone undergone Female Genital Mutilation/Cutting (FGM/C)[SM6]","Indicator 51: The proportion of children whose births are registered within the first year","Indicator 52: Unemployment rate","Indicator 53: Percentage of Children engaged in Child Labour","Indicator 54: Percentage of children engaged in child marriages","Indicator 55: Percentage of children who are victims of human trafficking","Indicator 56: Level of implementation of the provisions in the African Charter on the Rights of the Youth by Member States","Indicator 57: Availability of legislation on statistics that complies with fundamental principles of official statistics","Indicator 58: Proportion of funding allocated for the implementation of functional statistical system","Indicator 59: Existence of formal institutional arrangements for the coordination of the compilation of official statistics","Indicator 60: Proportion of public sector budget funded by national capital markets","Indicator 61: Total tax revenue as a percentage of GDP","Indicator 62: Total ODA as a percentage of the national budget","Indicator 63: Resources raised through innovative financing mechanisms as a percentage of national budget"];

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
                        value: country.name,
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
        setCountry(country);
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