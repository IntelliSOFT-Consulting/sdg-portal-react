import React from 'react';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {
    Container
} from "reactstrap";
import HC_exporting from 'highcharts/modules/exporting';

HC_exporting(Highcharts)

function sdgHighChart (  {myChartData, indicator, years} ){
    
    const chartOptions = {
        chart: {
            type: 'column',
            width: 1000,
            height: 550
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            type: 'category',
            labels: {
                rotation: -45,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            title: {
                text: 'Indicators value'
            },
            labels: {
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
        series : [{
            name: indicator,
            data : myChartData,
            
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