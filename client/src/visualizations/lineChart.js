import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {
    Container
} from "reactstrap";
import HC_exporting from 'highcharts/modules/exporting';
import HC_exporting2 from 'highcharts/modules/export-data';

HC_exporting(Highcharts);
HC_exporting2(Highcharts);

function lineChart({lineChartData, years, country}){
    years =  years.sort((a, b) => a - b);
    const chartOptions = {
        chart: {
            height: 400
        },
        credits: {
            enabled: false
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            // tickInterval: 10,
            categories: years,
            align: "left",
            startOnTick: false,
            endOnTick: false,
            minPadding: 0,
            maxPadding: 0,
        },
        yAxis: {
            title: {
                text: 'Values per country'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                // pointStart: 1900,
                animation: {
                    duration: 5000
                }
            }
        },
        series : [{
            name : country,
            data : lineChartData
        }],

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
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

export default lineChart;