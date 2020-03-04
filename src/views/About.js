import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { 
        Row, 
        Col,
        Card, 
        CardBody,
        CardHeader,
        CardImg
} from "reactstrap";


class About extends React.Component {
    render(){
        return(
            <>
            <Header></Header>
                <main>
                <div className="container-fluid pl-5 pr-5 pb-5">
                     <h5 className="display-3 mb-4 mt-2 text-center">The SDG and Agenda 2063 Data Portal for Africa</h5>
                    <Row className="pl-5 pr-5">
                   
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
                                    <h5>Sustainable Development Goals</h5>
                                    <p>Visualize data in maps, ranks , charts, benchmark countries performance and analyze 
                                    time trends</p>
                                </Col>
                                <Col md="4">
                                    <CardImg alt="..." src={require("../assets/img/bg/sdgs2.png")}></CardImg>
                                </Col>
                            </Row> 
                        </Col>

                        <Col md="6">
                            <Row>
                                <Col md="4" className="text-right">
                                    <CardImg alt="..." src={require("../assets/img/bg/dashboard4.png")}></CardImg>
                                </Col>
                                <Col md="8">
                                    <h5>Dashboard</h5>
                                    <p>Analysis of African countries' current status towards achieving the SDGs 
                                and highlight those SDGs that require particular attention in each country using traffic light
                                from red (worst)  to green (best) performing goal.</p>
                                </Col>
                            </Row>
                        </Col>

                        <Col md="6" className="mt-4">
                            <Row>
                                <Col md="8" className="text-right">
                                    <h5>Country Profile</h5>
                                    <p>Snapshot of different performance metrics indicating progress towards the achievement of
                                    the SDGs</p>
                                </Col>
                                <Col md="4">
                                <CardImg alt="..." src={require("../assets/img/bg/dashboard3.png")}>
                                </CardImg>
                                </Col>
                            </Row> 
                        </Col>

                        <Col md="6" className="mt-4">
                            <Row>
                                <Col md="4"  className="text-right">
                                <CardImg alt="..." src={require("../assets/img/bg/agenda20632.png")}>
                                </CardImg>
                                </Col>
                                <Col md="8">
                                    <h5>Agenda 2063</h5>
                                    <p>Track current status of A2063 indicators</p>
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