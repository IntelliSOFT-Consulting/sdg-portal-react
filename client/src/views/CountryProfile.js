import React, { useState, useEffect } from "react";
import Header from "../components/countryProfileHeader";
import Footer from "../components/footer";
import CountryDetails from '../components/countryDetails';
import Demographics from "../visualizations/demographics";
import AngularGauge from '../visualizations/angularGauge';
import Spinner from "../visualizations/spinner";
import CountryProfileMap from '../visualizations/countryProfileMap';

import { Container, Modal, Row, Col, CardImg, Button, Card, CardBody, CardHeader } from "reactstrap";
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import axios from 'axios';
const Papa = require("papaparse/papaparse.min.js");
let countryProfileDataSource = require.context('../assets/data', true);

am4core.useTheme(am4themes_animated);


function CountryProfile (props, ) {
    const API_BASE = process.env.REACT_APP_API_BASE;
    const ageBrackets = ["0-4","5-9","10-14","15-19","20-24","25-29","30-34","35-39","40-44","45-49","50-54","55-59","60-64","65-69","70-74","75-79","80-84","85-89","90-94","95-99","100+"]

    const flagImages = require.context('../assets/img/country_flags', true);
    const sdgsData = require('../assets/data/sdgs.json');
    const sdgsImages = require.context('../assets/img/sdg_icons', true);
    
    const countriesJson = require('../assets/data/countryprofile/countries.json');
    const countries = countriesJson.map(country => ({ label: country.name, value: country.code }));

    const dashboardIndicators = require("../assets/data/dashboard.json");
    let dashboardDataSource = require.context('../assets/data/dashboard', true);

    let country = 0;
    let countryName = '';
    let countryCapital = '';
    let countryFlag = '';
    let countryPoverty = '';
    let countryGDP = '';
    let year = 2019

    const [mapData, setMapData] = useState([]);
    const [barometerData, setBarometerData] = useState([]);
    const [activeSdg, setActiveSdg] = useState(18);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [countryDemographics, setCountryDemographics] = useState([]);
    const [countryDetailsData, setCountryDetailsData] = useState({})

    if (props.location.state != null){
        country = props.location.state;
    }

    const [selectedCountryCode, setSelectedCountryCode] = useState(country.value);
    const [toggleModal, setOpenModal] = useState(country ? true: false);

    const [dashboardData, setDashboardData] = useState([]);
    const [toggleIndicatorsModal, setOpenIndicatorsModal] = useState(false);
    const [dashboardPopupData, setModalPopupData] = useState([]);
    const [dashboardPopupIndicators, setDashboardPopupIndicators] = useState([]);
    const [dashboardPopupIndicatorsData, setDashboardPopupIndicatorsData] = useState([]);
    const [activePopup, setActivePopup] = useState('');
    const [loading, setLoading] = useState(true);
    const [loadingPopup, setLoadingPopup] = useState(false);

    const toggle = () => setOpenModal(!toggleModal);
    const toggleDashboard = () => setOpenIndicatorsModal(!toggleModal);

    //Country click
    function handleSdgChildClick(country){
        setSelectedCountry(country)
        setSelectedCountryCode(country)
        openModal(country)
    }

    //Country select
    const handleChange = selectedOption => {
        setSelectedCountryCode(selectedOption.value);
        setSelectedCountry(selectedOption)
        openModal(selectedOption.value)
    }; 

    //Modal
    const openModal = (countryCode) => {
        setLoadingPopup(true)
        setTimeout(() => {
            setOpenModal(true);
            setLoadingPopup(false)
        }, 350);

        //setOpenModal(true);
        setSelectedCountryCode(countryCode);
        parseCountryProfileData(countryCode)
    }

    const closeModal = () => {
        setOpenModal(false);
        setSelectedCountryCode(null);
    }

    const openIndicatorsModal = (e) => {
        setActivePopup(e.currentTarget.value);
        setOpenIndicatorsModal(true);
    }

    const closeIndicatorsModal = () => {
        setOpenIndicatorsModal(false);

    }

    const handleSdgChange = (e) => {
        let countrySdg = e.currentTarget.value
        let n = countrySdg.length;
          let countryCode = countrySdg.slice(0,2);
          let sdgNumber = countrySdg.slice(2,n);
        setActiveSdg(sdgNumber);
        openIndicatorsModal(e)
    }

    const getShortHand = (goalNo) => {
        var shortHand
        switch(goalNo){
            case 1:
                shortHand = ' No Poverty'
                break
            case 2:
                shortHand = ' Zero Hunger'
                break
            case 3:
                shortHand = ' Good Health and Well Being'
                break
            case 4:
                shortHand = ' Quality Education'
                break
            case 5:
                shortHand = ' Gender Equality'
                break
            case 6:
                shortHand = ' Clean Water & Sanitation '
                break
            case 7:
                shortHand = ' Affordable And Clean Energy'
                break
            case 8:
                shortHand = ' Decent Work And Economic Growth'
                break
            case 9:
                shortHand = ' Industry, Innovation And Infrastructure'
                break
            case 10:
                shortHand = ' Reduced Inequalities'
                break
            case 11:
                shortHand = ' Sustainable Cities And Communities'
                break
            case 12:
                shortHand = ' Responsible Consumption and Production'
                break
            case 13:
                shortHand = ' Climate Action'
                break
            case 14:
                shortHand = ' Life Below Water'
                break
            case 15:
                shortHand = ' Life On Land'
                break
            case 16:
                shortHand = ' Peace, Justice And Strong Institutions'
                break
            case 17:
                shortHand = ' Partnership For The Goals'
                break
            default:
              shortHand = 'No poverty'
        }
        return shortHand;
    }

    const parseCountryProfileData = async(countryCode) => {
        let apiData = []
        let countryProfileData = {}
        let countryDetailsCsv = countryProfileDataSource(`./countryDetails.csv`);

        const result = await axios(API_BASE+'/files');
        apiData =  result.data.data; 
    }

    const parseMapData = (data) => {
        setBarometerData(data)
        const mapdata = [];
        data.forEach(function(d){
            parseFloat(d.Score)
            if(d.Country ){
                mapdata.push({
                    "code": (d.id).toUpperCase(),
                    "value": parseFloat(d.Score),
                    "name": d.Country
                })
            }
        })
        setMapData(mapdata);
    }

    const parseCountryDetails = (countriesData, countryCode) =>{
        countriesData.forEach(function(data){
            if(data.code === countryCode && countryCode !== undefined && data.id){
                let imgSrc = flagImages(`./${data.flagURL}.png`);
                countryName = data.name;
                countryCapital = data.capital;
                countryPoverty = data.povertyLine
                countryGDP = data.gdpPerCapita
                countryFlag = imgSrc;
                countryCode = data.code
            }
        })

        setCountryDetailsData({
            "id": 0,
            "name": countryName,
            "capital":countryCapital,
            "region":"",
            "flagURL":countryFlag,
            "size":0,
            "povertyLine":countryPoverty,
            "gdpPerCapita":countryGDP,
            "countryCode": countryCode
        });
    }

    const parseDemographicsData = (data, countryCode) => {
        const demographicsData = []
        data.forEach(function(d){
            ageBrackets.forEach(function(ageBracket, index){
                if(d.Code === countryCode && d.Sex === "Female"){
                    demographicsData.push({
                        "age" : ageBracket,
                        "female" :  parseInt(d[ageBracket])
                    })
                }
                if(d.Code === countryCode && d.Sex === "Male"){
                    demographicsData[index]["male"] = parseInt(d[ageBracket])
                }
            })
        })
        setCountryDemographics(demographicsData);
        //return demographicsData;
    }

    const parseDashboardData = (countrySdg) => {
        let indicatorsNames = []
        let indicatorData = [];
        let n = countrySdg.length;
        let countryCode = countrySdg.slice(0,2);
        let sdgNumber = countrySdg.slice(2,n);
        dashboardData.forEach(function(data){
          if(data.code == countryCode.toLowerCase()){
            dashboardIndicators.forEach(function(dashboardIndicator){
              if(dashboardIndicator.id === parseInt(sdgNumber)){
                setDashboardPopupIndicators(dashboardIndicator.indicators);
                indicatorsNames = dashboardIndicator.indicators
    
                indicatorsNames.forEach(function(ind){
                  let indicatorsNameArr = ind.indicator.split("_");
                  let indicatorKey = ind.indicator
                  let sdgColor = 'Dashboard Color ' + indicatorsNameArr[1] + "_"  + indicatorsNameArr[2]
                  if(year === 2019){
                    sdgColor = 'col_' + indicatorsNameArr[1] + "_"  + indicatorsNameArr[2];
                    indicatorKey = indicatorsNameArr[1] + "_"  + indicatorsNameArr[2]
                  }
  
                  let rounded_off_val = 0
                  if(data[indicatorKey] !== null || data[indicatorKey] !== '' || data.hasOwnProperty('indicatorKey')){
                    rounded_off_val = parseInt(Math.round(data[indicatorKey] * 10) / 10) || 0
                  }else{
                    rounded_off_val = 0
                  }

                  indicatorData.push({
                    "title": ind.title,
                    "value": rounded_off_val,
                    "color": data[sdgColor]
                  })
                  setDashboardPopupIndicatorsData(indicatorData)
                })
              }
            })
           
            setModalPopupData({
              "country": data.Country,
              "color": data['sdg'+sdgNumber],
              "indicator": sdgNumber,
              "shorthand" : getShortHand( parseInt(sdgNumber)),
              "indicators": dashboardPopupIndicators
            })
          }
        }) 
      }

    const fetchApiData = async() => {
        const result = await axios(API_BASE+'/files');
        const apiData =  result.data.data;
        return apiData
    }

    const fetchNormalizedCsv = (csv) => {
        let normalizedData = []
        Papa.parse(csv, {
          download: true,
          header: true,
          skipEmptyLines: true,
          complete: function(results){
            normalizedData = results.data
            parseMapData(normalizedData);
           setLoading(false)
          }
        })
    }

    const fetchCountryDetailsCsv = (csv) => {
        let countryDetails = []
        Papa.parse(csv, {
          download: true,
          header: true,
          skipEmptyLines: true,
          complete: function(results){
            countryDetails = results.data
            parseCountryDetails(countryDetails, selectedCountryCode)
          }
        })
    }

    const fetchDemographicsCsv = (csv) => {
        let demographicsData = []
        let parsedDemoData = []
        Papa.parse(csv, {
          download: true,
          header: true,
          skipEmptyLines: true,
          complete: function(results){
            demographicsData = results.data
            parseDemographicsData(demographicsData, selectedCountryCode)
          }
        })
    }

    const fetchDashboardCsv = (dashboardCsvFile) => {
        let dashData = {}
        //setLoading(false)
        Papa.parse(dashboardCsvFile, {
          download: true,
          header: true,
          skipEmptyLines: true,
          complete: function(results){
            dashData = results.data
            setDashboardData(dashData);
           // setLoading(false)
            return dashData
          }
        })
      }

    useEffect(() => {
        //setLoading(true)
        // localStorage.removeItem('normalizedData')
        // localStorage.removeItem('countryDetailsData')
        // localStorage.removeItem('demographicsData')

        let normalizedCsv = countryProfileDataSource(`./countryprofile/normalizedGoalValues.csv`);
        let countryDetailsCsv = countryProfileDataSource(`./countryprofile/countryDetails.csv`);
        let demographicsCsv = countryProfileDataSource(`./countryprofile/countriesDemographicData.csv`);

        const cachedNormalizedData = localStorage.getItem('normalizedData');
        const cachedCountryDetailsData = localStorage.getItem('countryDetailsData');
        const cachedDemographicsData = localStorage.getItem('demographicsData');

        let normalizedApiData = {}
        let demographicsData = {}
        let countriesData = {}

        if(cachedNormalizedData && cachedCountryDetailsData && cachedDemographicsData){
            console.log("There is cached data for all");
            parseMapData(JSON.parse(cachedNormalizedData));  
            setLoading(false);
            parseCountryDetails(JSON.parse(cachedCountryDetailsData),selectedCountryCode );
            parseDemographicsData(JSON.parse(cachedDemographicsData, selectedCountryCode)); 
        }else{
            if(cachedNormalizedData){
                console.log("Only cached data for normalized")
                parseMapData(JSON.parse(cachedNormalizedData)); 
                setLoading(false);

                fetchApiData().then(function(apiData){
                    if(apiData.length !== 0){
                        apiData.forEach(function(d){
                            if(d.page === "Country Profile" && d.section === 'Demographics data'){
                                demographicsData = d.data
                            }else if(d.page === "Country Profile" && d.section === 'Country data'){
                                countriesData = d.data
                            }

                            if(Object.getOwnPropertyNames(countriesData).length !== 0){
                                parseCountryDetails(countriesData);
                                localStorage.setItem('countryDetailsData', JSON.stringify(countriesData));
                            }else{
                                fetchCountryDetailsCsv(countryDetailsCsv);
                            }
        
                            if(Object.getOwnPropertyNames(demographicsData).length !== 0){
                                parseDemographicsData(demographicsData); 
                                localStorage.setItem('demographicsData', JSON.stringify(demographicsData));
                            }else{
                                fetchDemographicsCsv(demographicsCsv);
                            }
                        })
                    }else{
                        fetchCountryDetailsCsv(countryDetailsCsv);
                        fetchDemographicsCsv(demographicsCsv);
                    }
                })
            }else{
                console.log("No cached data so we fetch beginning with the API")
                
                fetchApiData().then(function(apiData){
                    if(apiData.length !== 0){
                        console.log("Yaay api data")
                        apiData.forEach(function(d){
                            if(d.page === "Country Profile" && d.section === 'Goal perfomance'){
                                normalizedApiData = d.data
                            }else if(d.page === "Country Profile" && d.section === 'Demographics data'){
                                demographicsData = d.data
                            }else if(d.page === "Country Profile" && d.section === 'Country data'){
                                countriesData = d.data
                            }

                            if(Object.getOwnPropertyNames(normalizedApiData).length !== 0){
                                console.log("Yaay api data, cache normalized data")
                                parseMapData(normalizedApiData);
                                localStorage.setItem('normalizedData', JSON.stringify(normalizedApiData));
                            }else{
                                fetchNormalizedCsv(normalizedCsv);
                            }

                            if(Object.getOwnPropertyNames(countriesData).length !== 0){
                                console.log("Yaay api data, cache country details")
                                parseCountryDetails(countriesData);
                                localStorage.setItem('countryDetailsData', JSON.stringify(countriesData));
                            }else{
                                console.log("Revert to CSV for country details data")
                                fetchCountryDetailsCsv(countryDetailsCsv);
                            }
        
                            if(Object.getOwnPropertyNames(demographicsData).length !== 0){
                                console.log("Yaay api data, cache demographics data")
                                parseDemographicsData(demographicsData); 
                                localStorage.setItem('demographicsData', JSON.stringify(demographicsData));
                            }else{
                                console.log("Revert to CSV for demographics data")
                                fetchDemographicsCsv(demographicsCsv);
                            }
                        })
                    }else{
                        console.log("No api data, revert to csv files")
                        fetchNormalizedCsv(normalizedCsv);
                        fetchCountryDetailsCsv(countryDetailsCsv);
                        fetchDemographicsCsv(demographicsCsv);
                    }
                })
            }
        }

        // fetchApiData().then(function(apiData){
        //     //Getting API data
        //     if(apiData.length !== 0){
        //         apiData.forEach(function(d){

        //             //Normalized data and goal perfomance
        //             if(d.page === "Country Profile" && d.section === 'Goal perfomance'){
        //                 normalizedApiData = d.data
        //             }else if(d.page === "Country Profile" && d.section === 'Demographics data'){
        //                 demographicsData = d
        //                 console.log(demographicsData)
        //                 //Country details data
        //             }else if(d.page === "Country Profile" && d.section === 'Country data'){
        //                 countryData = d
        //                 //localStorage.setItem('normalizedData', JSON.stringify(countryData.data));
        //             }

        //             if(Object.getOwnPropertyNames(normalizedApiData).length !== 0){
        //                 parseMapData(normalizedApiData)
        //             }else{
        //                 fetchNormalizedCsv(normalizedCsv);
        //                 fetchCountryDetailsCsv(countryDetailsCsv);
        //                 fetchDemographicsCsv(demographicsCsv);
        //             }
        //         })
        //     }else{
        //         fetchNormalizedCsv(normalizedCsv);
        //         fetchCountryDetailsCsv(countryDetailsCsv);
        //         fetchDemographicsCsv(demographicsCsv);
        //     }
        // })
    }, [selectedCountryCode])

    useEffect(() => {
        let dashboardYear = 'dashboard_' + year
        let dashboardCsvFile = dashboardDataSource(`./${dashboardYear}.csv`);
        fetchDashboardCsv(dashboardCsvFile)
    }, [year])

    useEffect(() => {   
        parseDashboardData(activePopup);
    }, [ year, activePopup])

    return(
        <>
          { console.log(loadingPopup)}
        <Header></Header>
            <main className="countryProfile">
                <div className="container">
                    <Row className="country-profile-row">
                    <Col md="6"></Col>
                        <Col md="6">
                          
                        </Col>
                        <Col md="7" >
                            {
                                loading ? (
                                    <Spinner></Spinner>
                                
                                ):(
                                    <CountryProfileMap myCountryProfileData={mapData} onCountryClick={handleSdgChildClick}></CountryProfileMap>
                                )
                            }
                            
                        </Col>
                        <Col md="5" >
                        <Select options={countries} 
                                        placeholder="Search Country or Click on the Map" 
                                        value={selectedCountry}
                                        onChange={handleChange} className="country-profile-search" />
                            {/* <h5 className="country-profile-title" > AFRICAN COUNTRIES PROFILE </h5> */}
                            <p className="country-profile-text"> 
                            Africa SDG Watch is a public platform to visualize and explore data, benchmark progress 
                            towards the SDGs and track performance of development indicators.
                            </p>
                        </Col>
                    </Row>
                   
                        
                </div>
                <Container>
                
                    {
                        loadingPopup ? (
                            <div className="country-spinner-div">
                                <Spinner  className="country-profile-popup-spinner"></Spinner>
                            </div>
                            
                        ):(
                            <Modal size="xl" className="modal-dialog-centered country-profile-modal" isOpen={toggleModal}
                            toggle={toggle}>
                                <div>
                                    <div className="modal-header">
                                        <h5 className="countryName" cssmodule={{'modal-title': 'w-100 text-center'}}>{countryDetailsData.name}</h5>
                                        <button aria-label="Close" className="close" data-dismiss="modal" type="button"
                                            onClick={closeModal} >
                                            <span aria-hidden={true}>×</span>
                                        </button>
                                    </div>
                                    <div className="modal-body" >
                                        <CountryDetails countryData={countryDetailsData}></CountryDetails>
                                        <Row className="pt-2">
                                            <Col lg="6" md="12">
                                                <Card className="sdg-goal-card">
                                                    <CardHeader> 
                                                        <h5 className="display-4 text-center">SDGs </h5>
                                                    </CardHeader>
                                                    <CardBody>
                                                        <Row className="no-gutters sdgImages" >
                                                            {sdgsData.map(function(sdg, index){
                                                                let  imgSrc = sdgsImages(`./${sdg.image}.jpg`)
                                                                let sdgIndex = index+1;
                                                                return <Col md="2" sm="4" key={sdgIndex}>
                                                                            <Button onClick={handleSdgChange} value={countryDetailsData.countryCode + sdgIndex}>
                                                                                <CardImg className="countryProfileSdgsImg" alt={index} src={ imgSrc }></CardImg>  
                                                                            </Button>   
                                                                        </Col>
                                                            })}
                                                        </Row>
                                                    </CardBody>
                                                
                                                </Card>
                                            </Col>
                                            <Col lg="6" md="12">
                                                <Card>
                                                    <CardHeader> 
                                                        <h5 className="display-4 text-center">Perfomance by Goal </h5> 
                                                    </CardHeader>
                                                    <CardBody>
                                                        <AngularGauge barometerData={barometerData} country={countryDetailsData.countryCode} sdg={activeSdg}></AngularGauge>
                                                    </CardBody>
                                                
                                                    
                                                </Card>
                                            </Col>
                                        </Row>
                                        <Row className="mb-2">
                                            <Col className="mt-4"> 
                                                <Card className="demographics-card">
                                                    <CardHeader>
                                                    <h5 className="display-4 text-center">Country Demographics </h5>
                                                    </CardHeader>
                                                    <CardBody>
                                                    
                                                        <Demographics demographicsData={countryDemographics}></Demographics>
                                                    </CardBody>
                                                </Card>   
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                                </Modal>
                       
                        )
                    }
                    
                   
                </Container>
                {/* 2nd modal */}
                <Container className="country-profile-indicators-modal">
                    <Modal size="sm" isOpen={toggleIndicatorsModal} toggle={toggleDashboard} className="dashboard-modal ">
                        <div className="modal-header">
                            <h5 className="modal-title dashboardCountryName">{countryDetailsData.name}  </h5>
                            <button aria-label="Close" className="close" data-dismiss="modal" type="button"
                                    onClick={closeIndicatorsModal} >
                                    <span aria-hidden={true}>×</span>
                                </button>
                        </div>
                        <div className="modal-body">
                            <Container>
                                <Row className="p-2">
                                        <h6> SDG { dashboardPopupData.indicator} <FontAwesomeIcon icon="circle" color={dashboardPopupData.color} /> </h6>
                                    
                                        <table className="dashboardDetailsTable">
                                        <thead>
                                            <tr>
                                            <th className="indicatorCol">{dashboardPopupData.shorthand}</th>
                                            <th className="valueCol">Value</th>
                                            <th className="ratingCol">Rating</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            dashboardPopupIndicatorsData.map(function(dashboardInd, index){
                                                return <tr key={index}>
                                                <td>{dashboardInd.title}</td>
                                                <td className="valueData">{dashboardInd.value}</td>
                                                <td className="ratingData">  <FontAwesomeIcon icon="circle" color={dashboardInd.color} /> </td>
                                                </tr>
                                            })
                                            }

                                        
                                        </tbody>
                                        </table>
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

export default CountryProfile;