import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {
    Container
} from "reactstrap";
import HC_exporting from 'highcharts/modules/exporting';

HC_exporting(Highcharts)

function lineChart({lineChartData, years, indicator}){
    console.log(lineChartData)

    const chartOptions = {
        title: {
            text: 'SDG values over time'
        },
        subtitle: {
            text: 'Source: sdg.org'
        },
        xAxis: {
            // tickInterval: 10,
            categories: ["2012", "2013", "2014", "2015", "2017" ],
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
        series : lineChartData,

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