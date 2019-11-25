import React from "react";
import Footer from "../components/footer";
import {
    Container,
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Modal,
    Row,
    Col
} from "reactstrap";


import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMap from "highcharts/modules/map";
import africaMapData from "@highcharts/map-collection/custom/africa.geo.json";

var data = require('../assets/data/trial.json');
//console.log(data)

highchartsMap(Highcharts);

const mapOptions = {
    chart: {
        map: 'custom/africa',
        backgroundColor: 'transparent',
        width: 1000,
        height: 500,
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
                       loadCountryData(this.value);
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
        data: data,
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

  function loadCountryData(countryId){
    //alert(countryId);
    var countryData = require('../assets/data/countryProfile.json');
    console.log(countryData)
}

class CountryProfile extends React.Component {
    state = {};
    toggleModal = state => {
        this.setState({
        [state]: !this.state[state]
        });
    };

    render(){
        return(
            <>
             <main>
                <Container>
                    <HighchartsReact
                        constructorType ={'mapChart'}
                        highcharts={Highcharts}
                        options={mapOptions}
                        />
                </Container>
                <Container>
                <Col md="4">
                    <Button block className="mb-3" color="primary" type="button" onClick={() => this.toggleModal("defaultModal")}>
                    Default
                    </Button>
                    <Modal size="lg" className="modal-dialog-centered" isOpen={this.state.defaultModal}
                        toggle={() => this.toggleModal("defaultModal")} >
                        <div className="modal-header">
                            <button aria-label="Close" className="close" data-dismiss="modal" type="button"
                                onClick={() => this.toggleModal("defaultModal")} >
                                <span aria-hidden={true}>×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>
                            Far far away, behind the word mountains, far from the
                            countries Vokalia and Consonantia, there live the blind texts.
                            Separated they live in Bookmarksgrove right at the coast of
                            the Semantics, a large language ocean.
                            </p>
                            <p>
                            A small river named Duden flows by their place and supplies it
                            with the necessary regelialia. It is a paradisematic country,
                            in which roasted parts of sentences fly into your mouth.
                            </p>
                        </div>
                    </Modal>
                </Col>
                </Container>
            </main>
            <Footer></Footer>
            </>
        )
    }
}

export default CountryProfile;