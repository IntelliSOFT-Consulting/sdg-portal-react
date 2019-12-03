import React from "react";
import {
    Container, Row, Col, Card, CardImg, Button, Input
} from "reactstrap";
import Map from "../../visualizations/map";

function Sdg(){
    const data = require('../../assets/data/sdgs.json');
    //console.log(data);
    const image = require.context('../../assets/img/sdg_icons', true);
    const sdg = data[0];
    const  imgSrc = image(`./${sdg.image}.jpg`);
    const targets = sdg.targets;
    const mapData = require('../../assets/data/trial.json');
   
    var csvFile = require("../../assets/data/sdg/sdgTarget_11_gdb.csv");
    var Papa = require("papaparse/papaparse.min.js");

    var sdgData = [];

    Papa.parse(csvFile, {
        download: true,
        header: true,
        complete: function(results){
           
            sdgData = results.data;
            console.log(sdgData);
        }
    })

    return(
        <>
            <div className="container-fluid">
                <Row className="sdgBackground">
                    <Col md="2">
                        <CardImg alt=".." src={imgSrc}></CardImg>
                    </Col>
                    <Col md="10">
                    <h5 className="display-4 mt-2 mb-2"> {sdg.title} </h5>
                    <p> {sdg.description} </p>
                    </Col>
                </Row>
                <div className="targetButtons text-center mt-1 pt-1 pb-3">
                    <h5 className="display-4 mt-2 mb-2"> SDG {sdg.id} Targets  </h5>
                        {
                            targets.map((target, index) =>{
                                return <Button key={index} color="warning"> Target {target.code}  </Button> 
                                            
                            })
                        }
                       
                </div>
                <Container>
                    <Card>
                        <p className="p-3"> Target {targets[0].code}: {targets[0].title} </p>
                        <Row className="text-center selectButtons"> 
                            <Col md="8">
                                <Button color="primary">Global Database</Button>
                                <Button color="primary">PanAfrican MRS</Button>
                            </Col>
                            <Col md="3">
                                <Input type="select" name="yearSelect" id="yearSelect" className="btn btn-primary"> 
                                    <option>2019</option>
                                    <option>2018</option>
                                    <option>2017</option>
                                </Input>
                            </Col>
                        </Row>
                        <Map value = {sdgData}></Map>
                    </Card>
                </Container>
            </div>
        </>
    )
}

export default Sdg;