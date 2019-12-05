import React from "react";
import Header from "../components/homeHeader";
import Footer from "../components/footer";
import { BrowserRouter, Link} from 'react-router-dom'
import { Container, Col, Row, Input, InputGroupAddon, InputGroupText, InputGroup} from "reactstrap";


class Home extends React.Component {
    render(){
        return(
            <>
            <Header></Header>
                <main className="home">
                    <div className="homeOverLay">
                        <Container className="homeText">
                        <h2 className="display-2 text-white">
                        Africa SDG Watch is a public platform to visualize and explore data, benchmark progress towards the 
                        SDGs and track performance of development indicators.
                        </h2>
                        </Container> 
                        <Row>
                            <Col md="4"></Col>
                            <Col md="4">
                                <Link to="/Sdgs/Sdg_1" className="btn btn-warning text-white">Explore Development Data</Link>
                            </Col>
                            <Col md="3">
                                <InputGroup className="mb-4">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                        <i className="ni ni-zoom-split-in" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input placeholder="Search by country" type="text" />
                                </InputGroup>
                            </Col>
                        </Row>
                    </div>
                   
                </main>
              
            </>
        )
    }
}

export default Home;