import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {
    BrowserRouter as Router, 
    Link,
    Switch,
    Route
} from 'react-router-dom'

import Header from "./components/header"

import Home from "./views/Home";
import Sdgs from "./views/Sdgs";
import Dashboard from "./views/Dashboard";
import CountryProfile from "./views/CountryProfile";
import Agenda2063 from "./views/Agenda2063";
import About from "./views/About";
import Faqs from "./views/Faqs";

const routing = (
    <Router>
        <Header></Header>
        <div>
            <Route path="/Sdgs" component={Sdgs}></Route>
            <Route path="/Dashboard" component={Dashboard}></Route>
            <Route path="/CountryProfile" component={CountryProfile}></Route>
            <Route path="/Agenda2063" component={Agenda2063}></Route>
            <Route path="/About" component={About}></Route>
            <Route path="/Faqs" component={Faqs}></Route>
            <Route exact path="/" component={Home}></Route>
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
