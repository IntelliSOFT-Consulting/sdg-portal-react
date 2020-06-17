import React, { useEffect } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

function Demographics ( {demographicsData} ){
  

  useEffect(() => {
        // let demographicData = require('../assets/data/1DemographicsChartData.json');
        let mainContainer = am4core.create("chartdiv2", am4core.Container);
        mainContainer.width = am4core.percent(100);
        mainContainer.height = am4core.percent(100);
        mainContainer.layout = "horizontal";

        mainContainer.logo.disabled=true;

      // chart.creditsPosition = "top-right";

        //Male chart
        let maleChart = mainContainer.createChild(am4charts.XYChart);
        maleChart.paddingRight = 0;
        maleChart.data = JSON.parse(JSON.stringify(demographicsData));

        // Create axes
        let maleCategoryAxis = maleChart.yAxes.push(new am4charts.CategoryAxis());
        maleCategoryAxis.dataFields.category = "age";
        maleCategoryAxis.renderer.grid.template.location = 0;
        maleCategoryAxis.renderer.inversed = true;
        maleCategoryAxis.renderer.minGridDistance = 15;
        maleCategoryAxis.fontSize = 11;
        

        let maleValueAxis = maleChart.xAxes.push(new am4charts.ValueAxis());
        maleValueAxis.renderer.inversed = true;
        // maleValueAxis.min = 0;
        // maleValueAxis.max = 10000;
        // maleValueAxis.strictMinMax = true;
        maleValueAxis.fontSize = 11;
        maleValueAxis.numberFormatter = new am4core.NumberFormatter();

        maleValueAxis.name = "Male";

        // Create series
        let maleSeries = maleChart.series.push(new am4charts.ColumnSeries());
        maleSeries.dataFields.valueX = "male";

        maleSeries.calculatePercent = true;
        maleSeries.dataFields.categoryY = "age";
        maleSeries.interpolationDuration = 1000;
        maleSeries.columns.template.tooltipText = "Males, age {categoryY}: {valueX} ({valueX.percent.formatNumber('#.0')}%)";
        //maleSeries.sequencedInterpolation = true;
        maleSeries.fill = am4core.color("#2097d4");  

        let maleRange = maleValueAxis.axisRanges.create();
        // maleRange.value = 0;
        // maleRange.endValue = 10000;
        maleRange.label.text = "Male";
        maleRange.label.dy = 20;

        let femaleChart = mainContainer.createChild(am4charts.XYChart);
        femaleChart.paddingLeft = 0;
        femaleChart.data = JSON.parse(JSON.stringify(demographicsData));

        // Create axes
        let femaleCategoryAxis = femaleChart.yAxes.push(new am4charts.CategoryAxis());
        femaleCategoryAxis.renderer.opposite = true;
        femaleCategoryAxis.dataFields.category = "age";
        femaleCategoryAxis.renderer.grid.template.location = 0;
        femaleCategoryAxis.renderer.minGridDistance = 15;
        femaleCategoryAxis.fontSize = 11;
        femaleCategoryAxis.renderer.inversed = true;

        let femaleValueAxis = femaleChart.xAxes.push(new am4charts.ValueAxis());
        // femaleValueAxis.min = 0;
        // femaleValueAxis.max = 10000;
        // femaleValueAxis.strictMinMax = true;
        femaleValueAxis.numberFormatter = new am4core.NumberFormatter();
        femaleValueAxis.renderer.minLabelPosition = 0.01;
        femaleValueAxis.fontSize = 11;

        // Create series
        let femaleSeries = femaleChart.series.push(new am4charts.ColumnSeries());
        femaleSeries.dataFields.valueX = "female";
    
        femaleSeries.calculatePercent = true;
        femaleSeries.fill = am4core.color("#df4767");   
        femaleSeries.stroke = femaleSeries.fill;
        //femaleSeries.sequencedInterpolation = true;
        femaleSeries.columns.template.tooltipText = "Females, age {categoryY}: {valueX} ({valueX.percent.formatNumber('#.0')}%)";
        femaleSeries.dataFields.categoryY = "age";
        femaleSeries.interpolationDuration = 1000;
        

        let femaleRange = femaleValueAxis.axisRanges.create();
        // femaleRange.value = 0;
        // femaleRange.endValue = 10000;
        femaleRange.label.text = "Female";
        femaleRange.label.dy = 20;


        let label = mainContainer.createChild(am4core.Label);
        label.isMeasured = false;
        label.x = am4core.percent(80);
        label.horizontalCenter = "middle";
        label.y = 50;
        label.showOnInit = false;
        label.text = "  ";
        label.hiddenState.properties.dy = -100;
        label.fontSize = 10;
    }, [demographicsData])

        return (
          <div>
 <div id="chartdiv2" style={{ width: "100%", height: "400px" }}></div>
        
            {/* { demographicsData.map(function(d, index){
                return <p> {d.age} </p>
            })
            } */}
         
          </div>
         
        );
      
}

export default Demographics;