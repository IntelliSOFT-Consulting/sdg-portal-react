import React from "react";
import Footer from "../components/footer";

import {
    Nav,
    NavItem,
    NavLink, 
    Card,
    CardBody,
    TabContent,
    TabPane
} from "reactstrap";
import classnames from "classnames";

var data = require('../assets/data/scorecardData.json');

class Dashboard extends React.Component {
  
    state = {
        plainTabs: 1
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
             <main className="container-fluid dashboard">
                <div className="nav-wrapper">
                    <Nav
                        className="nav-fill flex-column flex-md-row"
                        id="tabs-icons-text"
                        pills
                        role="tablist">
                        <NavItem>
                        <NavLink
                            aria-selected={this.state.plainTabs === 1}
                            className={classnames("mb-sm-3 mb-md-0", {
                            active: this.state.plainTabs === 1
                            })}
                            onClick={e => this.toggleNavs(e, "plainTabs", 1)}
                            href="#pablo"
                            role="tab">
                            Africa
                        </NavLink>
                        </NavItem>
                        <NavItem>
                        <NavLink
                            aria-selected={this.state.plainTabs === 2}
                            className={classnames("mb-sm-3 mb-md-0", {
                            active: this.state.plainTabs === 2
                            })}
                            onClick={e => this.toggleNavs(e, "plainTabs", 2)}
                            href="#pablo"
                            role="tab">
                            Central Africa
                        </NavLink>
                        </NavItem>
                        <NavItem>
                        <NavLink
                            aria-selected={this.state.plainTabs === 3}
                            className={classnames("mb-sm-3 mb-md-0", {
                            active: this.state.plainTabs === 3
                            })}
                            onClick={e => this.toggleNavs(e, "plainTabs", 3)}
                            href="#pablo"
                            role="tab">
                            East Africa
                        </NavLink>
                        </NavItem>
                        <NavItem>
                        <NavLink
                            aria-selected={this.state.plainTabs === 4}
                            className={classnames("mb-sm-3 mb-md-0", {
                            active: this.state.plainTabs === 4
                            })}
                            onClick={e => this.toggleNavs(e, "plainTabs", 4)}
                            href="#pablo"
                            role="tab">
                            North Africa
                        </NavLink>
                        </NavItem>
                        <NavItem>
                        <NavLink
                            aria-selected={this.state.plainTabs === 5}
                            className={classnames("mb-sm-3 mb-md-0", {
                            active: this.state.plainTabs === 5
                            })}
                            onClick={e => this.toggleNavs(e, "plainTabs", 5)}
                            href="#pablo"
                            role="tab">
                            Southern Africa
                        </NavLink>
                        </NavItem>
                        <NavItem>
                        <NavLink
                            aria-selected={this.state.plainTabs === 6}
                            className={classnames("mb-sm-3 mb-md-0", {
                            active: this.state.plainTabs === 6
                            })}
                            onClick={e => this.toggleNavs(e, "plainTabs", 6)}
                            href="#pablo"
                            role="tab">
                            West Africa
                        </NavLink>
                        </NavItem>
                    </Nav>
                </div> 
                <Card className="">
                    <CardBody>
                        <TabContent activeTab={"plainTabs" + this.state.plainTabs}>
                          <TabPane tabId="plainTabs1">
                            <table className="">
                              <thead>
                                <tr>
                                    <th className="blank-header"></th>
                                    <th className="sdg-header">NO POVERTY</th>
                                    <th className="sdg-header">ZERO HUNGER</th>
                                    <th className="sdg-header">GOOD HEALTH AND WELL-BEING</th>
                                    <th className="sdg-header">QUALITY EDUCATION</th>
                                    <th className="sdg-header">GENDER EQUALITY</th>
                                    <th className="sdg-header">CLEAN WATER AND SANITATION</th>
                                    <th className="sdg-header">AFFORDABLE AND CLEAN ENERGY</th>
                                    <th className="sdg-header">DECENT WORK AND ECONOMIC GROWTH</th>
                                    <th className="sdg-header">INDUSTRY, INNOVATION AND INFRASTRUCTURE</th>
                                    <th className="sdg-header">REDUCED INEQUALITIES</th>
                                    <th className="sdg-header">SUSTAINABLE CITIES AND COMMUNITIES</th>
                                    <th className="sdg-header">RESPONSIBLE CONSUMPTION AND PROTECTION</th>
                                    <th className="sdg-header">CLIMATE ACTION </th>
                                    <th className="sdg-header">LIFE BELOW WATER</th>
                                    <th className="sdg-header">LIFE ON LAND</th>
                                    <th className="sdg-header">PEACE, JUSTICE AND STRONG INSTITIONS</th>
                                    <th className="sdg-header">PARTNERSHIP FOR THE GOALS</th>
                                </tr>
                              </thead>
                              <tbody>
                                  {
                                    data.map(function(scoreData, index){
                                    return <tr key={index} className={scoreData.region}>
                                              <td className="sdg-data"> {scoreData.country}</td>
                                              <td className = { (scoreData.sdg1 >= 1 && scoreData.sdg1 <= 33 ? 'red' : (scoreData.sdg1 >= 34 && scoreData.sdg1 <= 66 ? 'orange' : (scoreData.sdg1 >= 67 && scoreData.sdg1 <= 100 ? 'green' : 'grey')))}></td>
                                              <td className = { (scoreData.sdg2 >= 1 && scoreData.sdg2 <= 33 ? 'red' : (scoreData.sdg2 >= 34 && scoreData.sdg2 <= 66 ? 'orange' : (scoreData.sdg2 >= 67 && scoreData.sdg2 <= 100 ? 'green' : 'grey')))}></td>
                                              <td className = { (scoreData.sdg3 >= 1 && scoreData.sdg3 <= 33 ? 'red' : (scoreData.sdg3 >= 34 && scoreData.sdg3 <= 66 ? 'orange' : (scoreData.sdg3 >= 67 && scoreData.sdg3 <= 100 ? 'green' : 'grey')))}></td>
                                              <td className = { (scoreData.sdg4 >= 1 && scoreData.sdg4 <= 33 ? 'red' : (scoreData.sdg4 >= 34 && scoreData.sdg4 <= 66 ? 'orange' : (scoreData.sdg4 >= 67 && scoreData.sdg4 <= 100 ? 'green' : 'grey')))}></td>
                                              <td className = { (scoreData.sdg5 >= 1 && scoreData.sdg5 <= 33 ? 'red' : (scoreData.sdg5 >= 34 && scoreData.sdg5 <= 66 ? 'orange' : (scoreData.sdg5 >= 67 && scoreData.sdg5 <= 100 ? 'green' : 'grey')))}></td>
                                              <td className = { (scoreData.sdg6 >= 1 && scoreData.sdg6 <= 33 ? 'red' : (scoreData.sdg6 >= 34 && scoreData.sdg6 <= 66 ? 'orange' : (scoreData.sdg6 >= 67 && scoreData.sdg6 <= 100 ? 'green' : 'grey')))}></td>
                                              <td className = { (scoreData.sdg7 >= 1 && scoreData.sdg7 <= 33 ? 'red' : (scoreData.sdg7 >= 34 && scoreData.sdg7 <= 66 ? 'orange' : (scoreData.sdg7 >= 67 && scoreData.sdg7 <= 100 ? 'green' : 'grey')))}></td>
                                              <td className = { (scoreData.sdg8 >= 1 && scoreData.sdg8 <= 33 ? 'red' : (scoreData.sdg8 >= 34 && scoreData.sdg8 <= 66 ? 'orange' : (scoreData.sdg8 >= 67 && scoreData.sdg8 <= 100 ? 'green' : 'grey')))}></td>
                                              <td className = { (scoreData.sdg9 >= 1 && scoreData.sdg9 <= 33 ? 'red' : (scoreData.sdg9 >= 34 && scoreData.sdg9 <= 66 ? 'orange' : (scoreData.sdg9 >= 67 && scoreData.sdg9 <= 100 ? 'green' : 'grey')))}></td>
                                              <td className = { (scoreData.sdg10 >= 1 && scoreData.sdg10 <= 33 ? 'red' : (scoreData.sdg10 >= 34 && scoreData.sdg10 <= 66 ? 'orange' : (scoreData.sdg10 >= 67 && scoreData.sdg10 <= 100 ? 'green' : 'grey')))}></td>
                                              <td className = { (scoreData.sdg11 >= 1 && scoreData.sdg11 <= 33 ? 'red' : (scoreData.sdg11 >= 34 && scoreData.sdg11 <= 66 ? 'orange' : (scoreData.sdg11 >= 67 && scoreData.sdg11 <= 100 ? 'green' : 'grey')))}></td>
                                              <td className = { (scoreData.sdg12 >= 1 && scoreData.sdg12 <= 33 ? 'red' : (scoreData.sdg12 >= 34 && scoreData.sdg12 <= 66 ? 'orange' : (scoreData.sdg12 >= 67 && scoreData.sdg12 <= 100 ? 'green' : 'grey')))}></td>
                                              <td className = { (scoreData.sdg13 >= 1 && scoreData.sdg13 <= 33 ? 'red' : (scoreData.sdg13 >= 34 && scoreData.sdg13 <= 66 ? 'orange' : (scoreData.sdg13 >= 67 && scoreData.sdg13 <= 100 ? 'green' : 'grey')))}></td>
                                              <td className = { (scoreData.sdg14 >= 1 && scoreData.sdg14 <= 33 ? 'red' : (scoreData.sdg14 >= 34 && scoreData.sdg14 <= 66 ? 'orange' : (scoreData.sdg14 >= 67 && scoreData.sdg14 <= 100 ? 'green' : 'grey')))}></td>
                                              <td className = { (scoreData.sdg15 >= 1 && scoreData.sdg15 <= 33 ? 'red' : (scoreData.sdg15 >= 34 && scoreData.sdg15 <= 66 ? 'orange' : (scoreData.sdg15 >= 67 && scoreData.sdg15 <= 100 ? 'green' : 'grey')))}></td>
                                              <td className = { (scoreData.sdg16 >= 1 && scoreData.sdg16 <= 33 ? 'red' : (scoreData.sdg16 >= 34 && scoreData.sdg16 <= 66 ? 'orange' : (scoreData.sdg16 >= 67 && scoreData.sdg16 <= 100 ? 'green' : 'grey')))}></td>
                                              <td className = { (scoreData.sdg17 >= 1 && scoreData.sdg17 <= 33 ? 'red' : (scoreData.sdg17 >= 34 && scoreData.sdg17 <= 66 ? 'orange' : (scoreData.sdg17 >= 67 && scoreData.sdg17 <= 100 ? 'green' : 'grey')))}></td>
                                          </tr>
                                    })
                                  }
                              </tbody>
                            
                            </table>
                          </TabPane>
                          <TabPane tabId="plainTabs2">
                          <table className="">
                              <thead>
                                <tr>
                                    <th className="blank-header"></th>
                                    <th className="sdg-header">NO POVERTY</th>
                                    <th className="sdg-header">ZERO HUNGER</th>
                                    <th className="sdg-header">GOOD HEALTH AND WELL-BEING</th>
                                    <th className="sdg-header">QUALITY EDUCATION</th>
                                    <th className="sdg-header">GENDER EQUALITY</th>
                                    <th className="sdg-header">CLEAN WATER AND SANITATION</th>
                                    <th className="sdg-header">AFFORDABLE AND CLEAN ENERGY</th>
                                    <th className="sdg-header">DECENT WORK AND ECONOMIC GROWTH</th>
                                    <th className="sdg-header">INDUSTRY, INNOVATION AND INFRASTRUCTURE</th>
                                    <th className="sdg-header">REDUCED INEQUALITIES</th>
                                    <th className="sdg-header">SUSTAINABLE CITIES AND COMMUNITIES</th>
                                    <th className="sdg-header">RESPONSIBLE CONSUMPTION AND PROTECTION</th>
                                    <th className="sdg-header">CLIMATE ACTION </th>
                                    <th className="sdg-header">LIFE BELOW WATER</th>
                                    <th className="sdg-header">LIFE ON LAND</th>
                                    <th className="sdg-header">PEACE, JUSTICE AND STRONG INSTITIONS</th>
                                    <th className="sdg-header">PARTNERSHIP FOR THE GOALS</th>
                                </tr>
                              </thead>
                              <tbody>
                                  {
                                    data.map(function(scoreData, index){
                                      if(scoreData.region === "CAF"){
                                        return <tr key={index} className={scoreData.region}>
                                        <td className="sdg-data"> {scoreData.country}</td>
                                        <td className = { (scoreData.sdg1 >= 1 && scoreData.sdg1 <= 33 ? 'red' : (scoreData.sdg1 >= 34 && scoreData.sdg1 <= 66 ? 'orange' : (scoreData.sdg1 >= 67 && scoreData.sdg1 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg2 >= 1 && scoreData.sdg2 <= 33 ? 'red' : (scoreData.sdg2 >= 34 && scoreData.sdg2 <= 66 ? 'orange' : (scoreData.sdg2 >= 67 && scoreData.sdg2 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg3 >= 1 && scoreData.sdg3 <= 33 ? 'red' : (scoreData.sdg3 >= 34 && scoreData.sdg3 <= 66 ? 'orange' : (scoreData.sdg3 >= 67 && scoreData.sdg3 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg4 >= 1 && scoreData.sdg4 <= 33 ? 'red' : (scoreData.sdg4 >= 34 && scoreData.sdg4 <= 66 ? 'orange' : (scoreData.sdg4 >= 67 && scoreData.sdg4 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg5 >= 1 && scoreData.sdg5 <= 33 ? 'red' : (scoreData.sdg5 >= 34 && scoreData.sdg5 <= 66 ? 'orange' : (scoreData.sdg5 >= 67 && scoreData.sdg5 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg6 >= 1 && scoreData.sdg6 <= 33 ? 'red' : (scoreData.sdg6 >= 34 && scoreData.sdg6 <= 66 ? 'orange' : (scoreData.sdg6 >= 67 && scoreData.sdg6 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg7 >= 1 && scoreData.sdg7 <= 33 ? 'red' : (scoreData.sdg7 >= 34 && scoreData.sdg7 <= 66 ? 'orange' : (scoreData.sdg7 >= 67 && scoreData.sdg7 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg8 >= 1 && scoreData.sdg8 <= 33 ? 'red' : (scoreData.sdg8 >= 34 && scoreData.sdg8 <= 66 ? 'orange' : (scoreData.sdg8 >= 67 && scoreData.sdg8 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg9 >= 1 && scoreData.sdg9 <= 33 ? 'red' : (scoreData.sdg9 >= 34 && scoreData.sdg9 <= 66 ? 'orange' : (scoreData.sdg9 >= 67 && scoreData.sdg9 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg10 >= 1 && scoreData.sdg10 <= 33 ? 'red' : (scoreData.sdg10 >= 34 && scoreData.sdg10 <= 66 ? 'orange' : (scoreData.sdg10 >= 67 && scoreData.sdg10 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg11 >= 1 && scoreData.sdg11 <= 33 ? 'red' : (scoreData.sdg11 >= 34 && scoreData.sdg11 <= 66 ? 'orange' : (scoreData.sdg11 >= 67 && scoreData.sdg11 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg12 >= 1 && scoreData.sdg12 <= 33 ? 'red' : (scoreData.sdg12 >= 34 && scoreData.sdg12 <= 66 ? 'orange' : (scoreData.sdg12 >= 67 && scoreData.sdg12 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg13 >= 1 && scoreData.sdg13 <= 33 ? 'red' : (scoreData.sdg13 >= 34 && scoreData.sdg13 <= 66 ? 'orange' : (scoreData.sdg13 >= 67 && scoreData.sdg13 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg14 >= 1 && scoreData.sdg14 <= 33 ? 'red' : (scoreData.sdg14 >= 34 && scoreData.sdg14 <= 66 ? 'orange' : (scoreData.sdg14 >= 67 && scoreData.sdg14 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg15 >= 1 && scoreData.sdg15 <= 33 ? 'red' : (scoreData.sdg15 >= 34 && scoreData.sdg15 <= 66 ? 'orange' : (scoreData.sdg15 >= 67 && scoreData.sdg15 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg16 >= 1 && scoreData.sdg16 <= 33 ? 'red' : (scoreData.sdg16 >= 34 && scoreData.sdg16 <= 66 ? 'orange' : (scoreData.sdg16 >= 67 && scoreData.sdg16 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg17 >= 1 && scoreData.sdg17 <= 33 ? 'red' : (scoreData.sdg17 >= 34 && scoreData.sdg17 <= 66 ? 'orange' : (scoreData.sdg17 >= 67 && scoreData.sdg17 <= 100 ? 'green' : 'grey')))}></td>
                                    </tr>
                                      }
                                    
                                    })
                                  }
                              </tbody>
                          </table>
                          </TabPane>
                          <TabPane tabId="plainTabs3">
                            <table className="">
                              <thead>
                                <tr>
                                    <th className="blank-header"></th>
                                    <th className="sdg-header">NO POVERTY</th>
                                    <th className="sdg-header">ZERO HUNGER</th>
                                    <th className="sdg-header">GOOD HEALTH AND WELL-BEING</th>
                                    <th className="sdg-header">QUALITY EDUCATION</th>
                                    <th className="sdg-header">GENDER EQUALITY</th>
                                    <th className="sdg-header">CLEAN WATER AND SANITATION</th>
                                    <th className="sdg-header">AFFORDABLE AND CLEAN ENERGY</th>
                                    <th className="sdg-header">DECENT WORK AND ECONOMIC GROWTH</th>
                                    <th className="sdg-header">INDUSTRY, INNOVATION AND INFRASTRUCTURE</th>
                                    <th className="sdg-header">REDUCED INEQUALITIES</th>
                                    <th className="sdg-header">SUSTAINABLE CITIES AND COMMUNITIES</th>
                                    <th className="sdg-header">RESPONSIBLE CONSUMPTION AND PROTECTION</th>
                                    <th className="sdg-header">CLIMATE ACTION </th>
                                    <th className="sdg-header">LIFE BELOW WATER</th>
                                    <th className="sdg-header">LIFE ON LAND</th>
                                    <th className="sdg-header">PEACE, JUSTICE AND STRONG INSTITIONS</th>
                                    <th className="sdg-header">PARTNERSHIP FOR THE GOALS</th>
                                </tr>
                              </thead>
                              <tbody>
                                  {
                                    data.map(function(scoreData, index){
                                      if(scoreData.region === "EAF"){
                                        return <tr key={index} className={scoreData.region}>
                                        <td className="sdg-data"> {scoreData.country}</td>
                                        <td className = { (scoreData.sdg1 >= 1 && scoreData.sdg1 <= 33 ? 'red' : (scoreData.sdg1 >= 34 && scoreData.sdg1 <= 66 ? 'orange' : (scoreData.sdg1 >= 67 && scoreData.sdg1 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg2 >= 1 && scoreData.sdg2 <= 33 ? 'red' : (scoreData.sdg2 >= 34 && scoreData.sdg2 <= 66 ? 'orange' : (scoreData.sdg2 >= 67 && scoreData.sdg2 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg3 >= 1 && scoreData.sdg3 <= 33 ? 'red' : (scoreData.sdg3 >= 34 && scoreData.sdg3 <= 66 ? 'orange' : (scoreData.sdg3 >= 67 && scoreData.sdg3 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg4 >= 1 && scoreData.sdg4 <= 33 ? 'red' : (scoreData.sdg4 >= 34 && scoreData.sdg4 <= 66 ? 'orange' : (scoreData.sdg4 >= 67 && scoreData.sdg4 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg5 >= 1 && scoreData.sdg5 <= 33 ? 'red' : (scoreData.sdg5 >= 34 && scoreData.sdg5 <= 66 ? 'orange' : (scoreData.sdg5 >= 67 && scoreData.sdg5 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg6 >= 1 && scoreData.sdg6 <= 33 ? 'red' : (scoreData.sdg6 >= 34 && scoreData.sdg6 <= 66 ? 'orange' : (scoreData.sdg6 >= 67 && scoreData.sdg6 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg7 >= 1 && scoreData.sdg7 <= 33 ? 'red' : (scoreData.sdg7 >= 34 && scoreData.sdg7 <= 66 ? 'orange' : (scoreData.sdg7 >= 67 && scoreData.sdg7 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg8 >= 1 && scoreData.sdg8 <= 33 ? 'red' : (scoreData.sdg8 >= 34 && scoreData.sdg8 <= 66 ? 'orange' : (scoreData.sdg8 >= 67 && scoreData.sdg8 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg9 >= 1 && scoreData.sdg9 <= 33 ? 'red' : (scoreData.sdg9 >= 34 && scoreData.sdg9 <= 66 ? 'orange' : (scoreData.sdg9 >= 67 && scoreData.sdg9 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg10 >= 1 && scoreData.sdg10 <= 33 ? 'red' : (scoreData.sdg10 >= 34 && scoreData.sdg10 <= 66 ? 'orange' : (scoreData.sdg10 >= 67 && scoreData.sdg10 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg11 >= 1 && scoreData.sdg11 <= 33 ? 'red' : (scoreData.sdg11 >= 34 && scoreData.sdg11 <= 66 ? 'orange' : (scoreData.sdg11 >= 67 && scoreData.sdg11 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg12 >= 1 && scoreData.sdg12 <= 33 ? 'red' : (scoreData.sdg12 >= 34 && scoreData.sdg12 <= 66 ? 'orange' : (scoreData.sdg12 >= 67 && scoreData.sdg12 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg13 >= 1 && scoreData.sdg13 <= 33 ? 'red' : (scoreData.sdg13 >= 34 && scoreData.sdg13 <= 66 ? 'orange' : (scoreData.sdg13 >= 67 && scoreData.sdg13 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg14 >= 1 && scoreData.sdg14 <= 33 ? 'red' : (scoreData.sdg14 >= 34 && scoreData.sdg14 <= 66 ? 'orange' : (scoreData.sdg14 >= 67 && scoreData.sdg14 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg15 >= 1 && scoreData.sdg15 <= 33 ? 'red' : (scoreData.sdg15 >= 34 && scoreData.sdg15 <= 66 ? 'orange' : (scoreData.sdg15 >= 67 && scoreData.sdg15 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg16 >= 1 && scoreData.sdg16 <= 33 ? 'red' : (scoreData.sdg16 >= 34 && scoreData.sdg16 <= 66 ? 'orange' : (scoreData.sdg16 >= 67 && scoreData.sdg16 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg17 >= 1 && scoreData.sdg17 <= 33 ? 'red' : (scoreData.sdg17 >= 34 && scoreData.sdg17 <= 66 ? 'orange' : (scoreData.sdg17 >= 67 && scoreData.sdg17 <= 100 ? 'green' : 'grey')))}></td>
                                    </tr>
                                      }
                                    
                                    })
                                  }
                              </tbody>
                          </table>
                          </TabPane>
                          <TabPane tabId="plainTabs4">
                            <table className="">
                              <thead>
                                <tr>
                                    <th className="blank-header"></th>
                                    <th className="sdg-header">NO POVERTY</th>
                                    <th className="sdg-header">ZERO HUNGER</th>
                                    <th className="sdg-header">GOOD HEALTH AND WELL-BEING</th>
                                    <th className="sdg-header">QUALITY EDUCATION</th>
                                    <th className="sdg-header">GENDER EQUALITY</th>
                                    <th className="sdg-header">CLEAN WATER AND SANITATION</th>
                                    <th className="sdg-header">AFFORDABLE AND CLEAN ENERGY</th>
                                    <th className="sdg-header">DECENT WORK AND ECONOMIC GROWTH</th>
                                    <th className="sdg-header">INDUSTRY, INNOVATION AND INFRASTRUCTURE</th>
                                    <th className="sdg-header">REDUCED INEQUALITIES</th>
                                    <th className="sdg-header">SUSTAINABLE CITIES AND COMMUNITIES</th>
                                    <th className="sdg-header">RESPONSIBLE CONSUMPTION AND PROTECTION</th>
                                    <th className="sdg-header">CLIMATE ACTION </th>
                                    <th className="sdg-header">LIFE BELOW WATER</th>
                                    <th className="sdg-header">LIFE ON LAND</th>
                                    <th className="sdg-header">PEACE, JUSTICE AND STRONG INSTITIONS</th>
                                    <th className="sdg-header">PARTNERSHIP FOR THE GOALS</th>
                                </tr>
                              </thead>
                              <tbody>
                                  {
                                    data.map(function(scoreData, index){
                                      if(scoreData.region === "NAF"){
                                        return <tr key={index} className={scoreData.region}>
                                        <td className="sdg-data"> {scoreData.country}</td>
                                        <td className = { (scoreData.sdg1 >= 1 && scoreData.sdg1 <= 33 ? 'red' : (scoreData.sdg1 >= 34 && scoreData.sdg1 <= 66 ? 'orange' : (scoreData.sdg1 >= 67 && scoreData.sdg1 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg2 >= 1 && scoreData.sdg2 <= 33 ? 'red' : (scoreData.sdg2 >= 34 && scoreData.sdg2 <= 66 ? 'orange' : (scoreData.sdg2 >= 67 && scoreData.sdg2 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg3 >= 1 && scoreData.sdg3 <= 33 ? 'red' : (scoreData.sdg3 >= 34 && scoreData.sdg3 <= 66 ? 'orange' : (scoreData.sdg3 >= 67 && scoreData.sdg3 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg4 >= 1 && scoreData.sdg4 <= 33 ? 'red' : (scoreData.sdg4 >= 34 && scoreData.sdg4 <= 66 ? 'orange' : (scoreData.sdg4 >= 67 && scoreData.sdg4 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg5 >= 1 && scoreData.sdg5 <= 33 ? 'red' : (scoreData.sdg5 >= 34 && scoreData.sdg5 <= 66 ? 'orange' : (scoreData.sdg5 >= 67 && scoreData.sdg5 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg6 >= 1 && scoreData.sdg6 <= 33 ? 'red' : (scoreData.sdg6 >= 34 && scoreData.sdg6 <= 66 ? 'orange' : (scoreData.sdg6 >= 67 && scoreData.sdg6 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg7 >= 1 && scoreData.sdg7 <= 33 ? 'red' : (scoreData.sdg7 >= 34 && scoreData.sdg7 <= 66 ? 'orange' : (scoreData.sdg7 >= 67 && scoreData.sdg7 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg8 >= 1 && scoreData.sdg8 <= 33 ? 'red' : (scoreData.sdg8 >= 34 && scoreData.sdg8 <= 66 ? 'orange' : (scoreData.sdg8 >= 67 && scoreData.sdg8 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg9 >= 1 && scoreData.sdg9 <= 33 ? 'red' : (scoreData.sdg9 >= 34 && scoreData.sdg9 <= 66 ? 'orange' : (scoreData.sdg9 >= 67 && scoreData.sdg9 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg10 >= 1 && scoreData.sdg10 <= 33 ? 'red' : (scoreData.sdg10 >= 34 && scoreData.sdg10 <= 66 ? 'orange' : (scoreData.sdg10 >= 67 && scoreData.sdg10 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg11 >= 1 && scoreData.sdg11 <= 33 ? 'red' : (scoreData.sdg11 >= 34 && scoreData.sdg11 <= 66 ? 'orange' : (scoreData.sdg11 >= 67 && scoreData.sdg11 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg12 >= 1 && scoreData.sdg12 <= 33 ? 'red' : (scoreData.sdg12 >= 34 && scoreData.sdg12 <= 66 ? 'orange' : (scoreData.sdg12 >= 67 && scoreData.sdg12 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg13 >= 1 && scoreData.sdg13 <= 33 ? 'red' : (scoreData.sdg13 >= 34 && scoreData.sdg13 <= 66 ? 'orange' : (scoreData.sdg13 >= 67 && scoreData.sdg13 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg14 >= 1 && scoreData.sdg14 <= 33 ? 'red' : (scoreData.sdg14 >= 34 && scoreData.sdg14 <= 66 ? 'orange' : (scoreData.sdg14 >= 67 && scoreData.sdg14 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg15 >= 1 && scoreData.sdg15 <= 33 ? 'red' : (scoreData.sdg15 >= 34 && scoreData.sdg15 <= 66 ? 'orange' : (scoreData.sdg15 >= 67 && scoreData.sdg15 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg16 >= 1 && scoreData.sdg16 <= 33 ? 'red' : (scoreData.sdg16 >= 34 && scoreData.sdg16 <= 66 ? 'orange' : (scoreData.sdg16 >= 67 && scoreData.sdg16 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg17 >= 1 && scoreData.sdg17 <= 33 ? 'red' : (scoreData.sdg17 >= 34 && scoreData.sdg17 <= 66 ? 'orange' : (scoreData.sdg17 >= 67 && scoreData.sdg17 <= 100 ? 'green' : 'grey')))}></td>
                                    </tr>
                                      }
                                    
                                    })
                                  }
                              </tbody>
                          </table>
                          </TabPane>
                          <TabPane tabId="plainTabs5">
                            <table className="">
                              <thead>
                                <tr>
                                    <th className="blank-header"></th>
                                    <th className="sdg-header">NO POVERTY</th>
                                    <th className="sdg-header">ZERO HUNGER</th>
                                    <th className="sdg-header">GOOD HEALTH AND WELL-BEING</th>
                                    <th className="sdg-header">QUALITY EDUCATION</th>
                                    <th className="sdg-header">GENDER EQUALITY</th>
                                    <th className="sdg-header">CLEAN WATER AND SANITATION</th>
                                    <th className="sdg-header">AFFORDABLE AND CLEAN ENERGY</th>
                                    <th className="sdg-header">DECENT WORK AND ECONOMIC GROWTH</th>
                                    <th className="sdg-header">INDUSTRY, INNOVATION AND INFRASTRUCTURE</th>
                                    <th className="sdg-header">REDUCED INEQUALITIES</th>
                                    <th className="sdg-header">SUSTAINABLE CITIES AND COMMUNITIES</th>
                                    <th className="sdg-header">RESPONSIBLE CONSUMPTION AND PROTECTION</th>
                                    <th className="sdg-header">CLIMATE ACTION </th>
                                    <th className="sdg-header">LIFE BELOW WATER</th>
                                    <th className="sdg-header">LIFE ON LAND</th>
                                    <th className="sdg-header">PEACE, JUSTICE AND STRONG INSTITIONS</th>
                                    <th className="sdg-header">PARTNERSHIP FOR THE GOALS</th>
                                </tr>
                              </thead>
                              <tbody>
                                  {
                                    data.map(function(scoreData, index){
                                      if(scoreData.region === "SAF"){
                                        return <tr key={index} className={scoreData.region}>
                                        <td className="sdg-data"> {scoreData.country}</td>
                                        <td className = { (scoreData.sdg1 >= 1 && scoreData.sdg1 <= 33 ? 'red' : (scoreData.sdg1 >= 34 && scoreData.sdg1 <= 66 ? 'orange' : (scoreData.sdg1 >= 67 && scoreData.sdg1 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg2 >= 1 && scoreData.sdg2 <= 33 ? 'red' : (scoreData.sdg2 >= 34 && scoreData.sdg2 <= 66 ? 'orange' : (scoreData.sdg2 >= 67 && scoreData.sdg2 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg3 >= 1 && scoreData.sdg3 <= 33 ? 'red' : (scoreData.sdg3 >= 34 && scoreData.sdg3 <= 66 ? 'orange' : (scoreData.sdg3 >= 67 && scoreData.sdg3 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg4 >= 1 && scoreData.sdg4 <= 33 ? 'red' : (scoreData.sdg4 >= 34 && scoreData.sdg4 <= 66 ? 'orange' : (scoreData.sdg4 >= 67 && scoreData.sdg4 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg5 >= 1 && scoreData.sdg5 <= 33 ? 'red' : (scoreData.sdg5 >= 34 && scoreData.sdg5 <= 66 ? 'orange' : (scoreData.sdg5 >= 67 && scoreData.sdg5 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg6 >= 1 && scoreData.sdg6 <= 33 ? 'red' : (scoreData.sdg6 >= 34 && scoreData.sdg6 <= 66 ? 'orange' : (scoreData.sdg6 >= 67 && scoreData.sdg6 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg7 >= 1 && scoreData.sdg7 <= 33 ? 'red' : (scoreData.sdg7 >= 34 && scoreData.sdg7 <= 66 ? 'orange' : (scoreData.sdg7 >= 67 && scoreData.sdg7 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg8 >= 1 && scoreData.sdg8 <= 33 ? 'red' : (scoreData.sdg8 >= 34 && scoreData.sdg8 <= 66 ? 'orange' : (scoreData.sdg8 >= 67 && scoreData.sdg8 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg9 >= 1 && scoreData.sdg9 <= 33 ? 'red' : (scoreData.sdg9 >= 34 && scoreData.sdg9 <= 66 ? 'orange' : (scoreData.sdg9 >= 67 && scoreData.sdg9 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg10 >= 1 && scoreData.sdg10 <= 33 ? 'red' : (scoreData.sdg10 >= 34 && scoreData.sdg10 <= 66 ? 'orange' : (scoreData.sdg10 >= 67 && scoreData.sdg10 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg11 >= 1 && scoreData.sdg11 <= 33 ? 'red' : (scoreData.sdg11 >= 34 && scoreData.sdg11 <= 66 ? 'orange' : (scoreData.sdg11 >= 67 && scoreData.sdg11 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg12 >= 1 && scoreData.sdg12 <= 33 ? 'red' : (scoreData.sdg12 >= 34 && scoreData.sdg12 <= 66 ? 'orange' : (scoreData.sdg12 >= 67 && scoreData.sdg12 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg13 >= 1 && scoreData.sdg13 <= 33 ? 'red' : (scoreData.sdg13 >= 34 && scoreData.sdg13 <= 66 ? 'orange' : (scoreData.sdg13 >= 67 && scoreData.sdg13 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg14 >= 1 && scoreData.sdg14 <= 33 ? 'red' : (scoreData.sdg14 >= 34 && scoreData.sdg14 <= 66 ? 'orange' : (scoreData.sdg14 >= 67 && scoreData.sdg14 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg15 >= 1 && scoreData.sdg15 <= 33 ? 'red' : (scoreData.sdg15 >= 34 && scoreData.sdg15 <= 66 ? 'orange' : (scoreData.sdg15 >= 67 && scoreData.sdg15 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg16 >= 1 && scoreData.sdg16 <= 33 ? 'red' : (scoreData.sdg16 >= 34 && scoreData.sdg16 <= 66 ? 'orange' : (scoreData.sdg16 >= 67 && scoreData.sdg16 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg17 >= 1 && scoreData.sdg17 <= 33 ? 'red' : (scoreData.sdg17 >= 34 && scoreData.sdg17 <= 66 ? 'orange' : (scoreData.sdg17 >= 67 && scoreData.sdg17 <= 100 ? 'green' : 'grey')))}></td>
                                    </tr>
                                      }
                                    
                                    })
                                  }
                              </tbody>
                          </table>
                          </TabPane>
                          <TabPane tabId="plainTabs6">
                            <table className="">
                              <thead>
                                <tr>
                                    <th className="blank-header"></th>
                                    <th className="sdg-header">NO POVERTY</th>
                                    <th className="sdg-header">ZERO HUNGER</th>
                                    <th className="sdg-header">GOOD HEALTH AND WELL-BEING</th>
                                    <th className="sdg-header">QUALITY EDUCATION</th>
                                    <th className="sdg-header">GENDER EQUALITY</th>
                                    <th className="sdg-header">CLEAN WATER AND SANITATION</th>
                                    <th className="sdg-header">AFFORDABLE AND CLEAN ENERGY</th>
                                    <th className="sdg-header">DECENT WORK AND ECONOMIC GROWTH</th>
                                    <th className="sdg-header">INDUSTRY, INNOVATION AND INFRASTRUCTURE</th>
                                    <th className="sdg-header">REDUCED INEQUALITIES</th>
                                    <th className="sdg-header">SUSTAINABLE CITIES AND COMMUNITIES</th>
                                    <th className="sdg-header">RESPONSIBLE CONSUMPTION AND PROTECTION</th>
                                    <th className="sdg-header">CLIMATE ACTION </th>
                                    <th className="sdg-header">LIFE BELOW WATER</th>
                                    <th className="sdg-header">LIFE ON LAND</th>
                                    <th className="sdg-header">PEACE, JUSTICE AND STRONG INSTITIONS</th>
                                    <th className="sdg-header">PARTNERSHIP FOR THE GOALS</th>
                                </tr>
                              </thead>
                              <tbody>
                                  {
                                    data.map(function(scoreData, index){
                                      if(scoreData.region === "WAF"){
                                        return <tr key={index} className={scoreData.region}>
                                        <td className="sdg-data"> {scoreData.country}</td>
                                        <td className = { (scoreData.sdg1 >= 1 && scoreData.sdg1 <= 33 ? 'red' : (scoreData.sdg1 >= 34 && scoreData.sdg1 <= 66 ? 'orange' : (scoreData.sdg1 >= 67 && scoreData.sdg1 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg2 >= 1 && scoreData.sdg2 <= 33 ? 'red' : (scoreData.sdg2 >= 34 && scoreData.sdg2 <= 66 ? 'orange' : (scoreData.sdg2 >= 67 && scoreData.sdg2 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg3 >= 1 && scoreData.sdg3 <= 33 ? 'red' : (scoreData.sdg3 >= 34 && scoreData.sdg3 <= 66 ? 'orange' : (scoreData.sdg3 >= 67 && scoreData.sdg3 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg4 >= 1 && scoreData.sdg4 <= 33 ? 'red' : (scoreData.sdg4 >= 34 && scoreData.sdg4 <= 66 ? 'orange' : (scoreData.sdg4 >= 67 && scoreData.sdg4 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg5 >= 1 && scoreData.sdg5 <= 33 ? 'red' : (scoreData.sdg5 >= 34 && scoreData.sdg5 <= 66 ? 'orange' : (scoreData.sdg5 >= 67 && scoreData.sdg5 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg6 >= 1 && scoreData.sdg6 <= 33 ? 'red' : (scoreData.sdg6 >= 34 && scoreData.sdg6 <= 66 ? 'orange' : (scoreData.sdg6 >= 67 && scoreData.sdg6 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg7 >= 1 && scoreData.sdg7 <= 33 ? 'red' : (scoreData.sdg7 >= 34 && scoreData.sdg7 <= 66 ? 'orange' : (scoreData.sdg7 >= 67 && scoreData.sdg7 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg8 >= 1 && scoreData.sdg8 <= 33 ? 'red' : (scoreData.sdg8 >= 34 && scoreData.sdg8 <= 66 ? 'orange' : (scoreData.sdg8 >= 67 && scoreData.sdg8 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg9 >= 1 && scoreData.sdg9 <= 33 ? 'red' : (scoreData.sdg9 >= 34 && scoreData.sdg9 <= 66 ? 'orange' : (scoreData.sdg9 >= 67 && scoreData.sdg9 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg10 >= 1 && scoreData.sdg10 <= 33 ? 'red' : (scoreData.sdg10 >= 34 && scoreData.sdg10 <= 66 ? 'orange' : (scoreData.sdg10 >= 67 && scoreData.sdg10 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg11 >= 1 && scoreData.sdg11 <= 33 ? 'red' : (scoreData.sdg11 >= 34 && scoreData.sdg11 <= 66 ? 'orange' : (scoreData.sdg11 >= 67 && scoreData.sdg11 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg12 >= 1 && scoreData.sdg12 <= 33 ? 'red' : (scoreData.sdg12 >= 34 && scoreData.sdg12 <= 66 ? 'orange' : (scoreData.sdg12 >= 67 && scoreData.sdg12 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg13 >= 1 && scoreData.sdg13 <= 33 ? 'red' : (scoreData.sdg13 >= 34 && scoreData.sdg13 <= 66 ? 'orange' : (scoreData.sdg13 >= 67 && scoreData.sdg13 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg14 >= 1 && scoreData.sdg14 <= 33 ? 'red' : (scoreData.sdg14 >= 34 && scoreData.sdg14 <= 66 ? 'orange' : (scoreData.sdg14 >= 67 && scoreData.sdg14 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg15 >= 1 && scoreData.sdg15 <= 33 ? 'red' : (scoreData.sdg15 >= 34 && scoreData.sdg15 <= 66 ? 'orange' : (scoreData.sdg15 >= 67 && scoreData.sdg15 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg16 >= 1 && scoreData.sdg16 <= 33 ? 'red' : (scoreData.sdg16 >= 34 && scoreData.sdg16 <= 66 ? 'orange' : (scoreData.sdg16 >= 67 && scoreData.sdg16 <= 100 ? 'green' : 'grey')))}></td>
                                        <td className = { (scoreData.sdg17 >= 1 && scoreData.sdg17 <= 33 ? 'red' : (scoreData.sdg17 >= 34 && scoreData.sdg17 <= 66 ? 'orange' : (scoreData.sdg17 >= 67 && scoreData.sdg17 <= 100 ? 'green' : 'grey')))}></td>
                                    </tr>
                                      }
                                    
                                    })
                                  }
                              </tbody>
                          </table>
                          </TabPane>      
                        </TabContent>
                    </CardBody>
                  </Card>
              </main>
            <Footer></Footer>
            </>
        )
    }
}

export default Dashboard;