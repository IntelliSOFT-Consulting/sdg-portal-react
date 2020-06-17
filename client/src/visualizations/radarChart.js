import React, {useEffect } from "react";
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
            chart.padding(10, 10, 10, 10);
            chart.fontSize = 12;

            let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "category";
            categoryAxis.renderer.labels.template.location = 0.5;
            categoryAxis.renderer.tooltipLocation = 0.5;
            categoryAxis.renderer.grid.template.disabled = true;
            categoryAxis.tooltip.disabled = true;

            let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.tooltip.disabled = true;
            valueAxis.renderer.labels.template.horizontalCenter = "left";
            valueAxis.min = 0;

            let series1 = chart.series.push(new am4charts.RadarColumnSeries());
            series1.columns.template.tooltipText = "{name} {category} : {valueY.value}";
            series1.columns.template.width = am4core.percent(80);
            series1.name = "Goal";
            series1.dataFields.categoryX = "category";
            series1.dataFields.valueY = "value1";
            series1.stacked = true;
            series1.columns.template.tooltipY = 0;
            series1.columns.template.strokeOpacity = 0;

            chart.colors.list = [
                am4core.color("#E5243B"),
                am4core.color("#DDA63A"),
                am4core.color("#4C9F38"),
                am4core.color("#C5192D"),
                am4core.color("#FF3A21"),
                am4core.color("#26BDE2"),
                am4core.color("#FCC30B"),
                am4core.color("#A21942"),
                am4core.color("#FD6925"),
                am4core.color("#DD1367"),
                am4core.color("#FD9D24"),
                am4core.color("#BF8B2E"),
                am4core.color("#3F7E44"),
                am4core.color("#0A97D9"),
                am4core.color("#56C02B"),
                am4core.color("#00689D"),
                am4core.color("#19486A")

              ];

            // series1.columns.template.events.once("inited", function(event){
            //     event.target.fill = chart.colors.getIndex(event.target.dataItem.index);
            //   });
            
            series1.columns.template.adapter.add("fill", function(fill, target) {
              return chart.colors.getIndex(target.dataItem.index);
            });

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