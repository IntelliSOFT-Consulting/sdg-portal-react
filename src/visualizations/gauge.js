import React, { Component } from 'react';
import GaugeChart from 'react-gauge-chart'

class Gauge extends Component {

  render() {
    console.log("Good");
    return (
     <GaugeChart id="barometer"></GaugeChart>
     
    );
  }
}

export default Gauge;