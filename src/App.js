import React from 'react';
import "./assets/vendor/nucleo/css/nucleo.css";
import "./assets/vendor/font-awesome/css/font-awesome.min.css";
import "./assets/scss/argon-design-system-react.scss";
import './App.css';

import Header from "./components/header.js"
import Footer from "./components/footer.js"

import {
  BrowserRouter as Router, Link, Switch, Route
} from 'react-router-dom';


import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  Nav,
  Row,
  Col
} from "reactstrap";

import Home from "./views/Home";
import Sdgs from "./views/Sdgs";
import Sdg from "./views/sdgs/sdg";
import Dashboard from "./views/Dashboard";
import CountryProfile from "./views/CountryProfile";
import Agenda2063 from "./views/Agenda2063";
import About from "./views/About";
import Faqs from "./views/Faqs";
import a2063 from "./views/a2063";

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faGlobeAfrica, faChartBar, faChartLine } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faGlobeAfrica, faChartBar, faChartLine)

function App() {
  return (
    <Router>
       <Nav className="ml-lg-auto" navbar>
          <NavItem>
              <Link to="/" className="btn btn-header btn-icon text-white">Home</Link>    
          </NavItem>
          <NavItem>
              <Link to="/Sdgs" className="btn btn-header text-white">SDGs</Link>
          </NavItem>
          <NavItem>
              <Link to="/Dashboard" className="btn btn-header text-white">DASHBOARD</Link>
          </NavItem>
          <NavItem>
              <Link to="/CountryProfile" className="btn btn-header text-white">COUNTRY PROFILE</Link>
          </NavItem>
          <NavItem>
              <Link to="/Agenda2063" className="btn btn-header text-white">AGENDA 2063</Link>
          </NavItem>
          <NavItem>
              <Link to="/About" className="btn btn-header text-white">ABOUT US</Link>
          </NavItem>
          <NavItem>
              <Link to="/Faqs" className="btn btn-header text-white">FAQs</Link>
          </NavItem>
      </Nav>
      <Switch>
            <Route exact path="/Sdgs" component={Sdgs}></Route>
            <Route exact path="/Sdgs/Sdg_1" component={Sdg}></Route>
            <Route path="/Dashboard" component={Dashboard}></Route>
            <Route path="/CountryProfile" component={CountryProfile}></Route>
            <Route path="/Agenda2063" component={a2063}></Route>
            <Route path="/About" component={About}></Route>
            <Route path="/Faqs" component={Faqs}></Route>
            <Route exact path="/" component={Home}></Route>
      </Switch>
    </Router>
    
  );
}

export default App;
