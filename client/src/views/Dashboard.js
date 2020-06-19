import React , { useState , useEffect} from "react";
import Header from "../components/dashboardHeader";
import Footer from "../components/footer";
import Spinner from '../visualizations/spinner';

import {
    Nav, Card, CardBody, TabContent, TabPane, Button, CardImg, Row, Col, Modal, Container,Table
} from "reactstrap";
import classnames from "classnames";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

function Dashboard (){
  const dashboardIndicators = require("../assets/data/dashboard.json");
  const [activeRegion, setActiveRegion] = useState('1');
  
  const [dashboardData, setDashboardData] = useState([]);
  const [toggleModal, setOpenModal] = useState(false);
  const [dashboardPopupData, setModalPopupData] = useState([]);
  const sdgsImages = require.context('../assets/img/inverted_sdg_icons', true);
  const [dashboardPopupIndicators, setDashboardPopupIndicators] = useState([]);
  const [dashboardPopupIndicatorsData, setDashboardPopupIndicatorsData] = useState([]);
  const [activePopup, setActivePopup] = useState('');
  const [year, setYear] = useState(2019);
  const [toggleYearWidget, setToggleYearWidget] = useState(false);
  const [toggleLegendWidget, setToggleLegendWidget] = useState(false);
  const [loading, setLoading] = useState(false);
  const API_BASE = "http://localhost:8080/api"
  

  const sdgs = [
    {
        id :1,
        image : "E Inverted Icons_WEB-01"
    },{
        id:2,
        image : "E Inverted Icons_WEB-02"
    },{
        id:3,
        image: "E Inverted Icons_WEB-03"
    },{
        id:4,
        image: "E Inverted Icons_WEB-04"
    },{
        id:5,
        image: "E Inverted Icons_WEB-05"
    },{
        id:6,
        image: "E Inverted Icons_WEB-06"
    },{
        id:7,
        image: "E Inverted Icons_WEB-07"
    },{
        id:8,
        image: "E Inverted Icons_WEB-08"
    },{
        id:9,
        image: "E Inverted Icons_WEB-09"
    },{
        id:10,
        image: "E Inverted Icons_WEB-10"
    },{
        id:11,
        image: "E Inverted Icons_WEB-11"
    },{
        id:12,
        image: "E Inverted Icons_WEB-12"
    },{
        id:13,
        image: "E Inverted Icons_WEB-13"
    },{
        id:14,
        image: "E Inverted Icons_WEB-14"
    },{
        id:15,
        image: "E Inverted Icons_WEB-15"
    },{
        id:16,
        image: "E Inverted Icons_WEB-16"
        } ,{
        id:17,
        image: "E Inverted Icons_WEB-17"
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

  const counter = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

  const legend = [{
    from: null,
    to: null,
    name: 'Information unavailable.',
    color: '#cecdcd'
}, {
    from: 0,
    to: 10,
    name: 'Off Track',
    color: '#ff0000'
}, {
    from: 10,
    to: 20,
    name: 'Significant challenges remain',
    color: '#ffa500'
},{
    from: 20,
    to: 30,
    name: 'Challenges remain',
    color: '#f1cd00'
},{
    from: 30,
    name: 'SDG Achieved',
    color: '#008d00'
}]
  const regionClick = (e) =>{
    setActiveRegion(e.target.value)
  }

  
  
  const openModal = (e) => {
    setActivePopup(e.target.id);
    setOpenModal(true);
  }

  const closeModal = () => {
    setOpenModal(false)
  }

  useEffect(() => {
    let dashboardDataApi = {}
    //Fetch dashboard API data
    const fetchDashboardData = async() =>{
      setLoading(true)
      let apiData = []
      const result = await axios(API_BASE+'/files');
      apiData =  result.data.data;
      apiData.forEach(function(d){
        if(d.page === "Dashboard" && d.year === year){
          dashboardDataApi = d
        }
      })
      setDashboardData(dashboardDataApi.data);
      setLoading(false)
    }
    const parseDashboardData = (countrySdg) => {
      let indicatorsNames = []
      let indicatorData = [];
      let n = countrySdg.length;
      let countryCode = countrySdg.slice(0,2);
      let sdgNumber = countrySdg.slice(2,n);
      
      dashboardData.forEach(function(data){
        if(data.code === countryCode){
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
                console.log(rounded_off_val)
                 
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
    fetchDashboardData();
    parseDashboardData(activePopup);
  }, [activeRegion, year, activePopup])


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

const handleYearWidget = () =>{
  toggleYearWidget === false ? (
    setToggleYearWidget(true)
  ):(
    setToggleYearWidget(false)
  )
}

const handleLegendWidget = () =>{
  toggleLegendWidget == false ?(
    setToggleLegendWidget(true)
  ):(
    setToggleLegendWidget(false)
  )
}

const handleClickYear = (year) => {
  setYear(parseInt(year.target.value));
}

        return(
            <>
            <Header></Header>
            
            <div className="nav-wrapper dashboard-regions">
                    <Nav className="nav-fill flex-column"
                      id="tabs-icons-text"
                      pills
                      role="tablist">
                        <Row className="no-gutters regions-header">
                          {
                          regions.map((region, index) =>{  
                                  return <Col>
                                      <Button key={index} onClick={regionClick} value={region.id} className={ activeRegion === index+1 ? 'active': '' }> 
                                              {region.name}
                                      </Button>
                                  </Col>
                              })
                          }  
                        </Row>  
                    </Nav>
                    
              </div> 
             <main className="container-fluid dashboard">
             <div className = "text-right year-widget" onClick={handleYearWidget}>
                        <span className="year-widget-text">Year{year}</span>  
                  <div className={ classnames("year-widget-popup", {display: toggleYearWidget === true}) }>
                      <Button onClick={handleClickYear} value="2019">2019</Button>  
                      <Button onClick={handleClickYear} value="2018">2018</Button> 
                  </div>
              </div>

              <div className = "text-right legend-widget" onClick={handleLegendWidget}>
                        <span className="legend-widget-text">Legend</span>  
                  <div className={ classnames("legend-widget-popup", {display: toggleLegendWidget === true}) }>
                      <h6>Legend</h6> 
                      <Table> 
                      {
                        legend.map((data, index) => {
                          return <tr>
                            <td key={index}>
                            <FontAwesomeIcon icon="circle" color={data.color} ></FontAwesomeIcon>
                            </td>
                            <td> {data.name} </td>
                          </tr>
                        })
                      }
                      </Table>
                    
                  </div>
              </div>

                <Card className="">
                    <CardBody>
                      {
                        loading === true ? (
                      <Spinner></Spinner>
                        ): (
                      
                        <TabContent activeTab={activeRegion}>
                          <TabPane tabId="1">
                            <Table>
                              <thead className="dashboard-goal-icons">
                                <tr>
                                  <th></th>
                                { 
                                  sdgs.map(function(sdg, index){
                                          let  imgSrc = sdgsImages(`./${sdg.image}.png`);
                                          return <th key={index}>
                                                          <CardImg value={index}  alt="..." src={ imgSrc }></CardImg>
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
                                                 return <td key={count} id={scoreData.code + count} className = { scoreData["sdg"+count] } onClick={openModal} ></td>
                                                })  
                                             } 
                                          </tr>
                                    })
                                  }
                              </tbody>
                            
                            </Table>
                          </TabPane>
                          <TabPane tabId="2">
                         <Table>
                          <thead className="dashboard-goal-icons">
                                <tr>
                                  <th></th>
                                { 
                                  sdgs.map(function(sdg, index){
                                          let  imgSrc = sdgsImages(`./${sdg.image}.png`);
                                          return <th key={index}>
                                                          <CardImg value={index}  alt="..." src={ imgSrc }></CardImg>
                                          </th>
                                  })}
                                    
                                </tr>
                              </thead>
                              <tbody>
                              {
                                    dashboardData.map(function(scoreData, index){
                                      if(scoreData.region === "Central"){
                                          return <tr key={index} className={scoreData.region}>
                                                    <td className="sdg-data"> {scoreData.Country}</td>
                                                  { 
                                                    counter.map(function(count){
                                                      return <td key={count} id={scoreData.code + count} className = { scoreData["sdg"+count] } onClick={openModal} ></td>
                                                      })  
                                                  } 
                                                </tr>
                                         }
                                    })
                                  }
                              </tbody>
                              </Table>
                          </TabPane>
                          <TabPane tabId="3">
                            <Table className="">
                            <thead className="dashboard-goal-icons">
                                <tr>
                                  <th></th>
                                { 
                                  sdgs.map(function(sdg, index){
                                          let  imgSrc = sdgsImages(`./${sdg.image}.png`);
                                          return <th key={index}>
                                                          <CardImg value={index}  alt="..." src={ imgSrc }></CardImg>
                                          </th>
                                  })}
                                    
                                </tr>
                              </thead>
                              <tbody>
                                {
                                      dashboardData.map(function(scoreData, index){
                                        if(scoreData.region === "East"){
                                            return <tr key={index} className={scoreData.region}>
                                                      <td className="sdg-data"> {scoreData.Country}</td>
                                                    { 
                                                      counter.map(function(count){
                                                        return <td key={count} id={scoreData.code + count} className = { scoreData["sdg"+count] } onClick={openModal} ></td>
                                                        })  
                                                    } 
                                                  </tr>
                                          }
                                      })
                                    }
                                  
                              </tbody>
                          </Table>
                          </TabPane>
                          <TabPane tabId="4">
                            <Table className="">
                            <thead className="dashboard-goal-icons">
                                <tr>
                                  <th></th>
                                { 
                                  sdgs.map(function(sdg, index){
                                          let  imgSrc = sdgsImages(`./${sdg.image}.png`);
                                          return <th key={index}>
                                                          <CardImg value={index}  alt="..." src={ imgSrc }></CardImg>
                                          </th>
                                  })}
                                    
                                </tr>
                              </thead>
                              <tbody>
                              {
                                      dashboardData.map(function(scoreData, index){
                                        if(scoreData.region === "North"){
                                            return <tr key={index} className={scoreData.region}>
                                                      <td className="sdg-data"> {scoreData.Country}</td>
                                                    { 
                                                      counter.map(function(count){
                                                        return <td key={count} id={scoreData.code + count} className = { scoreData["sdg"+count] } onClick={openModal} ></td>
                                                        })  
                                                    } 
                                                  </tr>
                                          }
                                      })
                                    }
                              </tbody>
                          </Table>
                          </TabPane>
                          <TabPane tabId="5">
                            <Table className="">
                            <thead className="dashboard-goal-icons">
                                <tr>
                                  <th></th>
                                { 
                                  sdgs.map(function(sdg, index){
                                          let  imgSrc = sdgsImages(`./${sdg.image}.png`);
                                          return <th key={index}>
                                                          <CardImg value={index}  alt="..." src={ imgSrc }></CardImg>
                                          </th>
                                  })}
                                    
                                </tr>
                              </thead>
                              <tbody>
                              {
                                      dashboardData.map(function(scoreData, index){
                                        if(scoreData.region === "Southern"){
                                            return <tr key={index} className={scoreData.region}>
                                                      <td className="sdg-data"> {scoreData.Country}</td>
                                                      { 
                                                        counter.map(function(count){
                                                          return <td key={count} id={scoreData.code + count} className = { scoreData["sdg"+count] } onClick={openModal} ></td>
                                                          })  
                                                      } 
                                                  </tr>
                                          }
                                      })
                                    }
                              </tbody>
                          </Table>
                          </TabPane>
                          <TabPane tabId="6">
                            <Table className="">
                            <thead className="dashboard-goal-icons">
                                <tr>
                                  <th></th>
                                { 
                                  sdgs.map(function(sdg, index){
                                          let  imgSrc = sdgsImages(`./${sdg.image}.png`);
                                          return <th key={index}>
                                                          <CardImg value={index}  alt="..." src={ imgSrc }></CardImg>
                                          </th>
                                  })}
                                    
                                </tr>
                              </thead>
                              <tbody>
                              {
                                      dashboardData.map(function(scoreData, index){
                                        if(scoreData.region === "West"){
                                            return <tr key={index} className={scoreData.region}>
                                                      <td className="sdg-data"> {scoreData.Country}</td>
                                                    { 
                                                      counter.map(function(count){
                                                        return <td key={count} id={scoreData.code + count} className = { scoreData["sdg"+count] } onClick={openModal} ></td>
                                                        })  
                                                    } 
                                                  </tr>
                                          }
                                      })
                                    }
                              </tbody>
                          </Table>
                          </TabPane>      
                        </TabContent>
                        )}
                    </CardBody>
                  </Card>
                 
<Container>
                  <Modal size="sm" isOpen={toggleModal} toggle={toggleModal} className="dashboard-modal">
                    <div className="modal-header">
                        <h5 className="modal-title dashboardCountryName">{dashboardPopupData.country}  </h5>
                        <button aria-label="Close" className="close" data-dismiss="modal" type="button"
                                onClick={closeModal} >
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
                  <Footer></Footer>
              </main>
          
            </>
        )
    //}
}

export default Dashboard;