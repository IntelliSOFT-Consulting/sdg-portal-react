import React from 'react';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {
    Container
} from "reactstrap";

function sdgHighChart (){
    const chartOptions = {
        chart: {
            type: 'spline'
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            align: "left",
            startOnTick: false,
            endOnTick: false,
            minPadding: 0,
            maxPadding: 0,
        },
        yAxis: {
            title: {
                text: 'Temperature'
            },
            labels: {
                formatter: function () {
                    return this.value + '°';
                }
            }
        },
        tooltip: {
            crosshairs: true,
            shared: true
        },
        plotOptions: {
            spline: {
                marker: {
                    radius: 4,
                    lineColor: '#666666',
                    lineWidth: 1
                }
            }
        },
        series: [{
            name: 'Tokyo',
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 23.3, 18.3, 13.9, 9.6]
    
        }, {
            name: 'London',
            data: [ 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
        }]
    }
    return(
        <>
            <Container>
                <HighchartsReact
                    constructorType ={'chart'}
                    highcharts={Highcharts}
                    options={chartOptions}
                    />
            </Container>
        </>
        )
}

export default sdgHighChart;