import React, {useEffect } from "react";
/* Imports */
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);


function Radar2(  ){
    useEffect(() => {
        var chart = am4core.create("chartdiv", am4charts.RadarChart);

        /* Add data */
        chart.data = [{
        "country": "Lithuania",
        "litres": 501,
        "units": 250
        }, {
        "country": "Czech Republic",
        "litres": 301,
        "units": 222
        }, {
        "country": "Ireland",
        "litres": 266,
        "units": 179
        }, {
        "country": "Germany",
        "litres": 165,
        "units": 298
        }, {
        "country": "Australia",
        "litres": 139,
        "units": 299
        }, {
        "country": "Austria",
        "litres": 336,
        "units": 185
        }, {
        "country": "UK",
        "litres": 290,
        "units": 150
        }, {
        "country": "Belgium",
        "litres": 325,
        "units": 382
        }, {
        "country": "The Netherlands",
        "litres": 40,
        "units": 172
        }];

        /* Create axes */
        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "country";

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

        /* Create and configure series */
        var series = chart.series.push(new am4charts.RadarSeries());
        series.dataFields.valueY = "litres";
        series.dataFields.categoryX = "country";
        series.name = "Sales";
        series.strokeWidth = 3;
        series.zIndex = 2;
        series.sequencedInterpolation = true;
        series.sequencedInterpolationDelay = 100;

        var series2 = chart.series.push(new am4charts.RadarColumnSeries());
        series2.dataFields.valueY = "units";
        series2.dataFields.categoryX = "country";
        series2.name = "Units";
        series2.strokeWidth = 0;
        series2.columns.template.tooltipText = "Series: {name}\nCategory: {categoryX}\nValue: {valueY}";
        series2.sequencedInterpolation = true;
        series2.sequencedInterpolationDelay = 100;

        /* Add legend */
        chart.legend = new am4charts.Legend();

        /* Add cursor */
        chart.cursor = new am4charts.RadarCursor();


            return function cleanUp(){
                chart.dispose();
              }
         })


    return(
        <>
         <div id="chartdiv" style={{ width: "100%", height: "400px" }}></div>
        </>
    )
}

export default Radar2;