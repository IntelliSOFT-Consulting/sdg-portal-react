import React from 'react';
import { 
    Container 
    } from "reactstrap";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMap from "highcharts/modules/map";
import africaMapData from "@highcharts/map-collection/custom/africa.geo.json";

function Map({ value }) {
        //let data = require('../assets/data/trial.json');
        highchartsMap(Highcharts);
        const mapOptions = {
            chart: {
                map: 'custom/africa',
                backgroundColor: 'transparent',
                width: 800,
                height: 400,
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
                            //loadCountryData(this.value);
                            //openModal(this.value);
                            }
                        }
                    }
                }
            },
        
            mapNavigation: {},
        
            colorAxis: {
                min: 0,
                minColor: 'rgb(249, 219, 142)',
                maxColor: 'rgb(249, 219, 142)'
            },
        
            series: [{
                data: value,
                mapData: africaMapData,
                joinBy: ['iso-a2', 'code'],
                name: 'Country Profile',
                cursor: 'pointer',
                borderColor: 'black', //changes color of the country borders
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

export default Map;