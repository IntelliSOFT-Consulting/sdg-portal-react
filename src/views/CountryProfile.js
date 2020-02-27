import React, { useState, useEffect } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Gauge from "../visualizations/gauge";
import Demographics from "../visualizations/demographics";
import Barometer from "../visualizations/barometer";

import {
    Container,
    Modal,
    Row,
    Col,
    CardImg,
    Button, Card, CardBody, CardHeader
} from "reactstrap";
import Select from 'react-select';


import {
    Link
} from "react-router-dom";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMap from "highcharts/modules/map";
import africaMapData from "@highcharts/map-collection/custom/africa.geo.json";

import CountryProfileMap from "../visualizations/sdgMap";

import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

const data = require('../assets/data/trial.json');
highchartsMap(Highcharts);

function CountryProfile (props, ) {
    const flagImages = require.context('../assets/img/country_flags', true);
    const sdgsData = require('../assets/data/sdgs.json');
    const sdgsImages = require.context('../assets/img/sdg_icons', true);
    const countriesData = require('../assets/data/countryProfile.json');
    const Papa = require("papaparse/papaparse.min.js");

    let country = 0;
    let countryName = '';
    let countryCapital = '';
    let countryFlag = '';
    let countryPoverty = '';
    let countryGDP = '';

    const [countryProfileMapData, setCountryProfileMapData] = useState([]);
    const [countryProfileData, setCountryProfileData] = useState([]);
    const [activeSdg, setActiveSdg] = useState(18);

    const countriesJson = require('../assets/data/trial.json');
    const countries = countriesJson.map(country => ({ label: country.name, value: country.code }));
    const [selectedCountry, setSelectedCountry] = useState('');

    if (props.location.state != null){
        country = props.location.state;
        countriesData.forEach(function(data){
            if(data.code == country.value){
                let imgSrc = flagImages(`./${data.flagURL}.png`);
                countryName = data.name;
                countryCapital = data.capital;
                countryPoverty = data.povertyLine
                countryGDP = data.gdpPerCapita
                countryFlag = imgSrc;
            }
        })
        }

    // Modal operations
    const [toggleModal, setOpenModal] = useState(country ? true: false);
    const [countryData, setCountryData] = useState(country ? {
        "id": 0,
        "name": country.label,
        "capital":countryCapital,
        "region":"",
        "flagURL":countryFlag,
        "size":0,
        "povertyLine":countryPoverty,
        "gdpPerCapita":countryGDP
        } : {
        "id": 0,
        "name": "",
        "capital":"",
        "region":"",
        "flagURL":"",
        "size":0,
        "povertyLine":0,
        "gdpPerCapita":0
    });

    
    

    const parseNormalizedData = (data) => {
        const normalizedData = [];
        data.forEach(function(d){
            normalizedData.push({
                "code": (d.id),
                "value": parseFloat(d.Score),
                "name": d.Country
            })
        })
        console.log(normalizedData);
        setCountryProfileMapData(normalizedData);
    }

    useEffect(() => {
        const normalizedData = require('../assets/data/normalizedGoalValues.csv')
        const loadNormalizedData = (normalizedDataFile) => {
            Papa.parse(normalizedDataFile, {
                download: true,
                header: true,
                skipEmptyLines: true,
                complete: function(results){
                   // console.log(results.data);
                    parseNormalizedData(results.data);
                    setCountryProfileData(results.data);
                }
            })
        }
        loadNormalizedData(normalizedData);
    }, []);

    const openModal = (countryCode) => {
        setOpenModal(true);

        countriesData.forEach(function(countryData){
            if(countryData.code == countryCode){
                let imgSrc = flagImages(`./${countryData.flagURL}.png`);
                setCountryData({
                    "id": countryData.id,
                    "name": countryData.name,
                    "capital":countryData.capital,
                    "region":countryData.region,
                    "flagURL":imgSrc,
                    "size":countryData.size,
                    "povertyLine":countryData.povertyLine,
                    "gdpPerCapita":countryData.gdpPerCapita
                  });
            }
        })
    }

    const closeModal = () => {
        setOpenModal(false);
    }

    const handleSdgChange = (e) => {
        setActiveSdg(e.currentTarget.value);
    }

    const handleChange = selectedOption => {
        setSelectedCountry(selectedOption)
        openModal(selectedOption.value)
        
    };



    let code = "hc-a2";

    const mapOptions = {
        chart: {
            map: 'custom/africa',
            backgroundColor: 'transparent',

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
            name: 'Country Profile',
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
                <Container>
                    <Row>
                        <Col md="12">
                            <h5 className="country-profile-title"> African Countries Profile </h5>
                        </Col>
                        <Col md="7" >

                        <Select options={countries} 
                                        placeholder="Search Country or Click on the Map" 
                                        value={selectedCountry}
                                        onChange={handleChange} className="p-5"/>

                            <HighchartsReact
                            constructorType ={'mapChart'}
                            highcharts={Highcharts}
                            options={mapOptions}
                            />
                        </Col>
                        <Col md="5">
                            <h5 className="pt-5 pl-5"> African Countries Profile </h5>
                        </Col>
                    </Row>
                   
                        
                </Container>
                <Container>
                    <Modal size="xl" className="modal-dialog-centered country-profile-modal" isOpen={toggleModal}
                        toggle={toggleModal}  >
                        <div className="modal-header">
                        <h5 className="countryName" cssModule={{'modal-title': 'w-100 text-center'}}>{countryData.name}</h5>
                            <button aria-label="Close" className="close" data-dismiss="modal" type="button"
                                onClick={closeModal} >
                                <span aria-hidden={true}>×</span>
                            </button>
                          
                        </div>
                        <div className="modal-body" >
                            <Row className="countryDemographics">
                                <Col md="2">
                                    <img className="countryFlags" alt=".." src={countryData.flagURL}></img>
                                </Col>
                                <Col>
                                    {/* <label className="countryName">{countryData.name}</label> */}
                                </Col>
                                <Col></Col>
                                <Col>
                                    <label> Capital: {countryData.capital}</label> <br></br>
                                    <label>Poverty line: {countryData.povertyLine} </label> <br></br>
                                    <label>GDP Per Capita: {countryData.gdpPerCapita} </label>
                                </Col>
                            </Row>
                            <Row className="pt-2">
                                <Col>
                                    <Card>
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
                                <Col>
                                    <Card>
                                        <CardHeader> 
                                            <h5 className="display-4 text-center">Perfomance by Goal </h5> 
                                        </CardHeader>
                                        <CardBody>
                                        { console.log("Selected"+ selectedCountry)}
                                            {/* <Barometer barometerData={countryProfileData} country={countryProfileData.id} sdg={activeSdg}></Barometer> */}
                                            <Gauge barometerData={countryProfileData} country={countryData.code} sdg={activeSdg}></Gauge>
                                        </CardBody>
                                    
                                        
                                    </Card>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                               
                                <Col className="mt-4"> 
                                    <Card>
                                        <CardHeader>
                                        <h5 className="display-4 text-center">Country Demographics </h5>
                                        </CardHeader>
                                        <CardBody>
                                            <Demographics></Demographics>
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