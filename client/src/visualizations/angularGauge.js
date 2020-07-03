/* Imports */
import React, { useEffect } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

/* Chart code */
// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end


function Gauge( {barometerData, country, sdg}) {
    useEffect(() => {
        // create chart
        let chart = am4core.create("chartdiv", am4charts.GaugeChart);
        chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect
        chart.creditsPosition = "bottom-right";

        chart.innerRadius = am4core.percent(75);
        chart.logo.disabled=true;

        let axis = chart.xAxes.push(new am4charts.ValueAxis());
        axis.min = 0;
        axis.max = 100;
        axis.strictMinMax = true;
        axis.renderer.radius = am4core.percent(73);
        axis.renderer.inside = true;
        axis.renderer.line.strokeOpacity = 1;
        axis.renderer.ticks.template.disabled = false
        axis.renderer.ticks.template.strokeOpacity = 1;
        axis.renderer.ticks.template.length = 10;
        axis.renderer.grid.template.disabled = true;
        axis.renderer.labels.template.radius = 40;
        axis.renderer.labels.template.fontSize = "0.9em";
        axis.renderer.labels.template.disabled = true;
        axis.renderer.ticks.template.disabled = true;
        
        
        let axis2 = chart.xAxes.push(new am4charts.ValueAxis());
        axis2.min = 0;
        axis2.max = 100;
        axis2.strictMinMax = true;
        axis2.renderer.labels.template.disabled = true;
        axis2.renderer.ticks.template.disabled = true;
        axis2.renderer.grid.template.disabled = true;
        axis2.renderer.labels.template.bent = true;
       

        // Add ranges
        let range = axis2.axisRanges.create();
        range.value = 0;
        range.endValue = 25;
        range.axisFill.fillOpacity = 1;
        range.axisFill.fill = am4core.color("#ff3232");
        

        let range2 = axis2.axisRanges.create();
        range2.value = 25;
        range2.endValue = 50;
        range2.axisFill.fillOpacity = 1;
        range2.axisFill.fill = am4core.color("#ffb632");

        let range3 = axis2.axisRanges.create();
        range3.value = 50;
        range3.endValue = 75;
        range3.axisFill.fillOpacity = 1;
        range3.axisFill.fill = am4core.color("#f3d632");

        let range4 = axis2.axisRanges.create();
        range4.value = 75;
        range4.endValue = 100;
        range4.axisFill.fillOpacity = 1;
        range4.axisFill.fill = am4core.color("#32a332");

        function createGrid(value) {
            let range = axis.axisRanges.create();
            range.value = value;
            range.label.text = "{value}";
        }
      
        createGrid(0);
        createGrid(25);
        createGrid(50);
        createGrid(75);
        createGrid(100);

        let hand = chart.hands.push(new am4charts.ClockHand());
        hand.axis = axis2;
        hand.innerRadius = am4core.percent(20);
        hand.startWidth = 10;
        hand.pin.disabled = true;
        hand.value = 50;
        hand.innerRadius = am4core.percent(20);

        let label = chart.radarContainer.createChild(am4core.Label);
        label.isMeasured = false;
        label.fontSize = 20;
        label.x = am4core.percent(50);
        label.y = am4core.percent(100);
        label.horizontalCenter = "middle";
        label.verticalCenter = "bottom";

        hand.events.on("propertychanged", function(ev) {
            label.text = axis2.positionToValue(hand.currentPosition).toFixed(1) + "%";
            axis2.invalidate();
          });
         
        barometerData.forEach(function(countryBarometerData){
            if(countryBarometerData.id === country ){
              let score = 0;
              let sdgCode = ''
              if(parseInt(sdg) === 18){
                score = countryBarometerData.Score;
              }else{
                  sdgCode = 'goal' + sdg;
                  score = countryBarometerData[sdgCode]
              }
              
              // Animate
                let value = parseFloat(score);
                label.text = Math.round(score *100)/100 + "%";
                let animation = new am4core.Animation(hand, {
                  property: "value",
                  to: value
                }, 1000, am4core.ease.cubicOut).start();
              
            }
          })

        return function cleanUp(){
            chart.dispose();
        }
}, [sdg, country])

  return (
    <>
    <div id="chartdiv" style={{ width: "100%", height: "300px" }}></div>
    </>
  )

}

export default Gauge;
