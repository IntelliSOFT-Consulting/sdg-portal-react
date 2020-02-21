import React from 'react';
import { 
    Container 
    } from "reactstrap";
import $ from "jquery";
import Highcharts from "highcharts/highcharts.js";
import highchartsMore from "highcharts/highcharts-more.js";
import solidGauge from "highcharts/modules/solid-gauge.js";
import HighchartsReact from "highcharts-react-official";

highchartsMore(Highcharts);

function Barometer({ barometerData }) {  
    const barometerOptions = {
        chart: {
            type: 'gauge',
            height: 250
        },

        pane: {
            startAngle: -90,
            endAngle: 90, 
            background: null
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
            max: 200,

            minorTickInterval: 'auto',
            minorTickWidth: 1,
            minorTickLength: 10,
            minorTickPosition: 'inside',
            minorTickColor: '#666',

            tickPixelInterval: 30,
            tickWidth: 2,
            tickPosition: 'inside',
            tickLength: 10,
            tickColor: '#666',
            labels: {
                step: 2,
                rotation: 'auto'
            },
            title: {
                
            },
            plotBands: [{
                from: 0,
                to: 120,
                color: '#55BF3B' // green
            }, {
                from: 120,
                to: 160,
                color: '#DDDF0D' // yellow
            }, {
                from: 160,
                to: 200,
                color: '#DF5353' // red
            }]
        },

        series: [{
            name: 'Speed',
            data: [80]
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