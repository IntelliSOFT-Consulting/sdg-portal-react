import React, {useEffect, useState} from "react";
/* Imports */
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);


function Radar( {radarData} ){
    useEffect(() => {
        let chart = am4core.create("chartdiv", am4charts.RadarChart);
            chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

            chart.data = radarData;

            // chart.data = [
            // {
            //     category: "One",
            //     value1: 8,
            // },
            // {
            //     category: "Two",
            //     value1: 11,
            // },
            // {
            //     category: "Three",
            //     value1: 7,
            // },
            // {
            //     category: "Four",
            //     value1: 13,
            // },
            // {
            //     category: "Five",
            //     value1: 12,
            // },
            // {
            //     category: "Six",
            //     value1: 15,
            // },
            // {
            //     category: "Seven",
            //     value1: 9,
            // },
            // {
            //     category: "Eight",
            //     value1: 6,
            // }
            // ];

            chart.padding(20, 20, 20, 20);

            let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "category";
            categoryAxis.renderer.labels.template.location = 0.5;
            categoryAxis.renderer.tooltipLocation = 0.5;

            let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.tooltip.disabled = true;
            valueAxis.renderer.labels.template.horizontalCenter = "left";
            valueAxis.min = 0;

            let series1 = chart.series.push(new am4charts.RadarColumnSeries());
            series1.columns.template.tooltipText = "{name}: {valueY.value}";
            series1.columns.template.width = am4core.percent(80);
            series1.name = "Series 1";
            series1.dataFields.categoryX = "category";
            series1.dataFields.valueY = "value1";
            series1.stacked = true;

            chart.seriesContainer.zIndex = -1;

            chart.cursor = new am4charts.RadarCursor();
            chart.cursor.xAxis = categoryAxis;
            chart.cursor.fullWidthXLine = true;
            chart.cursor.lineX.strokeOpacity = 0;
            chart.cursor.lineX.fillOpacity = 0.1;
            chart.cursor.lineX.fill = am4core.color("#000000");

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

export default Radar;