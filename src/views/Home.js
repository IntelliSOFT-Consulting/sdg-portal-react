import React from "react";
import Header from "../components/homeHeader";
import Footer from "../components/footer";
import { BrowserRouter, Link} from 'react-router-dom'
import { Container, Col, Row, Input, InputGroupAddon, InputGroupText, InputGroup} from "reactstrap";
import Select from 'react-select';


class Home extends React.Component {
    
    render(){
        const countriesJson = require('../assets/data/trial.json');
        const countries = countriesJson.map(country => ({ label: country.name, value: country.value }))


        const scaryAnimals = [
            { label: "Alligators", value: 1 },
            { label: "Crocodiles", value: 2 },
            { label: "Sharks", value: 3 },
            { label: "Small crocodiles", value: 4 },
            { label: "Smallest crocodiles", value: 5 },
            { label: "Snakes", value: 6 },
          ];  

        return(
            <>
            <Header></Header>
                <main className="home">
                    <div className="homeOverLay">
                   
                    </div>
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
                                {/* <InputGroup className="mb-4">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                        <i className="ni ni-zoom-split-in" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                     
                                </InputGroup> */}
                                <Select options={countries} placeholder="Search by country"/>
                            </Col>
                        </Row>
                    
                   
                </main>
              
            </>
        )
    }
}

export default Home;