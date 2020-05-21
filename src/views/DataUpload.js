import React, { useState, useEffect } from "react";
import Header from '../components/dataUploadHeader';
import axios from 'axios';
import {
    Container, Row, Col, Button, Modal, Card, CardBody, CardHeader, Table, Input, Form
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Moment from 'react-moment';
import CsvInterface from '../components/csvviewer/csvInterface';

function DataUpload(){
     
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [years, setYears] = useState([2019, 2018, 2017]);
    const [year, setYear] = useState(2019);
    const [yearFrom, setYearFrom] = useState(0);
    const [yearTo, setYearTo] = useState(0);

    const [pages, setPages] = useState(['SDG', 'Agenda 2063', 'Country Profile', 'Dashboard']);
    const [page, setPage] = useState('');

    const dataSources = ['Global Database', 'Pan African Database'];
    const [dataSource, setDataSource] = useState('Global Database');

    const [file, setFile] = useState([]);
    const [fileData, setFileData] = useState([]);
    const [files, setFiles] = useState([]);

    const [toggleModal, setOpenModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const API_BASE = "http://localhost:3002/api"

    const handleFileData = (fileData) =>{
        console.log(fileData)
        setFileData(fileData)
    }

    const onClickHandler = () =>{
        //Set button spinner
        setIsLoading(true);
        console.log(fileData);
        const dummyData = [{"Country": "Kenya", "id": "2"},{"Country": "Uganda", "id": "1"} ]

        const data = new FormData()
        data.append('file', file)
        data.append("title", title);
        data.append("description", description);
        data.append("page", page);
        data.append("year", year);
        data.append("fileData", JSON.stringify(fileData));

        submitForm("multipart/form-data", data, (msg) => console.log(msg) )
    }

    

    const submitForm = (contentType, data, setResponse) =>{
        axios({
            url: `${API_BASE}/files`,
            method: 'POST',
            data: data,
            headers: { 'Content-Type': contentType }
            })
            .then((response) => {
                console.log(data);
                setResponse(response.data);
                //Remove button spinner
                setIsLoading(false);

                //Close modal
                setOpenModal(false);
            }).catch((error) => {
                setResponse("error");
            })
    }

    useEffect(() => {
        const fetchData = async() =>{
            const result = await axios(API_BASE+'/files');
            setFiles(result.data.data);
        }
        fetchData();

    }, [isLoading])

    const openModal = (e) =>{
        setOpenModal(true);
        setPage(e.target.value);
    }

    return (
        <>
        <Header></Header>
        <div className="container-fluid files-div">
            <Row>
                <Col md="6">
                    <Card>
                        <CardBody>
                        <h3>SDGs Data</h3>
                            <Button className="btn-warning center" value="SDG" onClick={ openModal }>Add new data</Button>
                            <Table>
                                <thead>
                                        <tr>
                                            <th width="5%"></th>
                                            <th width="20%">File name</th>
                                            <th width="15%">Date added</th>
                                            <th width="25%">Added by</th>
                                        </tr>
                                </thead>
                                <tbody>
                                {
                                    files.map(file => {
                                        if(file.page == 'SDG'){
                                            return <tr className="file-div" key={file.Id}>
                                                    <td> <FontAwesomeIcon icon="file-csv" size="lg"></FontAwesomeIcon> </td>
                                                    <td> {file.title} </td>   
                                                    <td> 
                                                        <Moment format="DD/MM/YYYY HH:mm">
                                                            {file.createdAt}
                                                        </Moment>
                                                    </td>
                                                    <td> </td>
                                            </tr>
                                        }
                                        
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
                        <h3>Agenda 2063 Data</h3>
                            <Button className="btn-warning center" value="Agenda 2063" onClick={ openModal }>Add new data</Button>
                            <Table>
                                <thead>
                                        <tr>
                                            <th width="5%"></th>
                                            <th width="20%">File name</th>
                                            <th width="15%">Date added</th>
                                            <th width="25%">Added by</th>
                                        </tr>
                                </thead>
                                <tbody>
                                {
                                    files.map(file => {
                                        if(file.page == 'Agenda 2063'){
                                            return <tr className="file-div" key={file.Id}>
                                                    <td> <FontAwesomeIcon icon="file-csv" size="lg"></FontAwesomeIcon> </td>
                                                    <td> {file.title} </td>   
                                                    <td> 
                                                        <Moment format="DD/MM/YYYY HH:mm">
                                                            {file.createdAt}
                                                        </Moment>
                                                    </td>
                                                    <td> </td>
                                            </tr>
                                        }
                                        
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
                        <h3>Country Profile Data</h3>
                            <Button className="btn-warning center" value="Country Profile" onClick={ openModal }>Add new data</Button>
                            <Table>
                                <thead>
                                <tr>
                                    <th width="5%"></th>
                                    <th width="20%">File name</th>
                                    <th width="15%">Date added</th>
                                    <th width="25%">Added by</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    files.map(file => {
                                        if(file.page == 'Country Profile'){
                                            return <tr className="file-div" key={file.Id}>
                                                    <td> <FontAwesomeIcon icon="file-csv" size="lg"></FontAwesomeIcon> </td>
                                                    <td> {file.title} </td>   
                                                    <td> 
                                                        <Moment format="DD/MM/YYYY HH:mm">
                                                            {file.createdAt}
                                                        </Moment>
                                                    </td>
                                                    <td> </td>
                                                    <td>
                                                    <FontAwesomeIcon icon="cloud-download-alt" size="lg"></FontAwesomeIcon>
                                                    </td>
                                            </tr>
                                        }
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
                        <h3>Dashboard Data</h3>
                            <Button className="btn-warning center" value="Dashboard" onClick={ openModal }>Add new data</Button>
                            <Table>
                                <thead>
                                <tr>
                                    <th width="5%"></th>
                                    <th width="20%">File name</th>
                                    <th width="15%">Date added</th>
                                    <th width="25%">Added by</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    files.map(file => {
                                        if(file.page == 'Dashboard'){
                                            return <tr className="file-div" key={file.Id}>
                                                    <td> <FontAwesomeIcon icon="file-csv" size="lg"></FontAwesomeIcon> </td>
                                                    <td> {file.title} </td>   
                                                    <td> 
                                                        <Moment format="DD/MM/YYYY HH:mm">
                                                            {file.createdAt}
                                                        </Moment>
                                                    </td>
                                                    <td> </td>
                                            </tr>
                                        }
                                    })
                                }
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                   
                </Col>
            </Row>

            <Modal className="uploadFilesModal modal-lg" isOpen={toggleModal} toggle={toggleModal}>
                <div className="modal-header">
                <h5 className="countryName" cssModule={{'modal-title': 'w-100 text-center'}}>Add new data</h5>
                    <button aria-label="Close" className="close" data-dismiss="modal" type="button"
                        onClick={ () => setOpenModal(false)} >
                        <span aria-hidden={true}>×</span>
                    </button>    
                </div>
                <div className="modal-body">

                    <Form>
                        <label>Title</label>
                        <input type="text" className="form-control" name="title" onChange={ e => setTitle(e.target.value)} required/>

                        <label>Description</label>
                        <input type="text" className="form-control" name="description" onChange={ e => setDescription(e.target.value)} required/>
                        {
                            page === 'SDG' || page === 'Agenda 2063' ? (
                                <Row>
                                    <Col md="3">
                                        <label>Page</label>
                                        <Input type="select" name="page" value={page} onChange={ e=> setPage(e.target.value) }>
                                            {
                                                pages.map((page, index) => {
                                                    return <option value={page}> {page} </option>
                                                })
                                            }
                                        </Input>
                                    </Col>
                                    <Col md="3">
                                        <label>Data source</label>
                                        <Input type="select" name="dataSourceSelect" onChange={ e => setDataSource(e.target.value) } value={dataSource} >
                                            {
                                                dataSources.map((dataSource, index) => {
                                                    return <option value = {dataSource}> {dataSource} </option>
                                                })
                                            }
                                        </Input>
                                    </Col>
                                    
                                    <Col md="3">
                                        <label>Year from</label>
                                        <Input type="text" name="yearFrom" required></Input> 
                                    </Col>
                                    
                                    <Col md="3">
                                        <label>Year to</label>
                                        <Input type="text" name="yearTo" required></Input>
                                    </Col>
                                    
                            </Row>
                            ):(
                                <Row>
                                    <Col md="3">
                                        <label>Page</label>
                                        <Input type="select" name="pagesSelect" onChange={ e => setPage(e.target.value) } value={page} >
                                            {
                                                pages.map((page, index) => {
                                                    return <option value={page}> {page} </option>
                                                })
                                            }
                                        </Input>
                                    </Col>
                                    <Col md="3">
                                        <label>Year</label>
                                        <Input type="select" name="yearsSelect" onChange={ e => setYear(parseInt(e.target.value)) } value={year} >
                                            {
                                                years.map((year, index) => {
                                                    return <option value = {year}> {year} </option>
                                                })
                                            }
                                        </Input>
                                    </Col>
                                    
                                </Row>
                            )
                        }

                        <label>File</label>
                        <CsvInterface handleSetFileData={ handleFileData }/>    
                        {/* <Input type="file" id="file-upload" accept=".csv" 
                                onChange={(e) => setFile(e.target.files[0])} required></Input> */}
                       
                        {
                        isLoading ? (
                            <Button className="btn btn-warning center">
                                <FontAwesomeIcon icon="spinner"></FontAwesomeIcon> Uploading
                            </Button>
                        ):(
                            <input type="submit" className="btn btn-warning center" name="Upload" onClick={onClickHandler}/>
                        )
                    }
                    </Form>
                </div>

            </Modal>

        </div>

        </>
    )

}

export default DataUpload;