import React from 'react';
import logo from './logo.svg';
import "./assets/vendor/nucleo/css/nucleo.css";
import "./assets/vendor/font-awesome/css/font-awesome.min.css";
import "./assets/scss/argon-design-system-react.scss";
import './App.css';

import Header from "./components/header.js"
import Footer from "./components/footer.js"

function App() {
  return (
    <div className="App">
      <Header></Header>
      <main></main>
      <Footer></Footer>
    </div>
  );
}

export default App;
