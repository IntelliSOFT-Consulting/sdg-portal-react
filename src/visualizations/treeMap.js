import React, {useEffect} from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);


function TreeMap( {treeMapData} ){


    useEffect(() => {
        let chart = am4core.create("chartdiv", am4charts.TreeMap);
        chart.hiddenState.properties.opacity = 0;

        chart.data = treeMapData;

        chart.colors.step = 2;

        // define data fields
        chart.dataFields.value = "achievement";
        chart.dataFields.name = "title";
        chart.dataFields.color = "color";

        chart.zoomable = false;

        var level0SeriesTemplate = chart.seriesTemplates.create("0");
        var level0ColumnTemplate = level0SeriesTemplate.columns.template;

        level0ColumnTemplate.column.cornerRadius(0, 0, 0, 0);
        level0ColumnTemplate.fillOpacity = 1;
        level0ColumnTemplate.strokeWidth = 1;
        level0ColumnTemplate.strokeOpacity = 1;

        let bullet1 = level0SeriesTemplate.bullets.push(new am4charts.LabelBullet());
        bullet1.locationY = 0.5;
        bullet1.locationX = 0.5;
        bullet1.label.text = "{name}";
        bullet1.label.fill = am4core.color("#fff");
        bullet1.label.fontSize = "10px"

        level0ColumnTemplate.tooltipText = "{name}: {value}%"
        level0SeriesTemplate.tooltip.animationDuration = 0;
        level0SeriesTemplate.tooltip.fontSize = "12px";
        level0SeriesTemplate.strokeOpacity = 1;

        // // level 1 series template
        // let level1SeriesTemplate = chart.seriesTemplates.create("1");
        // let level1ColumnTemplate = level1SeriesTemplate.columns.template;

        // level1SeriesTemplate.tooltip.animationDuration = 0;
        // level1SeriesTemplate.strokeOpacity = 1;

        // level1ColumnTemplate.column.cornerRadius(10, 10, 10, 10)
        // level1ColumnTemplate.fillOpacity = 1;
        // level1ColumnTemplate.strokeWidth = 4;
        // level1ColumnTemplate.stroke = bgColor;

        // let bullet1 = level1SeriesTemplate.bullets.push(new am4charts.LabelBullet());
        // bullet1.locationY = 0.5;
        // bullet1.locationX = 0.5;
        // bullet1.label.text = "{name}";
        // bullet1.label.fill = am4core.color("#ffffff");

        // chart.maxLevels = 2;

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
export default TreeMap;