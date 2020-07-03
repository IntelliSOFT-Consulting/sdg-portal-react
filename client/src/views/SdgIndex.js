import React, { useState } from 'react';
import Header from '../components/sdgLandingHeader';
import Footer from '../components/footer';
import { Row, Col, CardImg, Button } from "reactstrap";

import {  Redirect} from 'react-router-dom';
import ReadMoreReact from 'read-more-react';
import styled, { keyframes } from "styled-components";
import Pulse from "@bit/formidablelabs.react-animations.pulse";

const PulseAnimation = keyframes`${Pulse}`;
const PulseDiv = styled.div`
  animation: infinite 1.5s ${PulseAnimation};
`;

function SdgIndex() {
  const [activeSdg, setActiveSdg] = useState('1');
  const [redirect, setRedirect] = useState(false);
  const images = require.context('../assets/img/sdg_icons', true);
  const sdgs = [{
          id :1,
          image : "E_SDG_Icons-01",
          color : "#E5243B", 
          "title": "Goal 1: No Poverty",
          "description": "End poverty in all its forms everywhere\n\nThe UN explains: Extreme poverty rates have fallen by more than half since 1990. While this is a remarkable achievement, one-in-five people in developing regions still live on less than $1.90 a day. Millions more make little more than this daily amount and are at risk of slipping back into extreme poverty. Sustainable Development Goal 1 (SDG1) aims to eradicate extreme poverty by 2030.\n\nThe UN has defined 7 Targets and 14 Indicators for SDG 1. Targets specify the goals and Indicators represent the metrics by which the world aims to track whether these Targets are achieved."
      },{
          id:2,
          image : "E_SDG_Icons-02",
          color : "#DDA63A",
          "title": "Goal 2: Zero Hunger",
          "description": "End hunger, achieve food security and improved nutrition and promote sustainable agriculture\n\nThe UN explains: \"It is time to rethink how we grow, share and consume our food. If done right, agriculture, forestry and fisheries can provide nutritious food for all and generate decent incomes while supporting people-centred rural development and protecting the environment.\nRight now, our soils, freshwater, oceans, forests and biodiversity are being rapidly degraded. Climate change is putting even more pressure on the resources we depend on, increasing risks associated with disasters such as droughts and floods. Many rural women and men can no longer make ends meet on their land, forcing them to migrate to cities in search of opportunities.\nA profound change of the global food and agriculture system is needed if we are to nourish today’s 815 million hungry and the additional 2 billion people expected by 2050.\nThe food and agriculture sector offers key solutions for development, and is central for hunger and poverty eradication.\"\n\nThe UN has defined 8 Targets and 13 Indicators for SDG 2. Targets specify the goals and Indicators represent the metrics by which the world aims to track whether these Targets are achieved."
      },{
          id:3,
          image: "E_SDG_Icons-03",
          color : "#4C9F38",
          "title": "Goal 3: Good Health and Well-Being",
          "description": "Ensure healthy lives and promote well-being for all at all ages\n\nThe UN explains: \"Significant strides have been made in increasing life expectancy and reducing some of the common killers responsible for child and maternal mortality.\n\nMajor progress has also been made on increasing access to clean water and sanitation, reducing malaria, tuberculosis, polio and the spread of HIV/AIDS.\n\nHowever, many more efforts are needed to control a wide range of diseases and address many different persistent and emerging health issues.\"\n\nThe UN has defined 13 Targets and 28 Indicators for SDG 3. Targets specify the goals and Indicators represent the metrics by which the world aims to track whether these Targets are achieved."
      },{
          id:4,
          image: "E_SDG_Icons-04",
          color : "#C5192D",
          "title": "Goal 4: Quality Education",
    "description": "Ensure inclusive and quality education for all and promote lifelong learning\n\nThe UN explains: \"Obtaining a quality education underpins a range of fundamental development drivers. Major progress has been made towards increasing access to education at all levels, particularly for women and girls.\n\nBasic literacy skills across the world have improved tremendously, yet bolder efforts are needed to achieve universal education goals for all. For example, the world has achieved equality in primary education between girls and boys, but few countries have achieved that target at all levels of education.\"\n\nThe UN has defined 10 Targets and 11 Indicators for SDG 4. Targets specify the goals and Indicators represent the metrics by which the world aims to track whether these Targets are achieved."
      },{
          id:5,
          image: "E_SDG_Icons-05",
          color : "#FF3A21",
          "title": "Goal 5: Gender Equality",
    "description": "Achieve gender equality and empower all women and girls\n\nThe UN explains: \"Gender equality is not only a fundamental human right, but a necessary foundation for a peaceful, prosperous and sustainable world.\n\nProviding women and girls with equal access to education, health care, decent work, and representation in political and economic decision-making processes will fuel sustainable economies and benefit societies and humanity at large.\"\n\nThe UN has defined 9 Targets and 14 Indicators for SDG 5. Targets specify the goals and Indicators represent the metrics by which the world aims to track whether these Targets are achieved."
      },{
          id:6,
          image: "E_SDG_Icons-06",
          color : "#26BDE2",
          "title": "Goal 6: Clean Water and Sanitation",
          "description": "Ensure access to water and sanitation for all\n\nThe UN explains: \"Clean water is a basic human need, and one that should be easily accessible to all. There is sufficient fresh water on the planet to achieve this. However, due to poor infrastructure, investment and planning, every year millions of people — most of them children — die from diseases associated with inadequate water supply, sanitation and hygiene.\"\n\nThe UN has defined 8 Targets and 11 Indicators for SDG 6. Targets specify the goals and Indicators represent the metrics by which the world aims to track whether these Targets are achieved."
      },{
          id:7,
          image: "E_SDG_Icons-07", 
          color : "#FCC30B",
          "title": "Goal 7: Affordable and Clean Energy",
    "description": "Ensure access to affordable, reliable, sustainable and modern energy for all\n\nThe UN explains: \"Energy is central to nearly every major challenge and opportunity the world faces today. Be it for jobs, security, climate change, food production or increasing incomes, access to energy for all is essential.\n\nTransitioning the global economy towards clean and sustainable sources of energy is one of our greatest challenges in the coming decades. Sustainable energy is an opportunity – it transforms lives, economies and the planet.\"\n\nThe UN has defined 5 Targets and 6 Indicators for SDG 7. Targets specify the goals and Indicators represent the metrics by which the world aims to track whether these Targets are achieved."
      },{
          id:8,
          image: "E_SDG_Icons-08",
          color : "#A21942",
          "title": "Goal 8: Decent Work and Economic Growth",
    "description": "Promote inclusive and sustainable economic growth, employment and decent work for all\n\nThe UN explains: Roughly half the world’s population still lives on the equivalent of about US$2 a day. And in too many places, having a job doesn’t guarantee the ability to escape from poverty. This slow and uneven progress requires us to rethink and retool our economic and social policies aimed at eradicating poverty.\n\nThe UN has defined 12 Targets and 17 Indicators for SDG 8. Targets specify the goals and Indicators represent the metrics by which the world aims to track whether these Targets are achieved."
      },{
          id:9,
          image: "E_SDG_Icons-09",
          color : "#FD6925",
          "title": "Goal 9: Industry, Innovation and Infrastructure",
    "description": "Build resilient infrastructure, promote sustainable industrialization and foster innovation\n\nThe UN explains: Investments in infrastructure – transport, irrigation, energy and information and communication technology – are crucial to achieving sustainable development and empowering communities in many countries. It has long been recognized that growth in productivity and incomes, and improvements in health and education outcomes require investment in infrastructure.\n\nThe UN has defined 8 Targets and 12 Indicators for SDG 9. Targets specify the goals and Indicators represent the metrics by which the world aims to track whether these Targets are achieved."
      },{
          id:10,
          image: "E_SDG_Icons-10", 
          color : "#DD1367",
          "title": "Goal 10: Reduced Inequalities",
    "description": "Reduce inequality within and among countries\n\nThe UN explains: The international community has made significant strides towards lifting people out of poverty. The most vulnerable nations – the least developed countries, the landlocked developing countries and the small island developing states – continue to make inroads into poverty reduction. However, inequality still persists and large disparities remain in access to health and education services and other assets.\n\nThe UN has defined 10 Targets and 11 Indicators for SDG 10. Targets specify the goals and Indicators represent the metrics by which the world aims to track whether these Targets are achieved."
      },{
          id:11,
          image: "E_SDG_Icons-11",
          color : "#FD9D24",
          "title": "Goal 11: Sustainable Cities and Communities",
    "description": "Make cities inclusive, safe, resilient and sustainable\n\nThe UN explains: The challenges cities face can be overcome in ways that allow them to continue to thrive and grow, while improving resource use and reducing pollution and poverty. The future we want includes cities of opportunities for all, with access to basic services, energy, housing, transportation and more.\n\nThe UN has defined 10 Targets and 15 Indicators for SDG 11. Targets specify the goals and Indicators represent the metrics by which the world aims to track whether these Targets are achieved."
      },{
          id:12,
          image: "E_SDG_Icons-12",
          color : "#BF8B2E",
          "title": "Goal 12: Responsible Consumption and Production",
    "description": "Ensure sustainable consumption and production patterns\n\nThe UN explains: Sustainable consumption and production is about promoting resource and energy efficiency, sustainable infrastructure, and providing access to basic services, green and decent jobs and a better quality of life for all. Its implementation helps to achieve overall development plans, reduce future economic, environmental and social costs, strengthen economic competitiveness and reduce poverty.\n\nThe UN has defined 11 Targets and 13 Indicators for SDG 12. Targets specify the goals and Indicators represent the metrics by which the world aims to track whether these Targets are achieved."
      },{
          id:13,
          image: "E_SDG_Icons-13",
          color : "#3F7E44",
          "title": "Goal 13: Climate Action",
          "description": "Take urgent action to combat climate change and its impacts\n\nThe UN explains: Affordable, scalable solutions are now available to enable countries to leapfrog to cleaner, more resilient economies. The pace of change is quickening as more people are turning to renewable energy and a range of other measures that will reduce emissions and increase adaptation efforts.\n\nThe UN has defined 5 Targets and 8 Indicators for SDG 13. Targets specify the goals and Indicators represent the metrics by which the world aims to track whether these Targets are achieved."
      },{
          id:14,
          image: "E_SDG_Icons-14",
          color : "#0A97D9",
          "title": "Goal 14: Life below Water",
    "description": "Conserve and sustainably use the oceans, seas and marine resources\n\nThe UN explains: \"Our oceans — their temperature, circulation, chemistry, and ecosystems — play a fundamental role in making Earth habitable.\n\nOur rainwater, drinking water, weather, climate, coastlines, much of our food, and even the oxygen in the air we breathe, are all ultimately provided and regulated by the sea. Throughout history, oceans and seas have been vital conduits for trade and transportation. Careful management of this essential global resource is a key feature of a sustainable future.\"\n\nThe UN has defined 10 Targets and 10 Indicators for SDG 14. Targets specify the goals and Indicators represent the metrics by which the world aims to track whether these Targets are achieved."
      },{
          id:15,
          image: "E_SDG_Icons-15",
          color : "#56C02B",
          "title": "Goal 15: Life on Land",
    "description": "Sustainably manage forests, combat desertification, halt and reverse land degradation, halt biodiversity loss\n\nThe UN explains: Forests cover 30 per cent of the Earth’s surface and in addition to providing food security and shelter, forests are key to combating climate change, protecting biodiversity and the homes of the indigenous population. Thirteen million hectares of forests are being lost every year while the persistent degradation of drylands has led to the desertification of 3.6 billion hectares.\n\nThe UN has defined 12 Targets and 14 Indicators for SDG 15. Targets specify the goals and Indicators represent the metrics by which the world aims to track whether these Targets are achieved."
      },{
          id:16,
          image: "E_SDG_Icons-16",
          color : "#00689D",
          "title": "Goal 16: Peace, Justice and Strong Institutions",
      "description": "Promote just, peaceful and inclusive societies\n\nThe UN explains: Goal 16 of the Sustainable Development Goals is dedicated to the promotion of peaceful and inclusive societies for sustainable development, the provision of access to justice for all, and building effective, accountable institutions at all levels.\n\nThis aims to promote peaceful societies at national levels, as well as the role of cooperation at the international level.\n\nThe UN has defined 12 Targets and 23 Indicators for SDG 16. Targets specify the goals and Indicators represent the metrics by which the world aims to track whether these Targets are achieved."
          } ,{
          id:17,
          image: "E_SDG_Icons-17",
          color : "#19486A",
          "title": "Goal 17: Partnerships for the Goals",
      "description": "Revitalize the global partnership for sustainable development\n\nThe UN explains: A successful sustainable development agenda requires partnerships between governments, the private sector and civil society. These inclusive partnerships built upon principles and values, a shared vision, and shared goals that place people and the planet at the centre, are needed at the global, regional, national and local level.\n\nThe UN has defined 19 Targets and 25 Indicators for SDG 17. Targets specify the goals and Indicators represent the metrics by which the world aims to track whether these Targets are achieved."
      },{
        id:18,
        image: "E_SDG_Icons-18",
        color : "#19486A",
        "title": "",
    "description": "The Sustainable Development Goals (SDGs), also known as the Global Goals, were adopted by all United Nations Member States in 2015 as a universal call to action to end poverty, protect the planet and ensure that all people enjoy peace and prosperity by 2030. \n\n The 17 SDGs are integrated—that is, they recognize that action in one area will affect outcomes in others, and that development must balance social, economic and environmental sustainability."
    }
      
  ];
  // const sdgMetaData = require("../assets/data/sdgs.json");

  const handleOnClick = (sdg) =>{
    setActiveSdg(sdg.currentTarget.value);
  }

    const renderRedirect = (sdg) =>{
      if(redirect){
        return <Redirect to={{ pathname:"/Sdgs",
                                state: sdg
        }}></Redirect>
      }
    }

    const handleExploreButton = () =>{
      setRedirect(true)
    }

      return(
        <>
        <Header></Header>
        <div className="sdg-index">
        
          <Row>
              <Col lg="4" md="4" sm="12" xs="12">
                    {
                      sdgs.map(function(sdg, index){
                          let  imgSrc = images(`./${sdg.image}.jpg`);
                          let sdgNumber = index + 1;
                          let border = '3px solid ' + sdg.color; 

                        return sdgNumber === parseInt(activeSdg) ? (
                          <div style={{border}} className="sdg-goal-div bounce-2" key={index}>
                            <Row>
                              <Col md="4">
                                <Button>
                                    <CardImg src={ imgSrc }></CardImg>
                                </Button>
                              </Col>
                              <Col md="8">
                              <h5> {sdg.title} </h5>
                              <ReadMoreReact text = {sdg.description}
                                    min={145}
                                    ideal={150}
                                    max={155} readMoreText="Read more..." >
                              </ReadMoreReact>
                              </Col>
                              
                            </Row>
                          </div>  
                          ) : null   
                        })
                    }
                  
                    <div className="text-center pt-3">
                    <PulseDiv>
                        <Button onClick={handleExploreButton} className="btn btn-explore">Explore data</Button>
                        </PulseDiv>
                        {renderRedirect(activeSdg)}
                    </div>
              </Col>
              <Col lg="8" md="8" sm="12" xs="12">
                    
                  <Row className="no-gutters">
                  { 
                              sdgs.map(function(sdg, index){
                                  let  imgSrc = images(`./${sdg.image}.jpg`);
                                  return <Col md="2" className="sdg-index-images" key={index}>
                                    <Button value={ index+1 } onClick={handleOnClick}>
                                      <CardImg src={ imgSrc } ></CardImg>
                                    </Button>
                                      
                                  </Col>
                          })}
                  </Row>
              </Col>

             
            </Row>
        </div>
         <Footer></Footer>
        </>
      );
    }
  
    export default SdgIndex;