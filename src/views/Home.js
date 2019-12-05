import React from "react";
import Header from "../components/homeHeader";
import Footer from "../components/footer";
import { BrowserRouter, Link} from 'react-router-dom'
import { Container, Col, Row } from "reactstrap";


class Home extends React.Component {
    render(){
        return(
            <>
            <Header></Header>
                <main className="home">
                   <Container className="homeText">
                       <h2 className="display-2 text-white">
                       Africa SDG Watch is a public platform to visualize and explore data, benchmark progress towards the 
                       SDGs and track performance of development indicators.
                       </h2>
                    </Container> 
                    <Row>
                        <Col></Col>
                        <Col>
                            <Link to="/Sdgs/Sdg_1" className="btn btn-warning text-white">Explore Development Data</Link>
                        </Col>
                        <Col>
                            
                        </Col>
                    </Row>
                </main>
              
            </>
        )
    }
}

export default Home;