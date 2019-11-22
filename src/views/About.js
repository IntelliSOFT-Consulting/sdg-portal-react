import React from "react";
import Footer from "../components/footer";
import { Container, 
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
                <main>
                <div className="container-fluid pl-5 pr-5">
                    <Row className="pl-5 pr-5">
                    <h5 className="display-3 mb-4 mt-2 text-center">
                    Welcome to the SDG and Agenda 2063 Data Portal for Africa
                    </h5>
                    <p>
                    The Portal aims to serve as a unique access point to timely and reliable information about SDG and 
                    Agenda 2063 data for Africa. The site is designed to help policy makers and enable the general public
                     to reuse data. The Portal provides easy access to an ever wider range of data from governments
                      institutions and governments partners bodies. It will assist national and regional discussions 
                      on where each country stands with regards to achieving the 2030 Agenda for Sustainable Development 
                      and the African Union 2063 Agenda, as well as which metrics might be useful to track progress. 
                    </p>
                    </Row>
                   

                    <h5 className="display-4 mb-4 mt-2 text-center">
                    About the Data Portal
                    </h5>
                   
                    
                    <Row className="pl-5 pr-5 aboutCards">
                        <Col >
                            <Card className="sdgCard">
                                <CardHeader>
                                    SDGs
                                </CardHeader>
                                <CardImg alt="..." src={require("../assets/img/bg/sdg7.jpg")}>
                                </CardImg>
                                <CardBody>
                                    Visualize data in maps, ranks , charts, benchmark countries performance and analyze 
                                    time trends
                                </CardBody>
                            </Card>
                        </Col>
                        <Col >
                            <Card className="dashboardCard">
                                <CardHeader>
                                    Dashboard
                                </CardHeader>
                                <CardImg alt="..." src={require("../assets/img/bg/dashboard1.jpg")}>
                                </CardImg>
                                <CardBody>
                                    Analysis of African countries' current status towards achieving the SDGs 
                                    and highlight those SDGs that require particular attention in each country using traffic light
                                    from red (worst)  to green (best) performing goal.
                                </CardBody>
                            </Card>
                        </Col>
                        <Col >
                            <Card className="countryProfileCard">
                                <CardHeader>
                                   Country Profile
                                </CardHeader>
                                <CardImg alt="..." src={require("../assets/img/bg/country profile 4.png")}>
                                </CardImg>
                                <CardBody>
                                    Snapshot of different performance metrics indicating progress towards the achievement of
                                    the SDGs                                
                             </CardBody>
                            </Card>
                        </Col>
                        <Col >
                            <Card className="agenda2063Card">
                                <CardHeader>
                                Agenda 2063
                                </CardHeader>
                                <CardImg alt="..." src={require("../assets/img/bg/Agenda-2063 image II.png")}>
                                </CardImg>
                                <CardBody>
                                    Track current status of A2063 indicators
                                 </CardBody>
                            </Card>
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