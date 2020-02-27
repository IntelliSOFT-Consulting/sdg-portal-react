import React from 'react';
import { 
    Container
    } from "reactstrap";
import $ from "jquery";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMap from "highcharts/modules/map";
import africaMapData from "@highcharts/map-collection/custom/africa.geo.json";

function IndexMap({ mySdgData }) {
        highchartsMap(Highcharts);

        let csvFile = require("../assets/data/sdg/sdgTarget_11_mrs.csv");
        let Papa = require("papaparse/papaparse.min.js");
        let sdgData = [];
        const period = "2017";

        const newCountryData = [];
        Papa.parse(csvFile, {
            download: true,
            header: true,
            complete: function(results){
                sdgData = results.data;
                // cycle through source data and filter out required data points
                for (let i = 0; i < sdgData.length; i++) {
                    let dataPoint = sdgData[i];
                    newCountryData.push({
                            "code": dataPoint.code,
                            "drilldown": dataPoint.drilldown,
                            "value": dataPoint[period],
                            "country":dataPoint.country
                        });        
                }
                
            }
        })     
  
        
        let code = "hc-a2";
  
        const mapOptions = {
            chart: {
                map: 'custom/africa',
                backgroundColor: 'transparent',
            },
            credits: {
                enabled: false
            },
            title: {
                text: ''
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            plotOptions: {
                series: {
                    point: {
                        events: {
                            click: function () {
                                console.log(this.properties[code])
                            }
                        }
                    }
                }
            },
        
            mapNavigation: {},
        
            colorAxis: {
                dataClasses: [{
                    from: 0,
                    to: 20,
                    name: 'Information unavailable.',
                    color: '#cecdcd'
                }, {
                    from: 20,
                    to: 40,
                    name: 'Off Track',
                    color: '#ff0000'
                }, {
                    from: 40,
                    to: 60,
                    name: 'Significant challenges remain',
                    color: '#ffa500'
                },{
                    from: 60,
                    to: 80,
                    name: 'Challenges remain',
                    color: '#f1cd00'
                },{
                    from: 80,
                    name: 'SDG Achieved',
                    color: '#008d00'
                }]
                
            },
        
            series: [{
                data: mySdgData,
                mapData: africaMapData,
                joinBy: ['iso-a2', 'code'],
                name: 'Country Profile',
                cursor: 'pointer',
                borderColor: 'white', //changes color of the country borders
                borderWidth: 0.5,
                states: {
                    hover: {
                        color: '#B22222'
                    }
                },
                dataLabels: {
                    // enabled: true,
                    // format: '{point.name}'
                }
            }]
          }


        return (
            <Container>
                <HighchartsReact
                    constructorType ={'mapChart'}
                    highcharts={Highcharts}
                    options={mapOptions}
                    />
            </Container>
        );
      
}

export default IndexMap;