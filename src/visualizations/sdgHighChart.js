import React from 'react';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {
    Container
} from "reactstrap";
import HC_exporting from 'highcharts/modules/exporting';

HC_exporting(Highcharts)

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

    const myData = [
        ['Shanghai', 24.2],
        ['Beijing', 20.8],
        ['Karachi', 14.9],
        ['Shenzhen', 13.7],
        ['Guangzhou', 13.1],
        ['Istanbul', 12.7],
        ['Mumbai', 12.4],
        ['Moscow', 12.2],
        ['São Paulo', 12.0],
        ['Delhi', 11.7],
        ['Kinshasa', 11.5],
        ['Tianjin', 11.2],
        ['Lahore', 11.1],
        ['Jakarta', 10.6],
        ['Dongguan', 10.6],
        ['Lagos', 10.6],
        ['Bengaluru', 10.3],
        ['Seoul', 9.8],
        ['Foshan', 9.3],
        ['Tokyo', 9.3]
    ]
    const chartOptions = {
        chart: {
            type: 'column'
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