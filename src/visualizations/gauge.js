import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class Gauge extends Component {
  componentDidMount() {
    let gaugeData = require('../assets/data/1BarometerChartData.json');
    let chart = am4core.create("chartdiv", am4charts.GaugeChart);
    // Create axis
    let axis = chart.xAxes.push(new am4charts.ValueAxis()); 
    axis.min = 0;
    axis.max = 4;
    axis.strictMinMax = true;
    axis.renderer.labels.template.radius = 85;
    axis.renderer.inside = true;
    axis.valueInterval = 1;

    // Set inner radius
    chart.innerRadius = -50;

    // Add ranges
    let range = axis.axisRanges.create();
    range.value = 0;
    range.endValue = 1;
    range.axisFill.fillOpacity = 1;
    range.axisFill.fill = am4core.color("#ff3232");


    let range2 = axis.axisRanges.create();
    range2.value = 1;
    range2.endValue = 2;
    range2.axisFill.fillOpacity = 1;
    range2.axisFill.fill = am4core.color("#ffb632");

    let range3 = axis.axisRanges.create();
    range3.value = 2;
    range3.endValue = 3;
    range3.axisFill.fillOpacity = 1;
    range3.axisFill.fill = am4core.color("#f3d632");

    let range4 = axis.axisRanges.create();
    range4.value = 3;
    range4.endValue = 4;
    range4.axisFill.fillOpacity = 1;
    range4.axisFill.fill = am4core.color("#32a332");

    // Add hand
    let hand = chart.hands.push(new am4charts.ClockHand());
    hand.value = 2;
    hand.startWidth = 10;
    // hand.pin.disabled = true;
    // hand.fill = am4core.color("#2D93AD");
    // hand.stroke = am4core.color("#2D93AD");
    // hand.innerRadius = am4core.percent(50);
    hand.radius = am4core.percent(65);
    // hand.startWidth = 15;

    // Animate
    // setInterval(function() {
    //   hand.showValue(Math.random() * 4, 1000, am4core.ease.cubicOut);
    // }, 2000);

  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return (
      <div id="chartdiv" style={{ width: "100%", height: "300px" }}></div>
    );
  }
}

export default Gauge;