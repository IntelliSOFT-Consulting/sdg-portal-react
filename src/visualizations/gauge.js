import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class Gauge extends Component {

  componentDidMount() {
        let gaugeData = require('../assets/data/1BarometerChartData.json');
        let sdgID = 1;

        let chart = am4core.create("chartdiv", am4charts.GaugeChart);
        chart.innerRadius = am4core.percent(82);

        let axis = chart.xAxes.push(new am4charts.ValueAxis());
        axis.min = 0;
        axis.max = 4;
        axis.strictMinMax = true;
        axis.renderer.radius = am4core.percent(70);
        axis.renderer.inside = true;
        axis.renderer.line.strokeOpacity = 1;
        axis.renderer.ticks.template.strokeOpacity = 1;
        axis.renderer.ticks.template.length = 10;
        axis.renderer.labels.template.disabled = true;
        axis.renderer.ticks.template.disabled = true;
        axis.renderer.grid.template.disabled = true;
        axis.renderer.labels.template.radius = 40;
        /**
         * Axis for ranges
         */
        let axis2 = chart.xAxes.push(new am4charts.ValueAxis());
        axis2.min = 0;
        axis2.max = 4;
        axis2.renderer.innerRadius = 15
        axis2.strictMinMax = true;
        axis2.renderer.labels.template.disabled = true;
        axis2.renderer.ticks.template.disabled = true;
        axis2.renderer.grid.template.disabled = true;

        // Add ranges
        let range = axis2.axisRanges.create();
        range.value = 0;
        range.endValue = 1;
        range.axisFill.fillOpacity = 1;
        range.axisFill.fill = am4core.color("#ff3232");

        let range2 = axis2.axisRanges.create();
        range2.value = 1;
        range2.endValue = 2;
        range2.axisFill.fillOpacity = 1;
        range2.axisFill.fill = am4core.color("#ffb632");

        let range3 = axis2.axisRanges.create();
        range3.value = 2;
        range3.endValue = 3;
        range3.axisFill.fillOpacity = 1;
        range3.axisFill.fill = am4core.color("#f3d632");

        let range4 = axis2.axisRanges.create();
        range4.value = 3;
        range4.endValue = 4;
        range4.axisFill.fillOpacity = 1;
        range4.axisFill.fill = am4core.color("#32a332");

        // Add hand
        let hand = chart.hands.push(new am4charts.ClockHand());
        hand.startWidth = 10;
        hand.radius = am4core.percent(95);
        hand.innerRadius = am4core.percent(20);
        hand.pin.disabled = true;
        hand.value = 0;

        let label = chart.radarContainer.createChild(am4core.Label);
        label.isMeasured = false;
        label.fontSize = 20;
        label.x = am4core.percent(50);
        label.y = am4core.percent(100);
        label.horizontalCenter = "middle";
        label.verticalCenter = "bottom";
        label.text = "0";
       

        for(let key in gaugeData){
          let newKey = parseInt(key, 10);
          if ((newKey+1) === sdgID) {
            let score = gaugeData[key].score;
            // Animate
            setInterval(() => {
              let value = score;
              label.text = value;
              let animation = new am4core.Animation(hand, {
                property: "value",
                to: value
              }, 1000, am4core.ease.cubicOut).start();
            }, 2000);
          }
        }

        function createGrid(value) {
          let range = axis.axisRanges.create();
          range.value = value;
          range.label.text = "{value}";
        }

        createGrid(0);
        createGrid(1);
        createGrid(2);
        createGrid(3);
        createGrid(4);

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