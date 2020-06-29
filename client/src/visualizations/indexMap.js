import React from 'react';
import {  Container } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMap from "highcharts/modules/map";
import africaMapData from "@highcharts/map-collection/custom/africa.geo.json";

function IndexMap({ mySdgData, onCountryClick }) {
        highchartsMap(Highcharts);
        const handleCountryClick =  (country) =>{
            onCountryClick(country)
            //console.log(country)
        }
        let code = "hc-a2";
        const mapOptions = {
            chart: {
                map: 'custom/africa',
                backgroundColor: 'transparent',
                height: '100%'
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
                                handleCountryClick(this.properties[code])
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
                }
            }]
          }


        return (
            <Container className="chart-wrapper">
                <Container className="chart-inner">
                    <HighchartsReact
                        constructorType ={'mapChart'}
                        highcharts={Highcharts}
                        options={mapOptions}
                        />
                </Container>
                
            </Container>
        );
      
}

export default IndexMap;