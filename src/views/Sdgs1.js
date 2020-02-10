import React, { useState , useEffect} from "react";
import {Link} from 'react-router-dom';

import { Container, Row, Col, Card, CardImg, Button, Input, Nav, TabContent, TabPane,  Modal, Label, CustomInput } from "reactstrap";
import { css } from '@emotion/core';
import ClipLoader from 'react-spinners/ClipLoader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from "classnames";

import Header from "../components/sdgsHeader";
import SdgMap from "../visualizations/sdgMap";
import Footer from "../components/footer";
import SdgHighChart from "../visualizations/sdgHighChart";
import LineChart from "../visualizations/lineChart";

function Sdgs1() {
    const images = require.context('../assets/img/sdgs_icons', true);
    const sdgs = [
        {
           id:0,
            image: "E_SDG_Icons-00"
        },
        {
            id :1,
            image : "E_SDG_Icons-01"
        },{
            id:2,
            image : "E_SDG_Icons-02"
        },{
            id:3,
            image: "E_SDG_Icons-03"
        },{
            id:4,
            image: "E_SDG_Icons-04"
        },{
            id:5,
            image: "E_SDG_Icons-05"
        },{
            id:6,
            image: "E_SDG_Icons-06"
        },{
            id:7,
            image: "E_SDG_Icons-07"
        },{
            id:8,
            image: "E_SDG_Icons-08"
        },{
            id:9,
            image: "E_SDG_Icons-09"
        },{
            id:10,
            image: "E_SDG_Icons-10"
        },{
            id:11,
            image: "E_SDG_Icons-11"
        },{
            id:12,
            image: "E_SDG_Icons-12"
        },{
            id:13,
            image: "E_SDG_Icons-13"
        },{
            id:14,
            image: "E_SDG_Icons-14"
        },{
            id:15,
            image: "E_SDG_Icons-15"
        },{
            id:16,
            image: "E_SDG_Icons-16"
            } ,{
            id:17,
            image: "E_SDG_Icons-17"
        }
        
    ];

    const override = css`
        display: block;
        margin: 0 auto;
        border-color: red;`;

    const Papa = require("papaparse/papaparse.min.js");
    const data = require('../assets/data/globalDatabase.json');
    const sdg = data[0];
    const targets = sdg.targets;

    const image = require.context('../assets/img/sdgs_icons', true);
    const imgSrc = image(`./${sdg.image}.jpg`);

    const countries = require("../assets/data/countries.json");
    const [years, setYears] = useState([]);
    const [indicators, setIndicators] = useState([]);
    const [target, setTarget] = useState(targets[0].code);

    const [sdgMapData, setSdgMapData] = useState([]);
    const [sdgChartData, setSdgChartData] = useState([]);
    const [lineChartData, setLineChartData] = useState([]);
    const [dataSource, setDataSource] = useState('pan');
    const [activeTab, setActiveTab] = useState('1.2');
    const [isLoading, setIsLoading] = useState(false);
    const [mapChartType, setMapChartType] = useState('map');
    const [year, setYear] = useState('2006');
    const [indicator, setIndicator] = useState('3.2 Child mortality rate of girls (per 1 000 births) (per 1 000 live births)');
    const [checkedItems, setCheckedItems] = useState({DZ: true, AO: true, BJ: true, BW: true});
    
    let csvDataSourceData = '';
    let normalizedData = '';
    let sdgData = '';
    let ind = [];  
    const [toggleModal, setOpenModal] = useState(false);

    const openModal = (countryId) => {
        setOpenModal(true);
    }
    const closeModal = () => {
        setOpenModal(false);
    }
    const handleChange = (event) => {
        setCheckedItems({...checkedItems, [event.target.name]: event.target.checked});
    }

    useEffect(() => {
        if(dataSource === 'pan'){
            csvDataSourceData = require("../assets/data/sdg/pan.csv");
            sdgData = require('../assets/data/globalDatabase.json');
        }else if (dataSource === 'gdb'){
            csvDataSourceData = require("../assets/data/sdg/gdb.csv");
            sdgData = require('../assets/data/globalDatabase.json');
        }

        const targetData = sdgData[0].targets;
        targetData.forEach(function(data){
            if(data.code === activeTab){
                ind = data.indicators;
            }
        })
        setIndicators(ind);
    }, [activeTab])

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
            const keys = Object.keys(checkedItems);
            for (const key of keys){
                for(const data of myChartData){
                    if(data.includes(key.toLowerCase()) && checkedItems[key] === true){
                        for(const country of countries){
                            if (country.alpha2Code === key){
                                data[0] = country.name
                            }
                        }
                        
                        filteredChartData.push(data)
                    }
                }
            }
            setSdgChartData(filteredChartData);
        }

        const loadSdgData = (sdgCsvFile) => {
            Papa.parse(sdgCsvFile, {
                download: true,
                header: true,
                complete: function(results){
                    if(isSubscribed){
                        parseMapData(results.data);
                        const chartData = parseChartData(results.data)
                        filterChartData(chartData);
                        parseLineData(results.data);
                    }
                }
            })
        }

        const loadNormalizedData = (normalizedDataFile) => {
            Papa.parse(normalizedDataFile, {
                download: true,
                header: true,
                skipEmptyLines: false,
                complete: function(results){
                    console.log(results.data);
                    parseNormalizedData(results.data);
                }
            })
        }
        loadSdgData(csvDataSourceData);
        loadNormalizedData(normalizedData);
        return () => isSubscribed = false
    }, [dataSource, indicator, year, activeTab, checkedItems]);

    const parseMapData = (data) => {
        const years = [];
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
            if(d.Entity === "Mauritius"){
                years.push(d.Year);
                years.sort((a, b) => b - a);
            }
        })
        setYears(years);
        //setSdgMapData(indicatorData);
        console.log(indicatorData);
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
    const parseNormalizedData = (data) => {
        const normalizedData = [];
        data.forEach(function(d){
            normalizedData.push({
                "code": d.id,
                "drilldown": (d.id) +"/" + (d.id) + "-all",
                "value": d.Score,
                "country": d.Country
            })
        })
        console.log(normalizedData);
        setSdgMapData(normalizedData);
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
        let countriesData = []
        let countryData = {}
        data.forEach(function(d){
            let indicatorData = []
                indicatorData.push( parseInt(d[indicator]))
                countryData = {
                    "name": d.Entity,
                    "data": indicatorData
                }
            if(countriesData.length === 0){
                countriesData.push(countryData)  
            } else{
                if(indexOf(d.Entity, countriesData, countriesData) === -1){
                    countriesData.push(countryData)
                }else{
                    let index = indexOf(d.Entity, countriesData, countriesData);
                    let oldData = countriesData[index].data;
                    oldData.push(parseInt(d[indicator]))
                    countriesData[index].data = oldData
                }
            }  
        })
        countriesData.forEach(function(countryData){
            let data = countryData.data;
            let filteredData = data.slice(0, 5);
            countryData.data = filteredData
        })
        let filteredData = countriesData.slice(0, 5);
        setLineChartData(filteredData);
    }

    // Choose datasource
    const setGDBData = () => {
        setDataSource('gdb');
    }
    const setPanAfricanData = () => {
        setDataSource('pan');
    }
    //Choose indicator
    const handleIndicatorChange = (e) => {
        setIndicator(e.target.value);
    }
    //Choose year
    const handleYearChange = (e) => {
        setYear(e.target.value);
    }
    const handleTargetClick = (e) => {
        setTarget(e.target.value);
    }
    const handleDataSourceChange = (e) => {
        setDataSource(e.target.value);
    }
    //Choose target
    const targetClick = (e) =>{
        setActiveTab(e.target.value);
    }
    // Set charts data
    const setMapType = () =>{
        setMapChartType('map')
    }
    const setChartType = () =>{
        setMapChartType('chart')
    }
    const setLineChartType = () => {
        setMapChartType('line')
    }

    return(
        <>
        <Header></Header>
            <main className="sdg">
            <div className="container">  
                {/* <Row className="sdg-icon-padding">
                    {sdgs.map(function(sdg, index){
                        let  imgSrc = images(`./${sdg.image}.jpg`);
                        let sdgNumber = index + 1;
                        let url = "Sdgs/Sdg_" + sdgNumber;
                        return <Col key={index}>
                                    <Link>
                                        <CardImg  alt="..." src={ imgSrc }></CardImg>  
                                    </Link>   
                                </Col>
                    })}
                </Row> */}
                <Row className="mt-4 optionButtons ">
                    <Col>
                        <Input type="select" name="targetSelect" onChange={handleTargetClick} value={target}>
                                {
                                targets.map((target, index) =>{
                                return <option key={index} value={target.code}>{target.code}</option>
                                })
                            }
                        </Input>
                    </Col>
                    <Col>
                        <Input type="select" name="indicatorSelect" onChange={handleIndicatorChange} value={indicator}>
                            <option>Select indicator</option>
                            {
                                indicators.map((indicator, index) => {
                                    return <option key={index} value={indicator.title}>{indicator.title}</option>
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
                <Row className="mt-5">
                    <Col md="12">
                        <SdgMap mySdgData ={sdgMapData}></SdgMap>
                    </Col>
                    <Col md="12">
                        <SdgHighChart myChartData = {sdgChartData} indicator = {indicator} years = {years}></SdgHighChart>
                    </Col>
                    <Col md="12">
                        <LineChart lineChartData = {lineChartData} indicator = {indicator} years = {years}></LineChart>
                    </Col>
                </Row>
            </div>
        </main>
        <Footer></Footer>
        </>
    )
}

export default Sdgs1;