import React from 'react';
import { 
    Container 
    } from "reactstrap";
import Highcharts from "highcharts/highcharts.js";
import highchartsMore from "highcharts/highcharts-more.js";
import solidGauge from "highcharts/modules/solid-gauge.js";
import HighchartsReact from "highcharts-react-official";

highchartsMore(Highcharts);
solidGauge(Highcharts);

function Barometer({ barometerData, country, sdg }) { 
    let score = 0;
    console.log(barometerData, country, sdg)
    barometerData.forEach(function(countryBarometerData){
        if(countryBarometerData.code == country ){
            let sdgCode = ''
            if(sdg == 18){
              score = countryBarometerData.Score;
            }else{
                sdgCode = 'goal' + sdg;
                score = countryBarometerData[sdgCode]
            }
        }

    })
    //console.log(score);

    const barometerOptions = {
        chart: {
            type: 'gauge',
            height: '400px'
        },

        title: {
            text: ''
        },
        pane: {

            size: "100%",
            startAngle: -90,
            endAngle: 90,
            background: {
              innerRadius: "100%",
              outerRadius: "75%",
              shape: "arc"
            }
        },
        credits: {
            enabled: false
        },
        exporting: {
            enabled: false
        },

        // the value axis
        yAxis: {
            min: 0,
            max: 100,

            minorTickInterval: 10,
            minorTickWidth: 0,
            minorTickLength: 7,
            minorTickPosition: 'inside',
            minorTickColor: '#666',

            tickInterval: 5,
            tickPixelInterval: 30,
            tickWidth: 1,
            tickPosition: 'inside',
            tickLength: 7,
            tickColor: '#666',
            labels: {
                step: 2,
                rotation: 'auto',
                color: '#000'
            },
            title: {
                text: ' '
            },
            plotBands: [{
                from: 0,
                to: 25,
                color: '#ff3232', // green
                borderColor: '#ff3232',
                thickness: '30%',
            }, {
                from: 25,
                to: 50,
                color: '#ffb632', // yellow
                thickness: '30%'
            }, {
                from: 50,
                to: 75,
                color: '#f3d632', // red
                thickness: '30%'
            },{
                from: 75,
                to: 100,
                color: '#32a332', // red
                thickness: '30%'
            }]
        },

        series: [{
            name: 'Speed',
            data: [80] ,
            dataLabels: {
                format:
                    '<div style="text-align:center">' +
                    '<span style="font-size:15px">{y} % </span><br/>' +
                    '</div>'
            },
            tooltip: {
                valueSuffix: ' %'
            }
        }]
    }
    


        return (
            <Container>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={barometerOptions}
                    />
            </Container>
        );
      
}

export default Barometer;