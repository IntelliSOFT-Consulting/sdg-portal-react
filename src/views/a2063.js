import React, {useState, useEffect, useCallback} from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Map from "../visualizations/map";
import classnames from "classnames";
import {
    Row, Col, Nav,NavItem, NavLink, Card, TabContent, TabPane, Input, Button
} from "reactstrap";


const agenda2063 = require('../assets/data/agenda2063.json');
//console.log(agenda2063Data)

function A2063(){
    const [activeTab, setActiveTab] = useState('1')
    const [innerTab, setInnerTab] = useState('1')

    const targetClick = (e) =>{
        console.log(e)
        setActiveTab(e.target.value)
    }

    const innerTargetClick = (e) => {
        setInnerTab(e.target.value)
    }


    return (
        <>
            <Header></Header>
            <main className="container-fluid agenda2063">
                <Row>
                    <Col md="2" className="agenda2063Side">
                        <div className="nav-wrapper">
                            <Nav className="flex-column " id="tabs-icons-text" pills role="tablist">
                                { 
                                    agenda2063.map((data, index) =>{
                                    return <NavItem key={index}>
                                                <NavLink key={index}
                                                    className={classnames("mb-sm-3 mb-md-0", { active: activeTab === index+1 })}
                                                    onClick={ () =>setActiveTab(index+1) } href="#!" role="tab">
                                                    Aspiration {data.agenda} : {data.title}
                                                </NavLink>
                                            </NavItem>
                                    })
                                }
                            </Nav>
                        </div>
                    </Col>
                    <Col md="10">
                        <TabContent activeTab={activeTab }>
                        { 
                            agenda2063.map((data, index) =>{
                                let newID = index + 1
                                let tabId = "plainTabs"+newID
                                let goals = []
                                goals = data.goals
                                
                                return <TabPane key={index} tabId={index+1} className={ activeTab === index+1 ? "active" : ""} >
                                    {console.log(activeTab)}
                                            <div className="agenda2063Header">
                                                <Col md="12">
                                                    <h5 className="display-4 mt-2 mb-2 text-center">
                                                    Aspiration {data.agenda} : {data.title}
                                                    </h5>
                                                    <div className="nav-wrapper goalButtons">
                                                        <Nav className="flex-column flex-md-row" id="tabs-icons-text" pills role="tablist">
                                                            { 
                                                                goals.map((goalData, index) =>{
                                                                return <NavItem key={index}>
                                                                            <NavLink aria-selected={index+1 } 
                                                                                className={classnames("btn btn-warning", { active: index+1 })}
                                                                                onClick={innerTargetClick} href="#pablo" role="tab">
                                                                                Goal {goalData.number}
                                                                            </NavLink>
                                                                        </NavItem>
                                                                })
                                                            }
                                                        </Nav>
                                                    </div>
                                                </Col>
                                            </div>
                                         
                                            <TabContent activeTab={"innerTabs"}>
                                                { 
                                                    goals.map((goalData, index) =>{
                                                        //console.log(goalData.indicators);
                                                        let indicators = goalData.indicators;
                                                        let newID = index + 1
                                                        let tabId = "innerTabs"+newID
                                                        return <TabPane key={index} tabId={tabId} className={activeTab}> 
                                                                    <Card>
                                                                        <Row className="selectButtons mt-2 mb-2">
                                                                            <Col md="3">
                                                                                <Input type="select" name="indicatorSelect" id="indicatorSelect" className="btn btn-primary">
                                                                                   { indicators.map((indicator, index) => {
                                                                                        return <option key={index}>{indicator}</option>
                                                                                    })
                                                                                }
                                                                                </Input>
                                                                            </Col>
                                                                            <Col md="6">
                                                                                <Button color="primary" type="button">Global Database</Button>
                                                                                <Button color="primary" type="button">PanAfrican MRS</Button>
                                                                            </Col>
                                                                            <Col md="3">
                                                                            <Input type="select" name="yearSelect" id="yearSelect" className="btn btn-primary"> 
                                                                                    <option>2019</option>
                                                                                    <option>2018</option>
                                                                                    <option>2017</option>
                                                                                </Input>
                                                                            </Col>
                                                                        </Row>
                                                                        {/* <Map></Map> */}

                                                                    </Card>
                                                                </TabPane>
                                                    })
                                                }
                                            </TabContent>
                                           
                                        </TabPane>    
                                    })
                                    }
                        </TabContent>
                    </Col>
                </Row> 
            </main>
            <Footer></Footer>
        </>
    )


}

export default A2063;