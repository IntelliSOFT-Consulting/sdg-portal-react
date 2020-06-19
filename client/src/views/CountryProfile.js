import React, { useState, useEffect } from "react";
import Header from "../components/countryProfileHeader";
import Footer from "../components/footer";
import CountryDetails from '../components/countryDetails';
import Demographics from "../visualizations/demographics";
import AngularGauge from '../visualizations/angularGauge';

import { Container, Modal, Row, Col, CardImg, Button, Card, CardBody, CardHeader } from "reactstrap";
import Select from 'react-select';

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMap from "highcharts/modules/map";
import africaMapData from "@highcharts/map-collection/custom/africa.geo.json";

import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import axios from 'axios';

am4core.useTheme(am4themes_animated);
highchartsMap(Highcharts);

function CountryProfile (props, ) {
    const API_BASE = "http://localhost:8080/api"
    const ageBrackets = ["0-4","5-9","10-14","15-19","20-24","25-29","30-34","35-39","40-44","45-49","50-54","55-59","60-64","65-69","70-74","75-79","80-84","85-89","90-94","95-99","100+"]

    const flagImages = require.context('../assets/img/country_flags', true);
    const sdgsData = require('../assets/data/sdgs.json');
    const sdgsImages = require.context('../assets/img/sdg_icons', true);

    const countriesJson = require('../assets/data/trial.json'); 
    const countries = countriesJson.map(country => ({ label: country.name, value: country.code }));

    let country = 0;
    let countryName = '';
    let countryCapital = '';
    let countryFlag = '';
    let countryPoverty = '';
    let countryGDP = '';

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

    const parseCountryProfileData = async(countryCode) => {
        let apiData = []
        let countryProfileData = {}

        const result = await axios(API_BASE+'/files');
        apiData =  result.data.data;
        apiData.forEach(function(d){
        if(d.page === "Country Profile" && d.section === 'Country data'){
            countryProfileData = d.data
            }
        })
        countryProfileData.forEach(function(data){
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

    const handleSdgChange = (e) => {
        setActiveSdg(e.currentTarget.value);
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

            const result = await axios(API_BASE+'/files');
            apiData =  result.data.data;
            
            apiData.forEach(function(d){
              if(d.page === "Country Profile" && d.section === 'Goal perfomance'){
                countryProfileSdgsData = d
              }else if(d.page === "Country Profile" && d.section === 'Demographics data'){
                demographicsData = d
              }
            })
            setCountryProfileData(countryProfileSdgsData.data);
            parseNormalizedData(countryProfileSdgsData.data);

            parsedDemoData = parseDemographicsData(demographicsData.data, selectedCountryCode)
            setCountryDemographics(parsedDemoData);
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
                    <Row>
                        <Col md="12">
                            <Select options={countries} 
                                        placeholder="Search Country or Click on the Map" 
                                        value={selectedCountry}
                                        onChange={handleChange} className="country-profile-search" />
                        </Col>
                        <Col md="8" >
                            <HighchartsReact
                            constructorType ={'mapChart'}
                            highcharts={Highcharts}
                            options={mapOptions}
                            />
                        </Col>
                        <Col md="4" className="country-profile-text">
                            {/* <h5 className="country-profile-title" > AFRICAN COUNTRIES PROFILE </h5> */}
                            <p>
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
                                                                <Button onClick={handleSdgChange} value={sdgIndex}>
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
        </main>
        <Footer></Footer>
        </>
    )
    }

export default CountryProfile;