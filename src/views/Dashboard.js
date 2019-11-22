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
             <main className="container-fluid">
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
                    <Card className="shadow">
              <CardBody>
                <TabContent activeTab={"plainTabs" + this.state.plainTabs}>
                  <TabPane tabId="plainTabs1">
                    <p className="description">
                      
                    </p>
                  </TabPane>
                  <TabPane tabId="plainTabs2">
                    <p className="description">
                      
                    </p>
                  </TabPane>
                  <TabPane tabId="plainTabs3">
                    <p className="description">
                      
                    </p>
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