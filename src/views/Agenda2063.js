import React from "react";
import Footer from "../components/footer";

import {
    Row, 
    Col,
    Nav,
    NavItem,
    NavLink, 
    Card,
    CardBody,
    TabContent,
    TabPane
} from "reactstrap";
import classnames from "classnames";
var agenda2063Data = require('../assets/data/agenda2063.json');


class Agenda2063 extends React.Component {
    state = {
        plainTabs: 1,
        innerTabs:1
      };
      
      toggleNavs = (e, state, index) => {
        e.preventDefault();
        this.setState({
          [state]: index
        });
      };

    render(){
        return(
            <>
             <main className="container-fluid agenda2063">
            
                 <Row>
                    <Col md="2" className="agenda2063Side">
                        <div className="nav-wrapper">
                            <Nav className="flex-column " id="tabs-icons-text" pills role="tablist">
                                { 
                                    agenda2063Data.map((data, index) =>{
                                    return <NavItem key={index}>
                                                <NavLink aria-selected={this.state.plainTabs === index+1 } 
                                                    className={classnames("mb-sm-3 mb-md-0", { active: this.state.plainTabs === index+1 })}
                                                    onClick={e => this.toggleNavs(e, "plainTabs", index+1)} href="#pablo" role="tab">
                                                    Aspiration {data.agenda} : {data.title}
                                                </NavLink>
                                            </NavItem>
                                    })
                                }
                            </Nav>
                        </div>
                    </Col>
                    <Col md="10">
                     <TabContent activeTab={"plainTabs" + this.state.plainTabs}>
                        { 
                            agenda2063Data.map((data, index) =>{
                                let newID = index + 1
                                let tabId = "plainTabs"+newID
                                let goals = data.goals
                                return <TabPane key={index} tabId={tabId}>
                                            <Row className="agenda2063Header">
                                                <Col md="12">
                                                    <h5 className="display-4 mt-2 mb-2 text-center">
                                                    Aspiration {data.agenda} : {data.title}
                                                    </h5>
                                                    <div className="nav-wrapper">
                                                        <Nav className="nav-fill flex-column flex-md-row" id="tabs-icons-text" pills role="tablist">
                                                            { 
                                                                goals.map((goalData, index) =>{
                                                                return <NavItem key={index}>
                                                                            <NavLink aria-selected={this.state.innerTabs === index+1 } 
                                                                                className={classnames("btn btn-warning goalButtons", { active: this.state.innerTabs === index+1 })}
                                                                                onClick={e => this.toggleNavs(e, "innerTabs", index+1)} href="#pablo" role="tab">
                                                                                Goal {goalData}
                                                                            </NavLink>
                                                                        </NavItem>
                                                                })
                                                            }
                                                        </Nav>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                            <TabContent activeTab={"innerTabs" + this.state.innerTabs}>
                                                { 
                                                    goals.map((goalData, index) =>{
                                                        let newID = index + 1
                                                        let tabId = "innerTabs"+newID
                                                        return <TabPane key={index} tabId={tabId}> 
                                                           <div> {goalData} </div>
                                                        </TabPane>
                                                                
                                                    })
                                                }
                                            </TabContent>
                                            </Row>
                                        </TabPane>
                                        
                                    })
                                    }
                    </TabContent>
                    </Col>
                </Row> 
              
                    {/* <Col md="10">
                        <div className="nav-wrapper">
                            <Nav className="nav-fill flex-column flex-md-row" id="tabs-icons-text" pills role="tablist">
                                <NavItem>
                                    <NavLink
                                        aria-selected={this.state.plainTabs === 1} className={classnames("mb-sm-3 mb-md-0", {
                                        active: this.state.plainTabs === 1 })}
                                        onClick={e => this.toggleNavs(e, "plainTabs", 1)} href="#pablo" role="tab">
                                        Africa
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            </div> 
                    </Col> */}
                 
            </main>
            <Footer></Footer>
            </>
        )
    }
}

export default Agenda2063;