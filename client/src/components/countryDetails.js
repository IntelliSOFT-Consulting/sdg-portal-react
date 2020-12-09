import React from "react";
import {Row, Col} from 'reactstrap';

function CountryDetails({ countryData }) {
  return (
            <Row className="country-details">
                <Col lg="3" md="6">
                    <label> <span>CAPITAL: </span>  {countryData.capital}</label> <br></br>
                    <label> <span>POVERTY LINE: </span> {countryData.povertyLine} </label> <br></br>
                    <label> <span>GDP Per Capita: </span>{countryData.gdpPerCapita} </label>
                </Col>

                <Col></Col>
                <Col></Col>
                <Col lg="2" md="6">
                    <img className="countryFlags" alt=".." src={countryData.flagURL}></img>
                </Col>
            </Row>     
  );
}

export default CountryDetails;