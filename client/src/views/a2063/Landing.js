import React, { useState } from 'react';
import Header from '../../components/a2063LandingHeader';
import Footer from '../../components/footer';
import {  Row, Col, Button } from 'reactstrap';
import {Link, Redirect} from 'react-router-dom';
import styled, { keyframes } from "styled-components";
import Pulse from "@bit/formidablelabs.react-animations.pulse";
const PulseAnimation = keyframes`${Pulse}`;
const PulseDiv = styled.div`
  animation: infinite 2s ${PulseAnimation};
`;


function Agenda2063Landing( ) {

  const images = require.context('../../assets/img/a2063_icons', true);
  const agenda2063 = [
    {
      id :0,
      image  : "a2063_big_icon",
      imageSolid  : "a2063_big_icon",
      color: "rgb(241, 90, 46)",
      title: "Agenda 2063: The Africa We Want.",
      description: "Agenda 2063 is Africa’s blueprint and master plan for transforming Africa into the global powerhouse of the future. It is the continent’s strategic framework that aims to deliver on its goal for inclusive and sustainable development and is a concrete manifestation of the pan-African drive for unity, self-determination, freedom, progress and collective prosperity pursued under Pan-Africanism and African Renaissance",
      goals: [
        "Goal 1: A High Standard of Living, Quality of Life and Well Being for All",
        "Goal 2: Well Educated Citizens and Skills revolution underpinned by Science, Technology and Innovation", 
        "Goal 3: Healthy and Well-Nourished Citizens",
        "Goal 4: Transformed Economies and Job Creation",
        "Goal 5: Modern Agriculture for increased productivity and production",
        "Goal 6: Blue/ ocean economy for accelerated economic growth",
        "Goal 7: Environmentally sustainable climate-resilient economies and communities"
      ]
  },{
              id :1,
              image  : "Aspirations_1_0",
              imageSolid  : "Aspirations_1_hover",
              color: "rgb(241, 90, 46)",
              title: "Prosperous Africa",
              description: "A Prosperous Africa Based on Inclusive Growth and Sustainable Development",
              goals: [
                "Goal 1: A High Standard of Living, Quality of Life and Well Being for All",
                "Goal 2: Well Educated Citizens and Skills revolution underpinned by Science, Technology and Innovation", 
                "Goal 3: Healthy and Well-Nourished Citizens",
                "Goal 4: Transformed Economies and Job Creation",
                "Goal 5: Modern Agriculture for increased productivity and production",
                "Goal 6: Blue/ ocean economy for accelerated economic growth",
                "Goal 7: Environmentally sustainable climate-resilient economies and communities"
              ]
          },{
              id:2,
              image  : "Aspirations_2_0",
              imageSolid  : "Aspirations_2_hover",
              color: 'rgb(69, 86, 164)',
              title: "Integrated Africa",
              description: "An Integrated Continent, Politically United and Based on the Ideals of Pan-Africanism and a Vision of African Renaissance",
              goals: [
                "Goal 8: United Africa (Federal or Confederate)",
                "Goal 9: Key Continental Financial and Monetary Institutions established and functional. Indicators under this goal are applicable to only regional and continental levels",
                "Goal 10: World Class Infrastructure crisscrosses Africa"
              ],
            },{
              id:3,
              image  : "Aspirations_3_0",
              imageSolid  : "Aspirations_3_hover",
              color: "rgb(143, 63, 152)",
              title: "Democratic Africa",
              description: "An Africa of Good Governance, Democracy, Respect for Human Rights, Justice and the Rule of Law",
              goals: [
               "Goal 11: Democratic values, practices, universal principles of human rights, justice and the rule of law entrenched",
              "Goal 12: Capable institutions and transformed leadership in place at all levels"

              ]
            },{
              id:4,
              image  : "Aspirations_4_0",
              imageSolid  : "Aspirations_4_hover",
              color: "rgb(3, 152, 136)",
              title: "Peaceful Africa",
              description: "A Peaceful and Secure Africa",
              goals: [
                "Goal 13: Peace, Security and Stability are preserved",
                "Goal 14: A Stable and Peaceful Africa",
                "Goal 15: A Fully Functional and Operational African Peace and Security Architecture"
              ]
          },{
              id:5,
              image: "Aspirations_5_0",
              imageSolid  : "Aspirations_5_hover",
              color: "rgb(251, 193, 25)",
              title: "Strong Cultural Identity",
              description: "Africa With a Strong Cultural Identity, Common Heritage, Values and Ethics",
              goals: [
                "Goal 16: African Cultural Renaissance is pre-eminent"
              ]
          },{
              id:6,
              image: "Aspirations_6_0",
              imageSolid  : "Aspirations_6_hover",
              color: "rgb(232, 32, 101)",
              title: "People Driven Continent",
              description: "An Africa Whose Development is People Driven, Relying on the Potential of the African People",
              goals: [
                "Goal 17: Full Gender Equality in All Spheres of Life",
                "Goal 18: Engaged and Empowered Youth and Children"

              ]
          },{
              id:7,
              image: "Aspirations_7_0",
              imageSolid  : "Aspirations_7_hover",
              color: "rgb(84, 37, 60)",
              title: "International Dynamic",
              description: "Africa as a Strong and Influential Global Partner",
              goals: [
                "Goal 19: Africa as a major partner in global affairs and peaceful co-existence",
                "Goal 20: Africa takes full responsibility for financing her development"
              ]
          }
  
  ];
 
  let currAngle = -135;
  let degreeAngle = 360 / (agenda2063.length - 1);

  const [activeA2063, setActive2063] = useState(0);
  const [redirect, setRedirect] = useState(false);

  const handleA2063Change = (a2063) =>{
    setActive2063(a2063.currentTarget.value)
  }

  const renderRedirect = (a2063) =>{
    if(redirect){
      return <Redirect to={{ pathname:"/Agenda2063",
                              state: a2063
      }}></Redirect>
    }
  }

  const handleA2063Index = (a2063) =>{
    setActive2063(a2063.currentTarget.value)

  }

  const handleExploreButton = () =>{
    setRedirect(true)
  }
      return(
        <>
        <Header></Header>
        <div className="agenda2063-landing-div"> 
            <Row>
              <Col lg="7" md="7" sm="12" xs="12">
                  <div className="circle-container">
                          { 
                              agenda2063.map(function(a2063, index){
                                let rotate = degreeAngle * index + currAngle ;
                                let reverseRotate = rotate * -1
                                let transform  = 'rotate(' + rotate + 'deg) translate(16em) rotate(' + reverseRotate + 'deg)'  ;
                                let imgSrc = images(`./${a2063.image}.png`);
                                let imageHover = images(`./${a2063.imageSolid}.png`);

                                const backgroundHoverStyles = {
                                  backgroundImage: `url(${imageHover})`,
                                  width: "100%",
                                  height: "100%",
                                  backgroundSize: "cover"
                              }
                              const backgroundStyles = {
                                  backgroundImage: `url(${imgSrc})`,
                                  width: "100%",
                                  height: "100%",
                                  backgroundSize: "cover"
                              }

                                if(index !== 0){
                                  return <Button onClick={handleA2063Change} value={index} style={{ transform }} className="a2063-circle" key={index}>
                                              <div style={ parseInt(activeA2063) === index ? backgroundHoverStyles : backgroundStyles }></div>
                                        </Button>
                                }else{
                                  transform = '';
                                  
                                  return <Button value={index} className="a2063-circle" key={index} onClick={handleA2063Index}>
                                          <div style={ parseInt(activeA2063) === index ? backgroundHoverStyles : backgroundStyles }></div>
                                        </Button>
                                        
                                }
                          })}
                  </div>
              </Col>

              <Col lg="5" md="5" sm="12" xs="12">
              {
                      agenda2063.map(function(a2063, index){
                          let a2063Number = index ;
                          let goals = a2063.goals;
                         if (parseInt(a2063Number) === parseInt(activeA2063) && parseInt(activeA2063) !== 0 )  {
                          return <div className="a2063-goal-div" key={index}>
                            <div>
                              <h4> Aspiration {index} : {a2063.description} </h4>
                              <div className="agenda2063-goals">
                                {
                                  goals.map(function(goal, index){
                                    return <div key={index}>{goal} </div>
                                  })
                                }
                              </div>
                            </div>
                          </div>
                          } else if (parseInt(a2063Number) === parseInt(activeA2063) && parseInt(activeA2063) === 0 ) {
                              return <div className="a2063-goal-div">
                                <h4 className="agenda2063-metadata-title"> {a2063.title} </h4>
                                <div className="agenda2063-metadata"> {a2063.description} </div>
                              </div>
                          }
                        })
                    }
                     <div className="text-center pt-3">
                       <PulseDiv>
                       <Button onClick={handleExploreButton}  className="btn btn-explore">Explore data</Button>
                       </PulseDiv>
                       {renderRedirect(activeA2063)}
                       
                        
                    </div>
              </Col>

            </Row>
            <Footer></Footer>
        </div>
           

       
        </>
      );
    }
  
export default Agenda2063Landing;