import React from 'react';
import "./assets/vendor/nucleo/css/nucleo.css";
import "./assets/vendor/font-awesome/css/font-awesome.min.css";
import "./assets/scss/argon-design-system-react.scss";
import './App.css';

import {
  BrowserRouter as Router, Switch, Route
} from 'react-router-dom';

import Home from "./views/Home";
import Sdgs from "./views/Sdgs";
import Sdgs1 from "./views/Sdgs1";
import Sdg from "./views/sdgs/sdg";
import SdgIndex from "./views/SdgIndex";
import Dashboard from "./views/Dashboard";
import CountryProfile from "./views/CountryProfile";
import Agenda2063 from "./views/Agenda2063";
import a2063 from "./views/a2063";
import Agenda2063Landing from './views/a2063/Landing';
import About from "./views/About";
import Faqs from "./views/Faqs";


import { library } from '@fortawesome/fontawesome-svg-core'
import { fab, faYoutube, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faGlobeAfrica, faChartBar, faChartLine, faCircle, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'


library.add(fab, faGlobeAfrica, faChartBar, faChartLine, faCircle, faFacebook, faYoutube, faTwitter, faCaretUp, faCaretDown)

function App() {

  console.log()
  
  return (

    
    <Router basename={'/sdgportal'}>
      <Switch>
            {/* <Route exact path="/Sdgs" component={Sdgs}></Route> */}
            <Route exact path="/Sdgs" component={Sdgs1}></Route>
            <Route exact path="/Sdgs/Sdg_1" component={Sdg}></Route>
            <Route exact path="/Sdgs/Index" component={SdgIndex}></Route>
            <Route path="/Dashboard" component={Dashboard}></Route>
            <Route path="/CountryProfile" component={CountryProfile}></Route>
            <Route exact path="/Agenda2063" component={Agenda2063Landing}></Route>
            <Route exact path="/Agenda2063/Landing" component={a2063}></Route>
            <Route path="/About" component={About}></Route>
            <Route path="/Faqs" component={Faqs}></Route>
            <Route exact path="/" component={Home}></Route>
            
      </Switch>
    </Router>
  );
}

export default App;
