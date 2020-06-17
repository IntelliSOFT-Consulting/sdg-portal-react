import React, {useEffect} from 'react';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import addTreemapModule from 'highcharts/modules/treemap';
addTreemapModule(Highcharts);


function TreeMap( {treeMapData} ){
   // console.log(treeMapData)

    const parseTreeMapData = (data) => {
        const parsedData = []
        data.forEach(function(d){
            parsedData.push({
                name: d.title,
                value: d.achievement,
                color: d.color,
                description : d.description,
                color2: d.color2
            })
        })
        return parsedData
    }

    const chartOptions = {
        series: [{
            type: 'treemap',
            layoutAlgorithm: 'squarified',
            data: parseTreeMapData(treeMapData),
            dataLabels: {
                enabled: true,
                useHTML: true,
                align: 'center',
                formatter: function () {
                    let label = '<span class="tree-map-aspiration-title">' + this.point.name + '</span>' + 
                                '<br> <br>' + 
                                '<span class="tree-map-aspiration-value" style="background-color:' + this.point.color2 + ';border-radius: 50%;width:40px;height:40px;display:flex;margin:5px auto 0 auto;font-size: 13px !important;justify-content: center;align-items: center;">' + this.point.value + '%' + '</span>' 
                    return label;
                },
                
            }
        }],
        title: {
            text: ''
        },
        tooltip: {
            useHTML: true,
            formatter: function () {
                let label = '<div style="width:250px; white-space:pre-wrap;">' +
                                '<span>' + this.point.name + " : " + this.point.description + '</span' + 
                                '<br> <br>' + 
                                '<div style="width:180px; height:10px; background-color: "#eee"> </div>' + 
                                '<div > Achievement  <span style="padding: 5px;color: white;font-weight:600;background-color:' + this.point.color + ';">' + this.point.value + "%" + ' </span> </div' + 
                            '</div>'
                return label
            },
            outside: true
        },
        exporting: {
            enabled: false
        },
        credits: {
            enabled: false
        }
    }

    useEffect(() => {
    })
    return(
        <>
            <HighchartsReact
                    constructorType ={'chart'}
                    highcharts={Highcharts}
                    options={chartOptions}
                    />
        </>
    )
    
    }
export default TreeMap;