import React , { useState , useEffect} from "react";
import Header from "../components/header";
import Footer from "../components/footer";

import {
    Nav,
    NavItem,
    NavLink, 
    Card,
    CardBody,
    TabContent,
    TabPane, Button, CardImg, Row, Col
} from "reactstrap";
import classnames from "classnames";




function Dashboard (){
  const Papa = require("papaparse/papaparse.min.js");
  const [activeRegion, setActiveRegion] = useState('1');
  const data = require('../assets/data/scorecardData.json');
  const [dashboardData, setDashboardData] = useState([]);
  const sdgsImages = require.context('../assets/img/sdg_icons', true);

  const sdgs = [
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

  const regions = [
    {
      "id": 1,
      "name": "All"
    }, {
      "id": 2,
      "name": "Central Africa"
    }, {
      "id": 3,
      "name": "East Africa"
    }, {
      "id": 4,
      "name": "North Africa"
    }, {
      "id": 5,
      "name": "Southern Africa"
    },
    {
      "id": 6,
      "name": "West Africa"
    }
  ]

  const counter = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]

  const regionClick = (e) =>{
    setActiveRegion(e.target.value)
  }

  useEffect(() => {
    let dashboardDataSource = require('../assets/data/dashboard.csv');
      const loadData = csvFile => {
        Papa.parse(csvFile, {
          download: true,
          header: true,
          skipEmptyLines: false,
          complete: function(results){
              console.log(results.data)
              setDashboardData(results.data);
          }
        })
      } 

      loadData(dashboardDataSource);
  }, [activeRegion])

        return(
            <>
            <Header></Header>
             <main className="container-fluid dashboard">
                <div className="nav-wrapper">
                    <Nav className="nav-fill flex-column"
                    id="tabs-icons-text"
                    pills
                    role="tablist">
                      <Row className="no-gutters regions-header">
                        {
                        regions.map((region, index) =>{  
                                return <Col>
                                    <Button key={index} onClick={regionClick} value={region.id} className={ activeRegion == index+1 ? 'active': '' }> 
                                            {region.name}
                                    </Button>
                                </Col>
                            })
                        }  
                      </Row>
                          
                    </Nav>
                </div> 
                <Card className="">
                    <CardBody>
                        <TabContent activeTab={activeRegion}>
                          <TabPane tabId="1">
                            <table >
                              <thead className="dashboard">
                                <tr>
                                  <th></th>
                                { 
                                  sdgs.map(function(sdg, index){
                                          let  imgSrc = sdgsImages(`./${sdg.image}.jpg`);
                                          let sdgNumber = index + 1;
                                          let url = "Sdgs/Sdg_" + sdgNumber;
                                          return <th key={index}>
                                                      <Button  value={index}>
                                                          <CardImg  alt="..." src={ imgSrc }></CardImg>
                                                      </Button>
                                          </th>
                                  })}
                                    
                                </tr>
                              </thead>
                              <tbody>
                                  {
                                    dashboardData.map(function(scoreData, index){
                                    return <tr key={index} className={scoreData.region}>
                                              <td className="sdg-data"> {scoreData.Country}</td>
                                             { 
                                              counter.map(function(count){
                                                 return <td key={count} className = { scoreData["sdg"+count] }>
                                                 
                                                 </td>
                                             
                                                })  
                                             } 
                                              
                                              {/* <td className = { (scoreData.sdg2 >= 1 && scoreData.sdg2 <= 33 ? 'red' : (scoreData.sdg2 >= 34 && scoreData.sdg2 <= 66 ? 'orange' : (scoreData.sdg2 >= 67 && scoreData.sdg2 <= 100 ? 'green' : 'grey')))}></td>
                                              <td className = { (scoreData.sdg3 >= 1 && scoreData.sdg3 <= 33 ? 'red' : (scoreData.sdg3 >= 34 && scoreData.sdg3 <= 66 ? 'orange' : (scoreData.sdg3 >= 67 && scoreData.sdg3 <= 100 ? 'green' : 'grey')))}></td>
                                              <td className = { (scoreData.sdg4 >= 1 && scoreData.sdg4 <= 33 ? 'red' : (scoreData.sdg4 >= 34 && scoreData.sdg4 <= 66 ? 'orange' : (scoreData.sdg4 >= 67 && scoreData.sdg4 <= 100 ? 'green' : 'grey')))}></td>
                                              <td className = { (scoreData.sdg5 >= 1 && scoreData.sdg5 <= 33 ? 'red' : (scoreData.sdg5 >= 34 && scoreData.sdg5 <= 66 ? 'orange' : (scoreData.sdg5 >= 67 && scoreData.sdg5 <= 100 ? 'green' : 'grey')))}></td>
                                              <td className = { (scoreData.sdg6 >= 1 && scoreData.sdg6 <= 33 ? 'red' : (scoreData.sdg6 >= 34 && scoreData.sdg6 <= 66 ? 'orange' : (scoreData.sdg6 >= 67 && scoreData.sdg6 <= 100 ? 'green' : 'grey')))}></td>
                                              <td className = { (scoreData.sdg7 >= 1 && scoreData.sdg7 <= 33 ? 'red' : (scoreData.sdg7 >= 34 && scoreData.sdg7 <= 66 ? 'orange' : (scoreData.sdg7 >= 67 && scoreData.sdg7 <= 100 ? 'green' : 'grey')))}></td>
                                              <td className = { (scoreData.sdg8 >= 1 && scoreData.sdg8 <= 33 ? 'red' : (scoreData.sdg8 >= 34 && scoreData.sdg8 <= 66 ? 'orange' : (scoreData.sdg8 >= 67 && scoreData.sdg8 <= 100 ? 'green' : 'grey')))}></td>
                                              <td className = { (scoreData.sdg9 >= 1 && scoreData.sdg9 <= 33 ? 'red' : (scoreData.sdg9 >= 34 && scoreData.sdg9 <= 66 ? 'orange' : (scoreData.sdg9 >= 67 && scoreData.sdg9 <= 100 ? 'green' : 'grey')))}></td>
                                              <td className = { (scoreData.sdg10 >= 1 && scoreData.sdg10 <= 33 ? 'red' : (scoreData.sdg10 >= 34 && scoreData.sdg10 <= 66 ? 'orange' : (scoreData.sdg10 >= 67 && scoreData.sdg10 <= 100 ? 'green' : 'grey')))}></td>
                                              <td className = { (scoreData.sdg11 >= 1 && scoreData.sdg11 <= 33 ? 'red' : (scoreData.sdg11 >= 34 && scoreData.sdg11 <= 66 ? 'orange' : (scoreData.sdg11 >= 67 && scoreData.sdg11 <= 100 ? 'green' : 'grey')))}></td>
                                              <td className = { (scoreData.sdg12 >= 1 && scoreData.sdg12 <= 33 ? 'red' : (scoreData.sdg12 >= 34 && scoreData.sdg12 <= 66 ? 'orange' : (scoreData.sdg12 >= 67 && scoreData.sdg12 <= 100 ? 'green' : 'grey')))}></td>
                                              <td className = { (scoreData.sdg13 >= 1 && scoreData.sdg13 <= 33 ? 'red' : (scoreData.sdg13 >= 34 && scoreData.sdg13 <= 66 ? 'orange' : (scoreData.sdg13 >= 67 && scoreData.sdg13 <= 100 ? 'green' : 'grey')))}></td>
                                              <td className = { (scoreData.sdg14 >= 1 && scoreData.sdg14 <= 33 ? 'red' : (scoreData.sdg14 >= 34 && scoreData.sdg14 <= 66 ? 'orange' : (scoreData.sdg14 >= 67 && scoreData.sdg14 <= 100 ? 'green' : 'grey')))}></td>
                                              <td className = { (scoreData.sdg15 >= 1 && scoreData.sdg15 <= 33 ? 'red' : (scoreData.sdg15 >= 34 && scoreData.sdg15 <= 66 ? 'orange' : (scoreData.sdg15 >= 67 && scoreData.sdg15 <= 100 ? 'green' : 'grey')))}></td>
                                              <td className = { (scoreData.sdg16 >= 1 && scoreData.sdg16 <= 33 ? 'red' : (scoreData.sdg16 >= 34 && scoreData.sdg16 <= 66 ? 'orange' : (scoreData.sdg16 >= 67 && scoreData.sdg16 <= 100 ? 'green' : 'grey')))}></td>
                                              <td className = { (scoreData.sdg17 >= 1 && scoreData.sdg17 <= 33 ? 'red' : (scoreData.sdg17 >= 34 && scoreData.sdg17 <= 66 ? 'orange' : (scoreData.sdg17 >= 67 && scoreData.sdg17 <= 100 ? 'green' : 'grey')))}></td>
                                              <td className = { (scoreData.sdg17 >= 1 && scoreData.sdg17 <= 33 ? 'red' : (scoreData.sdg17 >= 34 && scoreData.sdg17 <= 66 ? 'orange' : (scoreData.sdg17 >= 67 && scoreData.sdg17 <= 100 ? 'green' : 'grey')))}></td> */}
                                          </tr>
                                    })
                                  }
                              </tbody>
                            
                            </table>
                          </TabPane>
                          <TabPane tabId="plainTabs2">
                          <table className="">
                              <thead>
                                <tr>
                                    <th className="blank-header"></th>
                                    <th className="sdg-header">NO POVERTY</th>
                                    <th className="sdg-header">ZERO HUNGER</th>
                                    <th className="sdg-header">GOOD HEALTH AND WELL-BEING</th>
                                    <th className="sdg-header">QUALITY EDUCATION</th>
                                    <th className="sdg-header">GENDER EQUALITY</th>
                                    <th className="sdg-header">CLEAN WATER AND SANITATION</th>
                                    <th className="sdg-header">AFFORDABLE AND CLEAN ENERGY</th>
                                    <th className="sdg-header">DECENT WORK AND ECONOMIC GROWTH</th>
                                    <th className="sdg-header">INDUSTRY, INNOVATION AND INFRASTRUCTURE</th>
                                    <th className="sdg-header">REDUCED INEQUALITIES</th>
                                    <th className="sdg-header">SUSTAINABLE CITIES AND COMMUNITIES</th>
                                    <th className="sdg-header">RESPONSIBLE CONSUMPTION AND PROTECTION</th>
                                    <th className="sdg-header">CLIMATE ACTION </th>
                                    <th className="sdg-header">LIFE BELOW WATER</th>
                                    <th className="sdg-header">LIFE ON LAND</th>
                                    <th className="sdg-header">PEACE, JUSTICE AND STRONG INSTITIONS</th>
                                    <th className="sdg-header">PARTNERSHIP FOR THE GOALS</th>
                                </tr>
                              </thead>
                              <tbody>
                                  {
                                    data.map(function(scoreData, index){
                                      if(scoreData.region === "CAF"){
                                        return <tr key={index} className={scoreData.region}>
                                        <td className="sdg-data"> {scoreData.country}</td>
                                        <td className = { (scoreData.sdg1 >= 1 && scoreData.sdg1 <= 33 ? 'red' : (scoreData.sdg1 >= 34 && scoreData.sdg1 <= 66 ? 'orange' : (scoreData.sdg1 >= 67 && scoreData.sdg1 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg2 >= 1 && scoreData.sdg2 <= 33 ? 'red' : (scoreData.sdg2 >= 34 && scoreData.sdg2 <= 66 ? 'orange' : (scoreData.sdg2 >= 67 && scoreData.sdg2 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg3 >= 1 && scoreData.sdg3 <= 33 ? 'red' : (scoreData.sdg3 >= 34 && scoreData.sdg3 <= 66 ? 'orange' : (scoreData.sdg3 >= 67 && scoreData.sdg3 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg4 >= 1 && scoreData.sdg4 <= 33 ? 'red' : (scoreData.sdg4 >= 34 && scoreData.sdg4 <= 66 ? 'orange' : (scoreData.sdg4 >= 67 && scoreData.sdg4 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg5 >= 1 && scoreData.sdg5 <= 33 ? 'red' : (scoreData.sdg5 >= 34 && scoreData.sdg5 <= 66 ? 'orange' : (scoreData.sdg5 >= 67 && scoreData.sdg5 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg6 >= 1 && scoreData.sdg6 <= 33 ? 'red' : (scoreData.sdg6 >= 34 && scoreData.sdg6 <= 66 ? 'orange' : (scoreData.sdg6 >= 67 && scoreData.sdg6 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg7 >= 1 && scoreData.sdg7 <= 33 ? 'red' : (scoreData.sdg7 >= 34 && scoreData.sdg7 <= 66 ? 'orange' : (scoreData.sdg7 >= 67 && scoreData.sdg7 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg8 >= 1 && scoreData.sdg8 <= 33 ? 'red' : (scoreData.sdg8 >= 34 && scoreData.sdg8 <= 66 ? 'orange' : (scoreData.sdg8 >= 67 && scoreData.sdg8 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg9 >= 1 && scoreData.sdg9 <= 33 ? 'red' : (scoreData.sdg9 >= 34 && scoreData.sdg9 <= 66 ? 'orange' : (scoreData.sdg9 >= 67 && scoreData.sdg9 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg10 >= 1 && scoreData.sdg10 <= 33 ? 'red' : (scoreData.sdg10 >= 34 && scoreData.sdg10 <= 66 ? 'orange' : (scoreData.sdg10 >= 67 && scoreData.sdg10 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg11 >= 1 && scoreData.sdg11 <= 33 ? 'red' : (scoreData.sdg11 >= 34 && scoreData.sdg11 <= 66 ? 'orange' : (scoreData.sdg11 >= 67 && scoreData.sdg11 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg12 >= 1 && scoreData.sdg12 <= 33 ? 'red' : (scoreData.sdg12 >= 34 && scoreData.sdg12 <= 66 ? 'orange' : (scoreData.sdg12 >= 67 && scoreData.sdg12 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg13 >= 1 && scoreData.sdg13 <= 33 ? 'red' : (scoreData.sdg13 >= 34 && scoreData.sdg13 <= 66 ? 'orange' : (scoreData.sdg13 >= 67 && scoreData.sdg13 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg14 >= 1 && scoreData.sdg14 <= 33 ? 'red' : (scoreData.sdg14 >= 34 && scoreData.sdg14 <= 66 ? 'orange' : (scoreData.sdg14 >= 67 && scoreData.sdg14 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg15 >= 1 && scoreData.sdg15 <= 33 ? 'red' : (scoreData.sdg15 >= 34 && scoreData.sdg15 <= 66 ? 'orange' : (scoreData.sdg15 >= 67 && scoreData.sdg15 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg16 >= 1 && scoreData.sdg16 <= 33 ? 'red' : (scoreData.sdg16 >= 34 && scoreData.sdg16 <= 66 ? 'orange' : (scoreData.sdg16 >= 67 && scoreData.sdg16 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg17 >= 1 && scoreData.sdg17 <= 33 ? 'red' : (scoreData.sdg17 >= 34 && scoreData.sdg17 <= 66 ? 'orange' : (scoreData.sdg17 >= 67 && scoreData.sdg17 <= 100 ? 'green' : 'grey')))}></td>
                                    </tr>
                                      }
                                    
                                    })
                                  }
                              </tbody>
                          </table>
                          </TabPane>
                          <TabPane tabId="plainTabs3">
                            <table className="">
                              <thead>
                                <tr>
                                    <th className="blank-header"></th>
                                    <th className="sdg-header">NO POVERTY</th>
                                    <th className="sdg-header">ZERO HUNGER</th>
                                    <th className="sdg-header">GOOD HEALTH AND WELL-BEING</th>
                                    <th className="sdg-header">QUALITY EDUCATION</th>
                                    <th className="sdg-header">GENDER EQUALITY</th>
                                    <th className="sdg-header">CLEAN WATER AND SANITATION</th>
                                    <th className="sdg-header">AFFORDABLE AND CLEAN ENERGY</th>
                                    <th className="sdg-header">DECENT WORK AND ECONOMIC GROWTH</th>
                                    <th className="sdg-header">INDUSTRY, INNOVATION AND INFRASTRUCTURE</th>
                                    <th className="sdg-header">REDUCED INEQUALITIES</th>
                                    <th className="sdg-header">SUSTAINABLE CITIES AND COMMUNITIES</th>
                                    <th className="sdg-header">RESPONSIBLE CONSUMPTION AND PROTECTION</th>
                                    <th className="sdg-header">CLIMATE ACTION </th>
                                    <th className="sdg-header">LIFE BELOW WATER</th>
                                    <th className="sdg-header">LIFE ON LAND</th>
                                    <th className="sdg-header">PEACE, JUSTICE AND STRONG INSTITIONS</th>
                                    <th className="sdg-header">PARTNERSHIP FOR THE GOALS</th>
                                </tr>
                              </thead>
                              <tbody>
                                  {
                                    data.map(function(scoreData, index){
                                      if(scoreData.region === "EAF"){
                                        return <tr key={index} className={scoreData.region}>
                                        <td className="sdg-data"> {scoreData.country}</td>
                                        <td className = { (scoreData.sdg1 >= 1 && scoreData.sdg1 <= 33 ? 'red' : (scoreData.sdg1 >= 34 && scoreData.sdg1 <= 66 ? 'orange' : (scoreData.sdg1 >= 67 && scoreData.sdg1 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg2 >= 1 && scoreData.sdg2 <= 33 ? 'red' : (scoreData.sdg2 >= 34 && scoreData.sdg2 <= 66 ? 'orange' : (scoreData.sdg2 >= 67 && scoreData.sdg2 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg3 >= 1 && scoreData.sdg3 <= 33 ? 'red' : (scoreData.sdg3 >= 34 && scoreData.sdg3 <= 66 ? 'orange' : (scoreData.sdg3 >= 67 && scoreData.sdg3 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg4 >= 1 && scoreData.sdg4 <= 33 ? 'red' : (scoreData.sdg4 >= 34 && scoreData.sdg4 <= 66 ? 'orange' : (scoreData.sdg4 >= 67 && scoreData.sdg4 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg5 >= 1 && scoreData.sdg5 <= 33 ? 'red' : (scoreData.sdg5 >= 34 && scoreData.sdg5 <= 66 ? 'orange' : (scoreData.sdg5 >= 67 && scoreData.sdg5 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg6 >= 1 && scoreData.sdg6 <= 33 ? 'red' : (scoreData.sdg6 >= 34 && scoreData.sdg6 <= 66 ? 'orange' : (scoreData.sdg6 >= 67 && scoreData.sdg6 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg7 >= 1 && scoreData.sdg7 <= 33 ? 'red' : (scoreData.sdg7 >= 34 && scoreData.sdg7 <= 66 ? 'orange' : (scoreData.sdg7 >= 67 && scoreData.sdg7 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg8 >= 1 && scoreData.sdg8 <= 33 ? 'red' : (scoreData.sdg8 >= 34 && scoreData.sdg8 <= 66 ? 'orange' : (scoreData.sdg8 >= 67 && scoreData.sdg8 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg9 >= 1 && scoreData.sdg9 <= 33 ? 'red' : (scoreData.sdg9 >= 34 && scoreData.sdg9 <= 66 ? 'orange' : (scoreData.sdg9 >= 67 && scoreData.sdg9 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg10 >= 1 && scoreData.sdg10 <= 33 ? 'red' : (scoreData.sdg10 >= 34 && scoreData.sdg10 <= 66 ? 'orange' : (scoreData.sdg10 >= 67 && scoreData.sdg10 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg11 >= 1 && scoreData.sdg11 <= 33 ? 'red' : (scoreData.sdg11 >= 34 && scoreData.sdg11 <= 66 ? 'orange' : (scoreData.sdg11 >= 67 && scoreData.sdg11 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg12 >= 1 && scoreData.sdg12 <= 33 ? 'red' : (scoreData.sdg12 >= 34 && scoreData.sdg12 <= 66 ? 'orange' : (scoreData.sdg12 >= 67 && scoreData.sdg12 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg13 >= 1 && scoreData.sdg13 <= 33 ? 'red' : (scoreData.sdg13 >= 34 && scoreData.sdg13 <= 66 ? 'orange' : (scoreData.sdg13 >= 67 && scoreData.sdg13 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg14 >= 1 && scoreData.sdg14 <= 33 ? 'red' : (scoreData.sdg14 >= 34 && scoreData.sdg14 <= 66 ? 'orange' : (scoreData.sdg14 >= 67 && scoreData.sdg14 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg15 >= 1 && scoreData.sdg15 <= 33 ? 'red' : (scoreData.sdg15 >= 34 && scoreData.sdg15 <= 66 ? 'orange' : (scoreData.sdg15 >= 67 && scoreData.sdg15 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg16 >= 1 && scoreData.sdg16 <= 33 ? 'red' : (scoreData.sdg16 >= 34 && scoreData.sdg16 <= 66 ? 'orange' : (scoreData.sdg16 >= 67 && scoreData.sdg16 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg17 >= 1 && scoreData.sdg17 <= 33 ? 'red' : (scoreData.sdg17 >= 34 && scoreData.sdg17 <= 66 ? 'orange' : (scoreData.sdg17 >= 67 && scoreData.sdg17 <= 100 ? 'green' : 'grey')))}></td>
                                    </tr>
                                      }
                                    
                                    })
                                  }
                              </tbody>
                          </table>
                          </TabPane>
                          <TabPane tabId="plainTabs4">
                            <table className="">
                              <thead>
                                <tr>
                                    <th className="blank-header"></th>
                                    <th className="sdg-header">NO POVERTY</th>
                                    <th className="sdg-header">ZERO HUNGER</th>
                                    <th className="sdg-header">GOOD HEALTH AND WELL-BEING</th>
                                    <th className="sdg-header">QUALITY EDUCATION</th>
                                    <th className="sdg-header">GENDER EQUALITY</th>
                                    <th className="sdg-header">CLEAN WATER AND SANITATION</th>
                                    <th className="sdg-header">AFFORDABLE AND CLEAN ENERGY</th>
                                    <th className="sdg-header">DECENT WORK AND ECONOMIC GROWTH</th>
                                    <th className="sdg-header">INDUSTRY, INNOVATION AND INFRASTRUCTURE</th>
                                    <th className="sdg-header">REDUCED INEQUALITIES</th>
                                    <th className="sdg-header">SUSTAINABLE CITIES AND COMMUNITIES</th>
                                    <th className="sdg-header">RESPONSIBLE CONSUMPTION AND PROTECTION</th>
                                    <th className="sdg-header">CLIMATE ACTION </th>
                                    <th className="sdg-header">LIFE BELOW WATER</th>
                                    <th className="sdg-header">LIFE ON LAND</th>
                                    <th className="sdg-header">PEACE, JUSTICE AND STRONG INSTITIONS</th>
                                    <th className="sdg-header">PARTNERSHIP FOR THE GOALS</th>
                                </tr>
                              </thead>
                              <tbody>
                                  {
                                    data.map(function(scoreData, index){
                                      if(scoreData.region === "NAF"){
                                        return <tr key={index} className={scoreData.region}>
                                        <td className="sdg-data"> {scoreData.country}</td>
                                        <td className = { (scoreData.sdg1 >= 1 && scoreData.sdg1 <= 33 ? 'red' : (scoreData.sdg1 >= 34 && scoreData.sdg1 <= 66 ? 'orange' : (scoreData.sdg1 >= 67 && scoreData.sdg1 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg2 >= 1 && scoreData.sdg2 <= 33 ? 'red' : (scoreData.sdg2 >= 34 && scoreData.sdg2 <= 66 ? 'orange' : (scoreData.sdg2 >= 67 && scoreData.sdg2 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg3 >= 1 && scoreData.sdg3 <= 33 ? 'red' : (scoreData.sdg3 >= 34 && scoreData.sdg3 <= 66 ? 'orange' : (scoreData.sdg3 >= 67 && scoreData.sdg3 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg4 >= 1 && scoreData.sdg4 <= 33 ? 'red' : (scoreData.sdg4 >= 34 && scoreData.sdg4 <= 66 ? 'orange' : (scoreData.sdg4 >= 67 && scoreData.sdg4 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg5 >= 1 && scoreData.sdg5 <= 33 ? 'red' : (scoreData.sdg5 >= 34 && scoreData.sdg5 <= 66 ? 'orange' : (scoreData.sdg5 >= 67 && scoreData.sdg5 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg6 >= 1 && scoreData.sdg6 <= 33 ? 'red' : (scoreData.sdg6 >= 34 && scoreData.sdg6 <= 66 ? 'orange' : (scoreData.sdg6 >= 67 && scoreData.sdg6 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg7 >= 1 && scoreData.sdg7 <= 33 ? 'red' : (scoreData.sdg7 >= 34 && scoreData.sdg7 <= 66 ? 'orange' : (scoreData.sdg7 >= 67 && scoreData.sdg7 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg8 >= 1 && scoreData.sdg8 <= 33 ? 'red' : (scoreData.sdg8 >= 34 && scoreData.sdg8 <= 66 ? 'orange' : (scoreData.sdg8 >= 67 && scoreData.sdg8 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg9 >= 1 && scoreData.sdg9 <= 33 ? 'red' : (scoreData.sdg9 >= 34 && scoreData.sdg9 <= 66 ? 'orange' : (scoreData.sdg9 >= 67 && scoreData.sdg9 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg10 >= 1 && scoreData.sdg10 <= 33 ? 'red' : (scoreData.sdg10 >= 34 && scoreData.sdg10 <= 66 ? 'orange' : (scoreData.sdg10 >= 67 && scoreData.sdg10 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg11 >= 1 && scoreData.sdg11 <= 33 ? 'red' : (scoreData.sdg11 >= 34 && scoreData.sdg11 <= 66 ? 'orange' : (scoreData.sdg11 >= 67 && scoreData.sdg11 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg12 >= 1 && scoreData.sdg12 <= 33 ? 'red' : (scoreData.sdg12 >= 34 && scoreData.sdg12 <= 66 ? 'orange' : (scoreData.sdg12 >= 67 && scoreData.sdg12 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg13 >= 1 && scoreData.sdg13 <= 33 ? 'red' : (scoreData.sdg13 >= 34 && scoreData.sdg13 <= 66 ? 'orange' : (scoreData.sdg13 >= 67 && scoreData.sdg13 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg14 >= 1 && scoreData.sdg14 <= 33 ? 'red' : (scoreData.sdg14 >= 34 && scoreData.sdg14 <= 66 ? 'orange' : (scoreData.sdg14 >= 67 && scoreData.sdg14 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg15 >= 1 && scoreData.sdg15 <= 33 ? 'red' : (scoreData.sdg15 >= 34 && scoreData.sdg15 <= 66 ? 'orange' : (scoreData.sdg15 >= 67 && scoreData.sdg15 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg16 >= 1 && scoreData.sdg16 <= 33 ? 'red' : (scoreData.sdg16 >= 34 && scoreData.sdg16 <= 66 ? 'orange' : (scoreData.sdg16 >= 67 && scoreData.sdg16 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg17 >= 1 && scoreData.sdg17 <= 33 ? 'red' : (scoreData.sdg17 >= 34 && scoreData.sdg17 <= 66 ? 'orange' : (scoreData.sdg17 >= 67 && scoreData.sdg17 <= 100 ? 'green' : 'grey')))}></td>
                                    </tr>
                                      }
                                    
                                    })
                                  }
                              </tbody>
                          </table>
                          </TabPane>
                          <TabPane tabId="plainTabs5">
                            <table className="">
                              <thead>
                                <tr>
                                    <th className="blank-header"></th>
                                    <th className="sdg-header">NO POVERTY</th>
                                    <th className="sdg-header">ZERO HUNGER</th>
                                    <th className="sdg-header">GOOD HEALTH AND WELL-BEING</th>
                                    <th className="sdg-header">QUALITY EDUCATION</th>
                                    <th className="sdg-header">GENDER EQUALITY</th>
                                    <th className="sdg-header">CLEAN WATER AND SANITATION</th>
                                    <th className="sdg-header">AFFORDABLE AND CLEAN ENERGY</th>
                                    <th className="sdg-header">DECENT WORK AND ECONOMIC GROWTH</th>
                                    <th className="sdg-header">INDUSTRY, INNOVATION AND INFRASTRUCTURE</th>
                                    <th className="sdg-header">REDUCED INEQUALITIES</th>
                                    <th className="sdg-header">SUSTAINABLE CITIES AND COMMUNITIES</th>
                                    <th className="sdg-header">RESPONSIBLE CONSUMPTION AND PROTECTION</th>
                                    <th className="sdg-header">CLIMATE ACTION </th>
                                    <th className="sdg-header">LIFE BELOW WATER</th>
                                    <th className="sdg-header">LIFE ON LAND</th>
                                    <th className="sdg-header">PEACE, JUSTICE AND STRONG INSTITIONS</th>
                                    <th className="sdg-header">PARTNERSHIP FOR THE GOALS</th>
                                </tr>
                              </thead>
                              <tbody>
                                  {
                                    data.map(function(scoreData, index){
                                      if(scoreData.region === "SAF"){
                                        return <tr key={index} className={scoreData.region}>
                                        <td className="sdg-data"> {scoreData.country}</td>
                                        <td className = { (scoreData.sdg1 >= 1 && scoreData.sdg1 <= 33 ? 'red' : (scoreData.sdg1 >= 34 && scoreData.sdg1 <= 66 ? 'orange' : (scoreData.sdg1 >= 67 && scoreData.sdg1 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg2 >= 1 && scoreData.sdg2 <= 33 ? 'red' : (scoreData.sdg2 >= 34 && scoreData.sdg2 <= 66 ? 'orange' : (scoreData.sdg2 >= 67 && scoreData.sdg2 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg3 >= 1 && scoreData.sdg3 <= 33 ? 'red' : (scoreData.sdg3 >= 34 && scoreData.sdg3 <= 66 ? 'orange' : (scoreData.sdg3 >= 67 && scoreData.sdg3 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg4 >= 1 && scoreData.sdg4 <= 33 ? 'red' : (scoreData.sdg4 >= 34 && scoreData.sdg4 <= 66 ? 'orange' : (scoreData.sdg4 >= 67 && scoreData.sdg4 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg5 >= 1 && scoreData.sdg5 <= 33 ? 'red' : (scoreData.sdg5 >= 34 && scoreData.sdg5 <= 66 ? 'orange' : (scoreData.sdg5 >= 67 && scoreData.sdg5 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg6 >= 1 && scoreData.sdg6 <= 33 ? 'red' : (scoreData.sdg6 >= 34 && scoreData.sdg6 <= 66 ? 'orange' : (scoreData.sdg6 >= 67 && scoreData.sdg6 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg7 >= 1 && scoreData.sdg7 <= 33 ? 'red' : (scoreData.sdg7 >= 34 && scoreData.sdg7 <= 66 ? 'orange' : (scoreData.sdg7 >= 67 && scoreData.sdg7 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg8 >= 1 && scoreData.sdg8 <= 33 ? 'red' : (scoreData.sdg8 >= 34 && scoreData.sdg8 <= 66 ? 'orange' : (scoreData.sdg8 >= 67 && scoreData.sdg8 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg9 >= 1 && scoreData.sdg9 <= 33 ? 'red' : (scoreData.sdg9 >= 34 && scoreData.sdg9 <= 66 ? 'orange' : (scoreData.sdg9 >= 67 && scoreData.sdg9 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg10 >= 1 && scoreData.sdg10 <= 33 ? 'red' : (scoreData.sdg10 >= 34 && scoreData.sdg10 <= 66 ? 'orange' : (scoreData.sdg10 >= 67 && scoreData.sdg10 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg11 >= 1 && scoreData.sdg11 <= 33 ? 'red' : (scoreData.sdg11 >= 34 && scoreData.sdg11 <= 66 ? 'orange' : (scoreData.sdg11 >= 67 && scoreData.sdg11 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg12 >= 1 && scoreData.sdg12 <= 33 ? 'red' : (scoreData.sdg12 >= 34 && scoreData.sdg12 <= 66 ? 'orange' : (scoreData.sdg12 >= 67 && scoreData.sdg12 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg13 >= 1 && scoreData.sdg13 <= 33 ? 'red' : (scoreData.sdg13 >= 34 && scoreData.sdg13 <= 66 ? 'orange' : (scoreData.sdg13 >= 67 && scoreData.sdg13 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg14 >= 1 && scoreData.sdg14 <= 33 ? 'red' : (scoreData.sdg14 >= 34 && scoreData.sdg14 <= 66 ? 'orange' : (scoreData.sdg14 >= 67 && scoreData.sdg14 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg15 >= 1 && scoreData.sdg15 <= 33 ? 'red' : (scoreData.sdg15 >= 34 && scoreData.sdg15 <= 66 ? 'orange' : (scoreData.sdg15 >= 67 && scoreData.sdg15 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg16 >= 1 && scoreData.sdg16 <= 33 ? 'red' : (scoreData.sdg16 >= 34 && scoreData.sdg16 <= 66 ? 'orange' : (scoreData.sdg16 >= 67 && scoreData.sdg16 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg17 >= 1 && scoreData.sdg17 <= 33 ? 'red' : (scoreData.sdg17 >= 34 && scoreData.sdg17 <= 66 ? 'orange' : (scoreData.sdg17 >= 67 && scoreData.sdg17 <= 100 ? 'green' : 'grey')))}></td>
                                    </tr>
                                      }
                                    
                                    })
                                  }
                              </tbody>
                          </table>
                          </TabPane>
                          <TabPane tabId="plainTabs6">
                            <table className="">
                              <thead>
                                <tr>
                                    <th className="blank-header"></th>
                                    <th className="sdg-header">NO POVERTY</th>
                                    <th className="sdg-header">ZERO HUNGER</th>
                                    <th className="sdg-header">GOOD HEALTH AND WELL-BEING</th>
                                    <th className="sdg-header">QUALITY EDUCATION</th>
                                    <th className="sdg-header">GENDER EQUALITY</th>
                                    <th className="sdg-header">CLEAN WATER AND SANITATION</th>
                                    <th className="sdg-header">AFFORDABLE AND CLEAN ENERGY</th>
                                    <th className="sdg-header">DECENT WORK AND ECONOMIC GROWTH</th>
                                    <th className="sdg-header">INDUSTRY, INNOVATION AND INFRASTRUCTURE</th>
                                    <th className="sdg-header">REDUCED INEQUALITIES</th>
                                    <th className="sdg-header">SUSTAINABLE CITIES AND COMMUNITIES</th>
                                    <th className="sdg-header">RESPONSIBLE CONSUMPTION AND PROTECTION</th>
                                    <th className="sdg-header">CLIMATE ACTION </th>
                                    <th className="sdg-header">LIFE BELOW WATER</th>
                                    <th className="sdg-header">LIFE ON LAND</th>
                                    <th className="sdg-header">PEACE, JUSTICE AND STRONG INSTITIONS</th>
                                    <th className="sdg-header">PARTNERSHIP FOR THE GOALS</th>
                                </tr>
                              </thead>
                              <tbody>
                                  {
                                    data.map(function(scoreData, index){
                                      if(scoreData.region === "WAF"){
                                        return <tr key={index} className={scoreData.region}>
                                        <td className="sdg-data"> {scoreData.country}</td>
                                        <td className = { (scoreData.sdg1 >= 1 && scoreData.sdg1 <= 33 ? 'red' : (scoreData.sdg1 >= 34 && scoreData.sdg1 <= 66 ? 'orange' : (scoreData.sdg1 >= 67 && scoreData.sdg1 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg2 >= 1 && scoreData.sdg2 <= 33 ? 'red' : (scoreData.sdg2 >= 34 && scoreData.sdg2 <= 66 ? 'orange' : (scoreData.sdg2 >= 67 && scoreData.sdg2 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg3 >= 1 && scoreData.sdg3 <= 33 ? 'red' : (scoreData.sdg3 >= 34 && scoreData.sdg3 <= 66 ? 'orange' : (scoreData.sdg3 >= 67 && scoreData.sdg3 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg4 >= 1 && scoreData.sdg4 <= 33 ? 'red' : (scoreData.sdg4 >= 34 && scoreData.sdg4 <= 66 ? 'orange' : (scoreData.sdg4 >= 67 && scoreData.sdg4 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg5 >= 1 && scoreData.sdg5 <= 33 ? 'red' : (scoreData.sdg5 >= 34 && scoreData.sdg5 <= 66 ? 'orange' : (scoreData.sdg5 >= 67 && scoreData.sdg5 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg6 >= 1 && scoreData.sdg6 <= 33 ? 'red' : (scoreData.sdg6 >= 34 && scoreData.sdg6 <= 66 ? 'orange' : (scoreData.sdg6 >= 67 && scoreData.sdg6 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg7 >= 1 && scoreData.sdg7 <= 33 ? 'red' : (scoreData.sdg7 >= 34 && scoreData.sdg7 <= 66 ? 'orange' : (scoreData.sdg7 >= 67 && scoreData.sdg7 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg8 >= 1 && scoreData.sdg8 <= 33 ? 'red' : (scoreData.sdg8 >= 34 && scoreData.sdg8 <= 66 ? 'orange' : (scoreData.sdg8 >= 67 && scoreData.sdg8 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg9 >= 1 && scoreData.sdg9 <= 33 ? 'red' : (scoreData.sdg9 >= 34 && scoreData.sdg9 <= 66 ? 'orange' : (scoreData.sdg9 >= 67 && scoreData.sdg9 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg10 >= 1 && scoreData.sdg10 <= 33 ? 'red' : (scoreData.sdg10 >= 34 && scoreData.sdg10 <= 66 ? 'orange' : (scoreData.sdg10 >= 67 && scoreData.sdg10 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg11 >= 1 && scoreData.sdg11 <= 33 ? 'red' : (scoreData.sdg11 >= 34 && scoreData.sdg11 <= 66 ? 'orange' : (scoreData.sdg11 >= 67 && scoreData.sdg11 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg12 >= 1 && scoreData.sdg12 <= 33 ? 'red' : (scoreData.sdg12 >= 34 && scoreData.sdg12 <= 66 ? 'orange' : (scoreData.sdg12 >= 67 && scoreData.sdg12 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg13 >= 1 && scoreData.sdg13 <= 33 ? 'red' : (scoreData.sdg13 >= 34 && scoreData.sdg13 <= 66 ? 'orange' : (scoreData.sdg13 >= 67 && scoreData.sdg13 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg14 >= 1 && scoreData.sdg14 <= 33 ? 'red' : (scoreData.sdg14 >= 34 && scoreData.sdg14 <= 66 ? 'orange' : (scoreData.sdg14 >= 67 && scoreData.sdg14 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg15 >= 1 && scoreData.sdg15 <= 33 ? 'red' : (scoreData.sdg15 >= 34 && scoreData.sdg15 <= 66 ? 'orange' : (scoreData.sdg15 >= 67 && scoreData.sdg15 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg16 >= 1 && scoreData.sdg16 <= 33 ? 'red' : (scoreData.sdg16 >= 34 && scoreData.sdg16 <= 66 ? 'orange' : (scoreData.sdg16 >= 67 && scoreData.sdg16 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg17 >= 1 && scoreData.sdg17 <= 33 ? 'red' : (scoreData.sdg17 >= 34 && scoreData.sdg17 <= 66 ? 'orange' : (scoreData.sdg17 >= 67 && scoreData.sdg17 <= 100 ? 'green' : 'grey')))}></td>
                                    </tr>
                                      }
                                    
                                    })
                                  }
                              </tbody>
                          </table>
                          </TabPane>      
                        </TabContent>
                    </CardBody>
                  </Card>
              </main>
            <Footer></Footer>
            </>
        )
    //}
}

export default Dashboard;