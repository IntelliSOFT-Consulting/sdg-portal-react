import React, { useState, useEffect } from "react";
import Header from '../components/header';
import axios from 'axios';
import {
    Container, Row, Col, Button, Modal, Card, CardBody, CardHeader, Table, Input
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function DataUpload(){
     
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [years, setYears] = useState([2019, 2018, 2017]);
    const [year, setYear] = useState(0);

    const [pages, setPages] = useState(['SDG', 'Agenda 2063', 'Country Profile', 'Dashboard']);
    const [page, setPage] = useState('');

    const [file, setFile] = useState(null);
    const [files, setFiles] = useState([]);

    const [toggleModal, setOpenModal] = useState(false);

    const API_BASE = "http://localhost:3002/api"

    const onClickHandler = () =>{
        const data = new FormData()
        data.append('file', file)
        data.append("title", title);
        data.append("description", description);
        data.append("page", page);
        data.append("year", year);
        console.log(page, title, year, description);

        //console.log(data)

        submitForm("multipart/form-data", data, (msg) => console.log(msg) )
    }

    const submitForm = (contentType, data, setResponse) =>{
        axios({
            url: `${API_BASE}/files`,
            method: 'POST',
            data: data,
            headers: {
            'Content-Type': contentType
            }
            }).then((response) => {
            setResponse(response.data);
            }).catch((error) => {
            setResponse("error");
            })
    }

        useEffect(() => {
            const fetchData = async() =>{
            const result = await axios(API_BASE+'/files');
            setFiles(result.data.data);
            console.log(result.data.data);
            }

            fetchData();

        }, [])


        const openModal = (e) =>{
            setOpenModal(true);
            setPage(e.target.value);
        }


    return (
        <>
        <Header></Header>
        <div className="container-fluid files-div" >
            {/* <Button className="btn-warning" onClick={ () => setOpenModal(true) }>Add new data</Button> */}
            <Row>
                <Col md="6">
                    <Card>
                        <CardBody>
                        <h3>SDGs Data</h3>
                            <Button className="btn-warning center" value="SDG" onClick={ openModal }>Add new data</Button>
                            <Table>
                                <thead>
                                        <tr>
                                            <th></th>
                                            <th>File name</th>
                                            <th>Date added</th>
                                            <th>Added by</th>
                                        </tr>
                                </thead>
                                <tbody>
                                {
                                    files.map(file => {
                                        return <tr className="file-div" key={file.Id}>
                                                    <td> <FontAwesomeIcon icon="file" size="lg"></FontAwesomeIcon> </td>
                                                    <td> {file.title} </td>   
                                                    <td> {file.createdAt} </td>
                                                    <td> </td>
                                            </tr>
                                    })
                                }
                                </tbody>
                            </Table>
                                
                        </CardBody>
                    </Card>
                   
                </Col>

                <Col md="6">
                    <Card>
                        <CardBody>
                        <h3>SDGs Data</h3>
                            <Button className="btn-warning center" value="SDG" onClick={ openModal }>Add new data</Button>
                            <Table>
                                <thead>
                                        <tr>
                                            <th></th>
                                            <th>File name</th>
                                            <th>Date added</th>
                                            <th>Added by</th>
                                        </tr>
                                </thead>
                                <tbody>
                                {
                                    files.map(file => {
                                        return <tr className="file-div" key={file.Id}>
                                                    <td> <FontAwesomeIcon icon="file" size="lg"></FontAwesomeIcon> </td>
                                                    <td> {file.title} </td>   
                                                    <td> {file.createdAt} </td>
                                                    <td> </td>
                                            </tr>
                                    })
                                }
                                </tbody>
                            </Table>
                                
                        </CardBody>
                    </Card>
                   
                </Col>

                <Col md="6">
                    <Card>
                        <CardBody>
                        <h3>SDGs Data</h3>
                            <Button className="btn-warning center" value="SDG" onClick={ openModal }>Add new data</Button>
                            <Table>
                                <thead>
                                        <tr>
                                            <th></th>
                                            <th>File name</th>
                                            <th>Date added</th>
                                            <th>Added by</th>
                                        </tr>
                                </thead>
                                <tbody>
                                {
                                    files.map(file => {
                                        return <tr className="file-div" key={file.Id}>
                                                    <td> <FontAwesomeIcon icon="file" size="lg"></FontAwesomeIcon> </td>
                                                    <td> {file.title} </td>   
                                                    <td> {file.createdAt} </td>
                                                    <td> </td>
                                            </tr>
                                    })
                                }
                                </tbody>
                            </Table>
                                
                        </CardBody>
                    </Card>
                   
                </Col>

                <Col md="6">
                    <Card>
                        <CardBody>
                        <h3>SDGs Data</h3>
                            <Button className="btn-warning center" value="SDG" onClick={ openModal }>Add new data</Button>
                            <Table>
                                <thead>
                                        <tr>
                                            <th></th>
                                            <th>File name</th>
                                            <th>Date added</th>
                                            <th>Added by</th>
                                        </tr>
                                </thead>
                                <tbody>
                                {
                                    files.map(file => {
                                        return <tr className="file-div" key={file.Id}>
                                                    <td> <FontAwesomeIcon icon="file-csv" size="lg"></FontAwesomeIcon> </td>
                                                    <td> {file.title} </td>   
                                                    <td> {file.createdAt} </td>
                                                    <td> </td>
                                            </tr>
                                    })
                                }
                                </tbody>
                            </Table>
                                
                        </CardBody>
                    </Card>
                   
                </Col>
            </Row>

            <Modal className="uploadFilesModal" isOpen={toggleModal} toggle={toggleModal}>
                <div className="modal-header">
                <h5 className="countryName" cssModule={{'modal-title': 'w-100 text-center'}}>Add new data</h5>
                    <button aria-label="Close" className="close" data-dismiss="modal" type="button"
                        onClick={ () => setOpenModal(false)} >
                        <span aria-hidden={true}>×</span>
                    </button>    
                </div>
                <div className="modal-body">
                    <Row>
                        <Col md="2">
                        <label>Title</label>
                        </Col>
                        <Col>
                            <input type="text" className="form-control" name="title" onChange={ e => setTitle(e.target.value) }></input>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="2">
                        <label>Description</label>
                        </Col>
                        <Col>
                            <input type="text" className="form-control" name="description" onChange={ e => setDescription(e.target.value) }></input>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Row>
                                <Col md="4">
                                <label>Page</label>
                                </Col>
                                <Col>
                                    <Input type="select" name="pagesSelect" onChange={ e => setPage(e.target.value) } value={page}>
                                        {
                                            pages.map((page, index) => {
                                                return <option value={page}> {page} </option>
                                            })
                                        }
                                    </Input>
                                </Col>
                            </Row>
                        </Col>

                        <Col>
                            <Row>
                                <Col md="2">
                                <label>Year</label>
                                </Col>
                                <Col>
                                    <Input type="select" name="yearsSelect" onChange={ e => setYear(parseInt(e.target.value)) } value={year}>
                                        {
                                            years.map((year, index) => {
                                                return <option value = {year}> {year} </option>
                                            })
                                        }
                                    </Input>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                   
                    <Row>
                        <Col md="2">
                        <label>File</label>
                            
                        </Col>
                        <Col>
                            {/* <label for="file-upload" className="custom-file-upload">Choose file to upload</label> */}
                            <input type="file" id="file-upload" onChange={(e) => setFile(e.target.files[0])} />
                        </Col>
                    </Row>
                    <input type="submit" className="btn btn-warning center" name="Upload" onClick={onClickHandler}></input>
                       
                </div>

            </Modal>

        </div>

        </>
    )

}

export default DataUpload;