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

import Home from "./views/Home";
import Sdgs from "./views/Sdgs";
import Sdg from "./views/sdgs/sdg";
import Dashboard from "./views/Dashboard";
import CountryProfile from "./views/CountryProfile";
import Agenda2063 from "./views/Agenda2063";
import About from "./views/About";
import Faqs from "./views/Faqs";
import a2063 from "./views/a2063";

function App() {
  return (
    <div className="App">
       <div>
            <Route exact path="/Sdgs" component={Sdgs}></Route>
            <Route exact path="/Sdgs/Sdg_1" component={Sdg}></Route>
            <Route path="/Dashboard" component={Dashboard}></Route>
            <Route path="/CountryProfile" component={CountryProfile}></Route>
            <Route path="/Agenda2063" component={a2063}></Route>
            <Route path="/About" component={About}></Route>
            <Route path="/Faqs" component={Faqs}></Route>
            <Route exact path="/" component={Home}></Route>
        </div>
    </div>
  );
}

export default App;
