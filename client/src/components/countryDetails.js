import React from "react";
import {Row, Col} from 'reactstrap';

function CountryDetails({ countryData }) {
  return (
            <Row className="countryDemographics">
                <Col lg="2" md="6">
                    <img className="countryFlags" alt=".." src={countryData.flagURL}></img>
                </Col>
                <Col></Col>
                <Col></Col>
                <Col lg="3" md="6">
                    <label> Capital: {countryData.capital}</label> <br></br>
                    <label>Poverty line: {countryData.povertyLine} </label> <br></br>
                    <label>GDP Per Capita: {countryData.gdpPerCapita} </label>
                </Col>
            </Row>     
  );
}

export default CountryDetails;