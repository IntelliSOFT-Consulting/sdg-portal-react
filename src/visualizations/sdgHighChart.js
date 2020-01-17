import React from 'react';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {
    Container
} from "reactstrap";

function sdgHighChart (  {myChartData, indicator, years} ){
    console.log(years)
    const years2 = ["2005", "2004", "2003", "2002", "2001", "2000", "1999", "1998", "1997", "1996", "1995", "1994", "1993", "1992", "1991", "1990", "1989", "1988", "1987", "1986", "1985", "1984", "1983", "1982", "1981", "1980", "1979", "1978", "1977", "1976", "1975", "1974", "1973", "1972", "1971", "1970", "1969", "1968", "1967", "1966", "1965", "1964", "1963", "1962", "1961", "1960", "1959", "1958", "1957", "1956", "1955", "1954", "1953", "1952", "1951", "1950", "1944", "1931", "1921", "1911", "1901", "1891", "1881", "1871", "1861", "1850", "1800", "1797"]
    const data2 = [
        {   
            name : "Algeria",
            data : [
                {
                    "Entity": "Algeria",
                    x : "1800",
                    y: 1
                },
                {
                    "Entity": "Algeria",
                    x : 1900,
                   y: 2
                }
            ]
        }, 
        {   
            name : "Kenya",
            data : [
                {
                    "Entity": "Kenya",
                    x : 1800,
                    y: 1
                },
                {
                    "Entity": "Kenya",
                    x : 1900,
                    y: 2
                }
            ]
        }
    ]
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
            categories: years2,
            align: "left",
            startOnTick: false,
            endOnTick: false,
            minPadding: 0,
            maxPadding: 0,
        },
        yAxis: {
            title: {
                text: 'Indicators'
            },
            labels: {
                // formatter: function () {
                //     return this.value + '°';
                // }
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
        series : data2
        // series: [{
        //     name: 'Tokyo',
        //     data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 23.3, 18.3, 13.9, 9.6]
    
        // }, {
        //     name: 'London',
        //     data: [ 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
        // }]
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