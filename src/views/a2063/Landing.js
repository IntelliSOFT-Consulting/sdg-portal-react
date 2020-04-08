import React, { useState } from 'react';
import Header from '../../components/a2063LandingHeader';
import Radialmenu from '../../visualizations/radialMenu';
import { Container, Row, Col, CardImg, Button } from 'reactstrap';
import { Link, Redirect} from 'react-router-dom'

function Agenda2063Landing( ) {

  const images = require.context('../../assets/img/a2063_icons', true);
  const agenda2063 = [{
              id :1,
              image  : "Aspirations_1_0",
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
              color: "rgb(251, 193, 25)",
              title: "Strong Cultural Identity",
              description: "Africa With a Strong Cultural Identity, Common Heritage, Values and Ethics",
              goals: [
                "Goal 16: African Cultural Renaissance is pre-eminent"
              ]
          },{
              id:6,
              image: "Aspirations_6_0",
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
              color: "rgb(84, 37, 60)",
              title: "International Dynamic",
              description: "Africa as a Strong and Influential Global Partner",
              goals: [
                "Goal 19: Africa as a major partner in global affairs and peaceful co-existence",
                "Goal 20: Africa takes full responsibility for financing her development"
              ]
          }
  
  ];

  let currAngle = 0;
  let degreeAngle = 360 / agenda2063.length;

  const [activeA2063, setActive2063] = useState(1);

  const handleA2063Change = (a2063) =>{
    setActive2063(a2063.currentTarget.value)
  }
      return(
        <>
        <Header></Header>
        <div className="agenda2063-landing-div" > 
            {/* <Radialmenu></Radialmenu> */}
            <Row>
              <Col>
                  <div className="circle-container">
                  { 
                              agenda2063.map(function(a2063, index){
                                  
                                  let transform = 'rotate(' + currAngle + 'deg) translate(15em) rotate(-' + currAngle + 'deg)' ;
                                  currAngle = currAngle + degreeAngle;
                                  let  imgSrc = images(`./${a2063.image}.png`);
                                  let a2063Number = index + 1;
                                  return <Button onClick={handleA2063Change} value={index+1} style={{  transform }} className="a2063-circle">
                                            <CardImg src={ imgSrc } ></CardImg>
                                        </Button>
                          })}
                  </div>
              </Col>

              <Col>
              {
                      agenda2063.map(function(a2063, index){
                          let imgSrc = images(`./${a2063.image}.png`);
                          let a2063Number = index + 1;
                          let border = '3px solid ' + a2063.color; 
                          let goals = a2063.goals;
                        return a2063Number == activeA2063 ? (
                          <div style={{border}} className="sdg-goal-div">
                            <div>
                              <Button >
                                  <CardImg src={ imgSrc }></CardImg>
                              </Button>
                              <h4> {a2063.title} </h4>
                              <p>
                              { a2063.description }
                              </p>
                              <ul className="agenda2063-goals">
                                {
                                  goals.map(function(goal){
                                    return <li>{goal} </li>
                                  })
                                }
                              </ul>
                            </div>
                          </div>
                          ) : null   
                        })
                    }
                     <div className="text-center pt-3">
                        <Link to="/Agenda2063" className="btn btn-explore">Explore data</Link>
                        
                    </div>
              </Col>

            </Row>
        </div>
           

        
        </>
      );
    }
  
export default Agenda2063Landing;