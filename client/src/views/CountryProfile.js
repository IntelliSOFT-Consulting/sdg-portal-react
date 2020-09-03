import React, { useState, useEffect } from "react";
import Header from "../components/countryProfileHeader";
import Footer from "../components/footer";
import CountryDetails from '../components/countryDetails';
import Demographics from "../visualizations/demographics";
import AngularGauge from '../visualizations/angularGauge';

import { Container, Modal, Row, Col, CardImg, Button, Card, CardBody, CardHeader } from "reactstrap";
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMap from "highcharts/modules/map";
import africaMapData from "@highcharts/map-collection/custom/africa.geo.json";

import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import axios from 'axios';
const Papa = require("papaparse/papaparse.min.js");
let countryProfileDataSource = require.context('../assets/data', true);

am4core.useTheme(am4themes_animated);
highchartsMap(Highcharts);

function CountryProfile (props, ) {
    const API_BASE = process.env.REACT_APP_API_BASE;
    const ageBrackets = ["0-4","5-9","10-14","15-19","20-24","25-29","30-34","35-39","40-44","45-49","50-54","55-59","60-64","65-69","70-74","75-79","80-84","85-89","90-94","95-99","100+"]

    const flagImages = require.context('../assets/img/country_flags', true);
    const sdgsData = require('../assets/data/sdgs.json');
    const sdgsImages = require.context('../assets/img/sdg_icons', true);

    const countriesJson = require('../assets/data/trial.json'); 
    const countries = countriesJson.map(country => ({ label: country.name, value: country.code }));
    const dashboardIndicators = require("../assets/data/dashboard.json");
    let dashboardDataSource = require.context('../assets/data', true);

    let country = 0;
    let countryName = '';
    let countryCapital = '';
    let countryFlag = '';
    let countryPoverty = '';
    let countryGDP = '';
    let year = 2019
   
    const [countryProfileMapData, setCountryProfileMapData] = useState([]);
    const [countryProfileData, setCountryProfileData] = useState([]);
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
    const [loading, setLoading] = useState(false);

    const fetchDashboardCsv = (dashboardCsvFile) => {
        let dashData = {}
        setLoading(false)
        Papa.parse(dashboardCsvFile, {
          download: true,
          header: true,
          skipEmptyLines: false,
          complete: function(results){
            dashData = results.data
            setDashboardData(dashData);
            setLoading(false)
            return dashData
          }
        })
      }
    
      const setDashboardApi = (dashData) =>{ 
        setDashboardData(dashData)
      }

      useEffect(() => {   
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
        
        parseDashboardData(activePopup);
      }, [ year, activePopup])
    
      useEffect(() => {
        const fetchDashboardApi = async() =>{ 
          setLoading(true)
          let apiData = []
          let dashData = {}
      
          const result = await axios(API_BASE+'/files');
          apiData =  result.data.data;
          setLoading(false);
          
          if(apiData.length !== 0){
            apiData.forEach(function(d){
              if(d.page === "Dashboard" && d.year === year){
                dashData = d.data
              }
            })
            setDashboardApi(dashData)
          }else{
            let dashboardYear = 'dashboard_' + year
            let dashboardCsvFile = dashboardDataSource(`./${dashboardYear}.csv`);
            fetchDashboardCsv(dashboardCsvFile)
          }
        }
        fetchDashboardApi();
      }, [year])

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

    const parseNormalizedData = (data) => {
        const normalizedData = [];
        data.forEach(function(d){
            normalizedData.push({
                "code": (d.id),
                "value": parseFloat(d.Score),
                "name": d.Country
            })
        })
        setCountryProfileMapData(normalizedData);
    }

    const fetchCountryDetailsCsv = (csv) => {
        let countryDetails = []
        Papa.parse(csv, {
          download: true,
          header: true,
          skipEmptyLines: false,
          complete: function(results){
            countryDetails = results.data
            parseCountryDetails(countryDetails, selectedCountryCode)
          }
        })
      }

      const fetchNormalizedCsv = (csv) => {
        let normalizedData = []
        Papa.parse(csv, {
          download: true,
          header: true,
          skipEmptyLines: false,
          complete: function(results){
            normalizedData = results.data
            parseNormalizedData(normalizedData);
            setCountryProfileData(normalizedData);
          }
        })
      }

      const fetchDemographicsCsv = (csv) => {
        let demographicsData = []
        let parsedDemoData = []
        Papa.parse(csv, {
          download: true,
          header: true,
          skipEmptyLines: false,
          complete: function(results){
            demographicsData = results.data
            parsedDemoData = parseDemographicsData(demographicsData, selectedCountryCode)
            setCountryDemographics(parsedDemoData);
          }
        })
      }

    const parseCountryDetails = (countryDetailsData, countryCode) => {
        countryDetailsData.forEach(function(data){
            if(data.code === countryCode && countryCode !== undefined){
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

    const parseCountryProfileData = async(countryCode) => {
        let apiData = []
        let countryProfileData = {}
        let countryDetailsCsv = countryProfileDataSource(`./countryDetails.csv`);

        const result = await axios(API_BASE+'/files');
        apiData =  result.data.data;
        if(apiData.length !== 0){
            apiData.forEach(function(d){
                if(d.page === "Country Profile" && d.section === 'Country data'){
                    countryProfileData = d.data
                    }
                })
                if(Object.getOwnPropertyNames(countryProfileData).length !== 0){
                    parseCountryDetails(countryProfileData, countryCode);
                    
                }else{
                    fetchCountryDetailsCsv(countryDetailsCsv);
                }
        }else{

            fetchCountryDetailsCsv(countryDetailsCsv);
        } 
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
        return demographicsData;
    }

    const openModal = (countryCode) => {
        setOpenModal(true);
        setSelectedCountryCode(countryCode);
        parseCountryProfileData(countryCode)
    }

    const closeModal = () => {
        setOpenModal(false);
        setSelectedCountryCode(null);
    }

    const openIndicatorsModal = (e) => {
        console.log(e)
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

    const handleChange = selectedOption => {
        setSelectedCountryCode(selectedOption.value);
        setSelectedCountry(selectedOption)
        openModal(selectedOption.value)
    }; 

    useEffect(() => {
        const fetchCountryProfileData = async() =>{
            let apiData = []
            let countryProfileSdgsData = {}
            let demographicsData = {}
            let parsedDemoData = []

            let normalizedCsv = countryProfileDataSource(`./normalizedGoalValues.csv`);
            let demographicsCsv = countryProfileDataSource(`./countriesDemographicData.csv`);

            const result = await axios(API_BASE+'/files');
            apiData =  result.data.data;

            if(apiData.length !== 0){
                apiData.forEach(function(d){
                    if(d.page === "Country Profile" && d.section === 'Goal perfomance'){
                        countryProfileSdgsData = d
                    }else if(d.page === "Country Profile" && d.section === 'Demographics data'){
                        demographicsData = d
                    }
                })

                //SDG goal values
                if(Object.getOwnPropertyNames(countryProfileSdgsData).length !== 0){
                    setCountryProfileData(countryProfileSdgsData.data);
                    parseNormalizedData(countryProfileSdgsData.data);
                }else{
                    fetchNormalizedCsv(normalizedCsv);
                }

                //Demographics data
                if(Object.getOwnPropertyNames(demographicsData).length !== 0){
                    parsedDemoData = parseDemographicsData(demographicsData.data, selectedCountryCode)
                    setCountryDemographics(parsedDemoData);
                }else{
                    fetchDemographicsCsv(demographicsCsv);
                }

            }else{
                fetchNormalizedCsv(normalizedCsv);
                fetchDemographicsCsv(demographicsCsv);
            } 
          }
          parseCountryProfileData(selectedCountryCode);
          fetchCountryProfileData();
    }, [toggleModal, selectedCountryCode ]);

    let code = "hc-a2";
    const mapOptions = {
        chart: {
            map: 'custom/africa',
            backgroundColor: 'transparent',
            height: 550
        },
        credits: {
            enabled: false
        },
        title: {
            text: ''
        },
        legend: {
            enabled: false
        },
        tooltip: {
            formatter: function () {
                return  this.point.name + '<br>' +
                      this.point.value;
            }
        },
        exporting: {
            enabled: false
        },
        plotOptions: {
            series: {
                point: {
                    events: {
                        click: function () {
                            openModal(this.properties[code]);
                        }
                    }
                }
            }
        },
    
        mapNavigation: {},
    
        colorAxis: {
            min: 0,
            minColor: 'rgb(249, 219, 142)',
            maxColor: 'rgb(249, 219, 142)'
        },
    
        series: [{
            data: countryProfileMapData,
            mapData: africaMapData,
            joinBy: ['iso-a2', 'code'],
            name: '',
            cursor: 'pointer',
            borderColor: 'black', //changes color of the country borders
            borderWidth: 0.5,
            states: {
                hover: {
                    color: '#B22222'
                }
            },
            dataLabels: {
                // enabled: true,
                // format: '{point.name}'
            }
        }]
      }

    return(
        <>
        <Header></Header>
            <main className="countryProfile">
                <div className="container">
                    <Row className="country-profile-row">
                    <Col md="6"></Col>
                        <Col md="6">
                          
                        </Col>
                        <Col md="7" >
                            <HighchartsReact
                            constructorType ={'mapChart'}
                            highcharts={Highcharts}
                            options={mapOptions}
                            />
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
                    <Modal size="xl" className="modal-dialog-centered country-profile-modal" isOpen={toggleModal}
                        toggle={toggleModal}  >
                         <div className="modal-header">
                            <h5 className="countryName" cssModule={{'modal-title': 'w-100 text-center'}}>{countryDetailsData.name}</h5>
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
                                            {console.log(countryProfileData)}
                                            <AngularGauge barometerData={countryProfileData} country={countryDetailsData.countryCode} sdg={activeSdg}></AngularGauge>
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
                    </Modal>
                </Container>
                {/* 2nd modal */}
                <Container className="country-profile-indicators-modal">
                    <Modal size="sm" isOpen={toggleIndicatorsModal} toggle={toggleIndicatorsModal} className="dashboard-modal ">
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
                                                return <tr>
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