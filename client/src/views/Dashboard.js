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
const Papa = require("papaparse/papaparse.min.js");


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
  const API_BASE = process.env.REACT_APP_API_BASE;
  let dashboardDataSource = require.context('../assets/data', true);
  

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
    fetchDashboardApi()
  }, [year])

  useEffect(() => {   
    console.log(dashboardData)
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
            "shorthand" : getShortHand( parseInt(sdgNumber))[0],
            "indicators": dashboardPopupIndicators
          })
        }
      }) 
    }
    
    parseDashboardData(activePopup);
  }, [activeRegion, year, activePopup])


  const getShortHand = (goalNo) => {
    var shortHand, description, color
    switch(goalNo){
      case 1:
        shortHand = ' No Poverty'
        description = 'UN definition: "Extreme poverty rates have fallen by more than half since 1990. While this is a remarkable achievement, one-in-five people in developing regions still live on less than $1.90 a day. Millions more make little more than this daily amount and are at risk of slipping back into extreme poverty."'
        color = '#e5243b';
        break
      case 2:
          shortHand = ' Zero Hunger'
          description = 'UN definition: "It is time to rethink how we grow, share and consume our food.If done right, agriculture, forestry and fisheries can provide nutritious food for all and generate decent incomes, while supporting people-centred rural development and protecting the environment." '
          color = '#dda73a'
          break
      case 3:
          shortHand = ' Good Health and Well Being'
          description = 'UN definition: "Significant strides have been made in increasing life expectancy and reducing some of the common killers responsible for child and maternal mortality." '
          color = '#4C9F38'
          break
      case 4:
          shortHand = ' Quality Education'
          description = 'UN definition: "Obtaining a quality education underpins a range of fundamental development drivers. Major progress has been made towards increasing access to education at all levels, particularly for women and girls. Basic literacy skills across the world have improved tremendously, yet bolder efforts are needed to achieve universal education goals for all. For example, the world has achieved equality in primary education between girls and boys, but few countries have achieved that target at all levels of education."'
          color = '#C5192D'
          break
      case 5:
          shortHand = ' Gender Equality'
          description = ' UN definition: "Gender equality is not only a fundamental human right, but a necessary foundation for a peaceful, prosperous and sustainable world. Providing women and girls with equal access to education, health care, decent work, and representation in political and economic decision-making processes will fuel sustainable economies and benefit societies and humanity at large."  '
          color = '#FF3A21'
          break
      case 6:
          shortHand = ' Clean Water & Sanitation '
          description = 'UN definition: "Clean water is a basic human need, and one that should be easily accessible to all. There is sufficient fresh water on the planet to achieve this. However, due to poor infrastructure, investment and planning, every year millions of people — most of them children — die from diseases associated with inadequate water supply, sanitation and hygiene."'
          color = '#26BDE2'
          break
      case 7:
          shortHand = ' Affordable And Clean Energy'
          description = 'UN definition: "Energy is central to nearly every major challenge and opportunity the world faces today. Be it for jobs, security, climate change, food production or increasing incomes, access to energy for all is essential. Transitioning the global economy towards clean and sustainable sources of energy is one of our greatest challenges in the coming decades. Sustainable energy is an opportunity – it transforms lives, economies and the planet." '
          color = '#FCC30B'
          break
      case 8:
          shortHand = ' Decent Work And Economic Growth'
          description = 'UN definition: "Roughly half the world’s population still lives on the equivalent of about US$2 a day. And in too many places, having a job doesn’t guarantee the ability to escape from poverty. This slow and uneven progress requires us to rethink and retool our economic and social policies aimed at eradicating poverty." '
          color = '#A21942'
          break
      case 9:
          shortHand = ' Industry, Innovation And Infrastructure'
          description = '  UN definition: "Investments in infrastructure – transport, irrigation, energy and information and communication technology – are crucial to achieving sustainable development and empowering communities in many countries. It has long been recognized that growth in productivity and incomes, and improvements in health and education outcomes require investment in infrastructure." '
          color = '#FD6925'
          break
      case 10:
          shortHand = ' Reduced Inequalities'
          description = 'UN definition: "The international community has made significant strides towards lifting people out of poverty. The most vulnerable nations – the least developed countries, the landlocked developing countries and the small island developing states – continue to make inroads into poverty reduction. However, inequality still persists and large disparities remain in access to health and education services and other assets." '
          color = '#DD1367'
          break
      case 11:
          shortHand = ' Sustainable Cities And Communities'
          description = 'UN definition: "The challenges cities face can be overcome in ways that allow them to continue to thrive and grow, while improving resource use and reducing pollution and poverty. The future we want includes cities of opportunities for all, with access to basic services, energy, housing, transportation and more." '
          color = '#FD9D24'
          break
      case 12:
          shortHand = ' Responsible Consumption and Production'
          description = 'UN definition: "Sustainable consumption and production is about promoting resource and energy efficiency, sustainable infrastructure, and providing access to basic services, green and decent jobs and a better quality of life for all. Its implementation helps to achieve overall development plans, reduce future economic, environmental and social costs, strengthen economic competitiveness and reduce poverty." '
          color = '#BF8B2E'
          break
      case 13:
          shortHand = ' Climate Action'
          description = 'UN definition: "Affordable, scalable solutions are now available to enable countries to leapfrog to cleaner, more resilient economies. The pace of change is quickening as more people are turning to renewable energy and a range of other measures that will reduce emissions and increase adaptation efforts." '
          color = '#3F7E44'
          break
      case 14:
          shortHand = ' Life Below Water'
          description = 'UN definition: "Our oceans — their temperature, circulation, chemistry, and ecosystems — play a fundamental role in making Earth habitable. Our rainwater, drinking water, weather, climate, coastlines, much of our food, and even the oxygen in the air we breathe, are all ultimately provided and regulated by the sea. Throughout history, oceans and seas have been vital conduits for trade and transportation. Careful management of this essential global resource is a key feature of a sustainable future." '
          color = '#0A97D9'
          break
      case 15:
          shortHand = ' Life On Land'
          description = 'UN definition: "Forests cover 30 per cent of the Earth’s surface and in addition to providing food security and shelter, forests are key to combating climate change, protecting biodiversity and the homes of the indigenous population. Thirteen million hectares of forests are being lost every year while the persistent degradation of drylands has led to the desertification of 3.6 billion hectares." '
          color = '#56C02B'
          break
      case 16:
          shortHand = ' Peace, Justice And Strong Institutions'
          description = 'UN definition: "Goal 16 of the Sustainable Development Goals is dedicated to the promotion of peaceful and inclusive societies for sustainable development, the provision of access to justice for all, and building effective, accountable institutions at all levels." '
          color = '#00689D'
          break
      case 17:
          shortHand = ' Partnership For The Goals'
          description = 'UN definition: "A successful sustainable development agenda requires partnerships between governments, the private sector and civil society. These inclusive partnerships built upon principles and values, a shared vision, and shared goals that place people and the planet at the centre, are needed at the global, regional, national and local level." '
          color = '#19486A'
          break
      default:
          shortHand = 'No poverty'
    }
    return [shortHand, color];
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
                                              return <th key={index} style={{color:getShortHand(index+1)[1] }} >
                                                              {getShortHand(index+1)[0]}
                                                      </th>
                                      })
                                    }
                                </tr>
                                <tr>
                                  <th></th>
                                  { 
                                    sdgs.map(function(sdg, index){
                                            let  imgSrc = sdgsImages(`./${sdg.image}.png`);
                                            return <th key={index} style={{color:getShortHand(index+1)[1] }}>
                                                            {index+1}
                                                    </th>
                                    })
                                  }
                                </tr>
                              </thead>
                              <tbody>
                                  {
                                    dashboardData.map(function(scoreData, index){
                                    return <tr key={index} className={scoreData.region}>
                                              <td className="sdg-data"> <div className="sdg-data-country"> {scoreData.Country}</div></td>
                                             { 
                                              counter.map(function(count){
                                                 return <td key={count} id={scoreData.code + count} className = { scoreData["sdg"+count] } onClick={openModal} > </td>
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
                                                     <td className="sdg-data"> <div className="sdg-data-country"> {scoreData.Country}</div></td>
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
                                                     <td className="sdg-data"> <div className="sdg-data-country"> {scoreData.Country}</div></td>
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
                                                      <td className="sdg-data"> <div className="sdg-data-country"> {scoreData.Country}</div></td>
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
                                                      <td className="sdg-data"> <div className="sdg-data-country"> {scoreData.Country}</div></td>
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

                                                     <td className="sdg-data"> <div className="sdg-data-country"> {scoreData.Country}</div></td>
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