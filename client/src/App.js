import React from 'react';
import "./assets/vendor/nucleo/css/nucleo.css";
import "./assets/vendor/font-awesome/css/font-awesome.min.css";
import "./assets/css/argon-design-system-react.css";
import './App.css';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from "./views/Home";
import Sdgs1 from "./views/Sdgs1";
import SdgIndex from "./views/SdgIndex";
import Dashboard from "./views/Dashboard";
import CountryProfile from "./views/CountryProfile";
import a2063 from "./views/a2063";
import Agenda2063Landing from './views/a2063/Landing';
import About from "./views/About";
import Faqs from "./views/Faqs";
import DataUpload from "./views/DataUpload";
import Login from './views/Login';

import history from './history';
import withAuth from './views/withAuth';


import { library } from '@fortawesome/fontawesome-svg-core'
import { fab, faYoutube, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faGlobeAfrica, faChartBar, faChartLine, faCircle, faCaretDown, faCaretUp, faFolder, faFile, faFileCsv, faSpinner, faCloudDownloadAlt, faEnvelope, faLock, faUserCircle } from '@fortawesome/free-solid-svg-icons'


library.add(fab, faGlobeAfrica, faChartBar, faChartLine, faCircle, faFacebook, faYoutube, faTwitter, faCaretUp, faCaretDown, faFolder, faFile, faFileCsv, faSpinner, faCloudDownloadAlt, faEnvelope, faLock, faUserCircle)

function App() {  
  return ( 
    <Router  basename="/sdgportalreact" history={history} >
      <Switch>
            <Route exact path="/SdgLanding" component={SdgIndex}></Route>
            <Route exact path="/Sdgs" component={Sdgs1}></Route>

            <Route path="/Dashboard" component={Dashboard}></Route>
            <Route path="/CountryProfile" component={CountryProfile}></Route>

            <Route exact path="/A2063Landing" component={Agenda2063Landing}></Route>
            <Route exact path="/Agenda2063" component={a2063}></Route>
           
            <Route path="/About" component={About}></Route>
            <Route path="/Faqs" component={Faqs}></Route>
            <Route path="/Login" component={Login}></Route>
            <Route path="/DataUpload" component={withAuth(DataUpload)}></Route>
            <Route exact path="/" component={Home}></Route>
      </Switch>
    </Router>
  );
}

export default App;
