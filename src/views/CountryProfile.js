import React, { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Gauge from "../visualizations/gauge";
import Demographics from "../visualizations/demographics";

import {
    Container,
    Modal,
    Row,
    Col,
    CardImg
} from "reactstrap";

import {
    Link
} from "react-router-dom";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMap from "highcharts/modules/map";
import africaMapData from "@highcharts/map-collection/custom/africa.geo.json";

import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

const data = require('../assets/data/trial.json');
highchartsMap(Highcharts);


function CountryProfile (props) {
    const flagImages = require.context('../assets/img/country_flags', true);
    const sdgsData = require('../assets/data/sdgs.json');
    const sdgsImages = require.context('../assets/img/sdg_icons', true);
    const countriesData = require('../assets/data/countryProfile.json');

    let country = 0;
    let countryName = '';
    let countryCapital = '';
    let countryFlag = '';
    let countryPoverty = '';
    let countryGDP = '';
    

    if (props.location.state != null){
        country = props.location.state;
        for(let key in countriesData){
            let newKey = parseInt(key, 10);
            if((newKey+1) === country.value){
                let imgSrc = flagImages(`./${countriesData[key].flagURL}.png`);
                countryName = countriesData[key].name;
                countryCapital = countriesData[key].capital;
                countryPoverty = countriesData[key].povertyLine
                countryGDP = countriesData[key].gdpPerCapita
                countryFlag = imgSrc;
            }
        }
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
        "povertyLine":0,
        "gdpPerCapita":0
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

    const openModal = (countryId) => {
        setOpenModal(true);
        
        for(let key in countriesData){
            let newKey = parseInt(key, 10);
            if((newKey+1) === countryId){
                let imgSrc = flagImages(`./${countriesData[key].flagURL}.png`);
                setCountryData({
                    "id": countriesData[key].id,
                    "name": countriesData[key].name,
                    "capital":countriesData[key].capital,
                    "region":countriesData[key].region,
                    "flagURL":imgSrc,
                    "size":countriesData[key].size,
                    "povertyLine":countriesData[key].povertyLine,
                    "gdpPerCapita":countriesData[key].gdpPerCapita
                  }); 
            }
        }
    }

    const closeModal = () => {
        setOpenModal(false);
    }

    const mapOptions = {
        chart: {
            map: 'custom/africa',
            backgroundColor: 'transparent',
            width: 1000,
            height: 500,
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
                        //loadCountryData(this.value);
                        openModal(this.value);
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
            data: data,
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
            <main className="countryProfile">
                <Container>
                    <HighchartsReact
                        constructorType ={'mapChart'}
                        highcharts={Highcharts}
                        options={mapOptions}
                        />
                </Container>
                <Container>
                    <Modal size="xl" className="modal-dialog-centered" isOpen={toggleModal}
                        toggle={toggleModal} >
                        <div className="modal-header">
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
                                    <label className="countryName">{countryData.name}</label>
                                </Col>
                                <Col></Col>
                                <Col>
                                    <label> Capital: {countryData.capital}</label> <br></br>
                                    <label>Poverty line: {countryData.povertyLine} </label> <br></br>
                                    <label>GDP Per Capita: {countryData.gdpPerCapita} </label>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <h5 className="display-4 mt-2 mb-4 text-center">SDGs </h5>
                                    <Row className="no-gutters sdgImages" >
                                        {sdgsData.map(function(sdg, index){
                                            let  imgSrc = sdgsImages(`./${sdg.image}.jpg`)
                                            return <Col md="2" sm="4" key={index}>
                                                        <Link to="">
                                                            <CardImg className="countryProfileSdgsImg" key={index} alt="..." src={ imgSrc }></CardImg>  
                                                        </Link>   
                                                    </Col>
                                        })}
                                    </Row>
                                </Col>
                                <Col>
                                    <h5 className="display-4 mt-2 mb-4 text-center">Perfomance by Goal </h5>
                                    <Gauge></Gauge>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="2"></Col>
                                <Col className="mt-4">
                                <h5 className="display-4 mt-2 mb-4 text-center">Country Demographics </h5>
                                    <Demographics></Demographics>
                                </Col>
                                <Col md="2"></Col>
                               
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