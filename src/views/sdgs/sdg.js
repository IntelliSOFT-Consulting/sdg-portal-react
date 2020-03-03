import React, { useState , useEffect} from "react";
import {
    Container, Row, Col, Card, CardImg, Button, Input, Nav, TabContent, TabPane,  Modal, Label, CustomInput
} from "reactstrap";
import { css } from '@emotion/core';
import ClipLoader from 'react-spinners/ClipLoader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from "classnames";

import Header from "../../components/header";
import SdgMap from "../../visualizations/sdgMap";
import Footer from "../../components/footer";
import SdgHighChart from "../../visualizations/sdgHighChart";
import LineChart from "../../visualizations/lineChart";

function Sdg(){
    const override = css`
        display: block;
        margin: 0 auto;
        border-color: red;`;

    const Papa = require("papaparse/papaparse.min.js");
    const data = require('../../assets/data/globalDatabase.json');
    const sdg = data[0];
    const targets = sdg.targets;

    const image = require.context('../../assets/img/sdg_icons', true);
    const imgSrc = image(`./${sdg.image}.jpg`);

    const countries = require("../../assets/data/countries.json");
    const [years, setYears] = useState([]);
    const [indicators, setIndicators] = useState([]);

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
      sdgChartData.includes();
     // console.log(checkedItems);
    })

    useEffect(() => {
        if(dataSource === 'pan'){
            csvDataSourceData = require("../../assets/data/sdg/pan.csv");
            sdgData = require('../../assets/data/globalDatabase.json');
        }else if (dataSource === 'gdb'){
            csvDataSourceData = require("../../assets/data/sdg/gdb.csv");
            sdgData = require('../../assets/data/globalDatabase.json');
        }

        const targetData = sdgData[0].targets;
        targetData.forEach(function(data){
            if(data.code == activeTab){
                ind = data.indicators;
                //console.log(ind);
            }
        })
       // console.log(ind);
        
        setIndicators(ind);
    }, [activeTab])

    useEffect(() => {
        let isSubscribed = true;
        if(dataSource === 'pan'){
            csvDataSourceData = require("../../assets/data/sdg/pan.csv");
            sdgData = require('../../assets/data/globalDatabase.json');
        }else if (dataSource === 'gdb'){
            csvDataSourceData = require("../../assets/data/sdg/gdb.csv");
            sdgData = require('../../assets/data/globalDatabase.json');
        }

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
            //console.log(filteredChartData);

            setSdgChartData(filteredChartData);
        }

        const loadSdgData = (sdgCsvFile) => {
            //setIsLoading(true);
            Papa.parse(sdgCsvFile, {
                download: true,
                header: true,
                complete: function(results){

                    if(isSubscribed){
                        parseMapData(results.data);
                        const chartData = parseChartData(results.data)
                        filterChartData(chartData);

                        parseLineData(results.data)
                       // setIsLoading(false);
                    }
                }
            })
        }
        loadSdgData(csvDataSourceData);

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
        setSdgMapData(indicatorData);
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
       // console.log(filteredData)
    }
   
    const setGDBData = () => {
        setDataSource('gdb');
    }
    const setPanAfricanData = () =>{
        setDataSource('pan');
    }
    const handleIndicatorChange = (e) =>{
        setIndicator(e.target.value);
    }
    const handleYearChange = (e) =>{
        setYear(e.target.value);
    }
    const targetClick = (e) =>{
        setActiveTab(e.target.value);
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

    return(
        <>
        <Header></Header>
            <div className="container-fluid">
                <Row className="sdgBackground">
                    <Col md="2">
                        <CardImg alt=".." src={imgSrc}></CardImg>
                    </Col>
                    <Col md="10">
                    <h5 className="display-4 mt-2 mb-2"> {sdg.title} </h5>
                    <p> {sdg.description} </p>
                    </Col>
                </Row>
                <div className="targetButtons text-center mt-1 pt-1 pb-3">
                    <h5 className="display-4"> SDG {sdg.id} Targets  </h5>
                    <Nav className="justify-content-center">
                        {
                            targets.map((target, index) =>{  
                                return <Button key={index} onClick={targetClick} value={target.code}> 
                                            Target {target.code}
                                        </Button>
                            })
                        }  
                        </Nav>
                </div>
                <Container>
                    <Card className="mapChartCard">
                        <TabContent activeTab={activeTab}>
                            {
                                targets.map((target, index) =>{
                                    return <TabPane tabId={target.code} key={index}>
                                        <p className="p-3"> Target {target.code}: {target.title} </p>
                                        <Row className="text-center selectButtons"> 
                                            <Col md="5">
                                                <Button color="primary" onClick={setPanAfricanData} className={ dataSource === 'pan' ? 'active': '' } >PanAfrican MRS</Button>
                                                <Button color="primary" onClick={setGDBData} className={ dataSource === 'gdb' ? 'active': '' }  >Global Database</Button>
                                                

                                            </Col>
                                            <Col md="4">
                                               
                                                <Input type="select" name="indicatorSelect" className="btn btn-primary" onChange={handleIndicatorChange} value={indicator}>
                                                    <option>Select indicator</option>
                                                    {
                                                        indicators.map((indicator, index) => {
                                                         return <option key={index} value={indicator.title}>{indicator.title}</option>
                                                        })
                                                    }
                                                </Input>
                                            </Col>
                                            <Col md="3">
                                                <Input type="select" name="yearSelect" className="btn btn-primary" onChange={handleYearChange} value={year}> 
                                                {/* <option>Year</option> */}
                                                    {
                                                        years.map((year, index) => {
                                                        return <option key={index} value={year}> {year} </option>
                                                        })
                                                    }
                                                </Input>
                                            </Col>
                                        </Row>
                                    </TabPane>
                                })
                            }
                        </TabContent>  

                        <Row>
                            <Col md="11">
                                {
                                    mapChartType === 'map' ? (
                                        isLoading ? (
                                            <div className='sweet-loading mt-4'>
                                                <ClipLoader css={override} sizeUnit={"px"} size={50}
                                                color={'#123abc'} loading={isLoading} />
                                            </div> 
                                        ) : (
                                            <div>
                                               
                                                <SdgMap mySdgData ={sdgMapData}></SdgMap>
                                               
                                                <Container className="play-controls">
                                                    <Button id="play-pause-button" type="button" className="btn-icon" title="play">
                                                        <i className="fa fa-play"></i>
                                                    </Button>
                                                    <CustomInput type="range" id="play-range" name="customRange" />
                                                    <Label id="play-output" htmlFor="play-range" name="year">2009</Label>
                                                </Container>
                                            </div>
                                        
                                        )
                                    ): null
                                }

                                {
                                    mapChartType === 'chart' ? (
                                        isLoading ? (
                                            <div className='sweet-loading mt-4'>
                                                <ClipLoader css={override} sizeUnit={"px"} size={50}
                                                color={'#123abc'} loading={isLoading} />
                                            </div> 
                                        ) : (
                                            <div>
                                                <div className="add-country-div">
                                                    <Button className="btn-link ml-1 add-country-btn" color="info" type="button" onClick={openModal}>
                                                            <i className="fa fa-plus-circle mr-1" />
                                                            Add a country
                                                    </Button>
                                                </div>
                                                
                                                <SdgHighChart myChartData = {sdgChartData} indicator = {indicator} years = {years}></SdgHighChart>
                                            </div>        
                                        )
                                    ): null
                                }

                                {
                                    mapChartType === 'line' ? (
                                        isLoading ? (
                                            <div className='sweet-loading mt-4'>
                                                <ClipLoader css={override} sizeUnit={"px"} size={50}
                                                color={'#123abc'} loading={isLoading} />
                                            </div> 
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
                    </Card>
                </Container>
                <Container>
                    <Modal size="lg" className="modal-dialog-centered" isOpen={toggleModal}
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
                                    {
                                        countries.map((country, index) => {
                                        return <Col md="4">
                                        <Label key={index} check>
                                                    <Input type="checkbox" name={country.alpha2Code} value={country.alpha2Code} checked={!!checkedItems[country.alpha2Code]} onChange={handleChange}/>{' '}
                                                {country.name}
                                                </Label>
                                                </Col>    
                                        })
                                    }
                            </Row>
                            </Container>   
                        </div>
                    </Modal>
                </Container>
            </div>
            <Footer></Footer>
        </>
    )
}
export default Sdg;