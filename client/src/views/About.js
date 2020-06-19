import React from "react";
import Header from "../components/aboutHeader";
import Footer from "../components/footer";
import { Row, Col, CardImg } from "reactstrap";
import { Link } from 'react-router-dom';


class About extends React.Component {
    render(){
        return(
            <>
            <Header></Header>
                <main className="about-page">
                <div className="container-fluid pl-5 pr-5 pb-5 about-page"> 
                <Row>
                    <Col md="10" lg="8" className="mx-auto">
                    <Row className="pl-5 pr-5 pt-3">
                    <p className="text-center mb-5">
                    The Portal aims to serve as a unique access point to timely and reliable information about SDG and 
                    Agenda 2063 data for Africa. The site is designed to help policy makers and enable the general public
                     to reuse data. The Portal provides easy access to an ever wider range of data from governments
                      institutions and governments partners bodies. It will assist national and regional discussions 
                      on where each country stands with regards to achieving the 2030 Agenda for Sustainable Development 
                      and the African Union 2063 Agenda, as well as which metrics might be useful to track progress. 
                    </p>
                    </Row>
                
                    <Row className="pl-5 pr-5 aboutCards">
                        <Col md="6">
                            <Row>
                                <Col md="8" className="text-right">
                                <Link to="/Sdgs"><h5>Sustainable Development Goals</h5></Link>
                                    <p>Visualize data in maps, ranks , charts, benchmark countries performance and analyze 
                                    time trends</p>
                                </Col>
                                <Col md="4">
                                    <Link to="/Sdgs">
                                        <CardImg alt="..." src={require("../assets/img/bg/sdgs2.png")}></CardImg>
                                    </Link>
                                    
                                </Col>
                            </Row> 
                        </Col>

                        <Col md="6">
                            <Row>
                                <Col md="4" className="text-right">
                                    <Link to="/Dashboard">
                                        <CardImg alt="..." src={require("../assets/img/bg/dashboard4.png")}></CardImg>
                                    </Link>
                                </Col>
                                <Col md="8">
                                <Link to="/Dashboard"> <h5>Dashboard</h5></Link>
                                    <p>Analysis of African countries' current status towards achieving the SDGs 
                                and highlight those SDGs that require particular attention in each country using traffic light
                                from red (worst)  to green (best) performing goal.</p>
                                </Col>
                            </Row>
                        </Col>

                        <Col md="6" className="mt-4">
                            <Row>
                                <Col md="8" className="text-right">
                                <Link to="/CountryProfile"><h5>Country Profile</h5></Link>
                                    <p>Snapshot of different performance metrics indicating progress towards the achievement of
                                    the SDGs</p>
                                </Col>
                                <Col md="4">
                                    <Link to="/CountryProfile">
                                        <CardImg alt="..." src={require("../assets/img/bg/dashboard3.png")}></CardImg>
                                    </Link>
                                </Col>
                            </Row> 
                        </Col>

                        <Col md="6" className="mt-4">
                            <Row>
                                <Col md="4"  className="text-right">
                                    <Link to="/Agenda2063">
                                        <CardImg alt="..." src={require("../assets/img/bg/agenda20632.png")}></CardImg>
                                    </Link>
                                </Col>
                                <Col md="8">
                                <Link to="/Agenda2063"> <h5>Agenda 2063</h5></Link>
                                    <p>Track current status of A2063 indicators</p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    </Col>
                </Row>
                    
                    
                </div>
     
            </main>
        <Footer></Footer>
            </>
        )
    }
}

export default About;