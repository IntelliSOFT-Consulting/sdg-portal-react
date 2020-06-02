import React, { useState, useEffect } from "react";
import Header from '../components/dataUploadHeader';
import axios from 'axios';
import {
    Container, Row, Col, Button, Modal, Card, CardBody, CardHeader, Table, Input, Form
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Moment from 'react-moment';
import CsvInterface from '../components/csvviewer/csvInterface';
import { CSVLink, CSVDownload } from "react-csv";

function DataUpload(){
     
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [years, setYears] = useState([2019, 2018, 2017]);
    const [year, setYear] = useState(2019);
    const [yearFrom, setYearFrom] = useState(0);
    const [yearTo, setYearTo] = useState(0);

    const [pages, setPages] = useState(['SDG', 'Agenda 2063', 'Country Profile', 'Dashboard']);
    const [page, setPage] = useState('');

    const countryProfileSections = ['Country data', 'Goal perfomance', 'Demographics data' ];
    const [section, setSection] = useState('Country data');

    const dataSources = ['Global Database', 'Pan African Database'];
    const [dataSource, setDataSource] = useState('Global Database');

    const [file, setFile] = useState([]);
    const [fileData, setFileData] = useState([]);
    const [files, setFiles] = useState([]);

    const [csvDownloadFileData, setCsvDownloadFileData] = useState([]);
    const [csvFileName, setCsvFileName] = useState('');
    const [csvLink, setCsvLink] = useState(React.createRef());

    const [toggleModal, setOpenModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const API_BASE = "http://localhost:3001/api"

    const handleFileData = (fileData) =>{
        console.log(fileData)
        setFileData(fileData)
    }

    const handleDownload = (e) =>{
        const id = e.currentTarget.value;
        axios.get(API_BASE + "/file/"+ id)
            .then(res => {
                const csvFile = (res.data.title).replace(/ /g, "");

                setCsvFileName(csvFile);
                setCsvDownloadFileData(res.data.data);

                csvLink.current.link.click();
            })
            .catch(error => {
                console.log(error.res)
            });

    }

    const onClickHandler = () =>{
        //Set button spinner
        setIsLoading(true);

        const data = new FormData()
        data.append('file', file)
        data.append("title", title);
        data.append("description", description);
        data.append("page", page);
        data.append("year", year);
        data.append("fileData", JSON.stringify(fileData));
        data.append("user", '');
        data.append("yearFrom", yearFrom);
        data.append("yearTo", yearTo);
        data.append("section", section);

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
        console.log(files);

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
                                                    <td> 
                                                         <Button className="btn-icon" onClick={handleDownload} value={file._id}>
                                                            <FontAwesomeIcon icon="cloud-download-alt" size="lg"></FontAwesomeIcon>
                                                        </Button>
                                                        <CSVLink
                                                                data={csvDownloadFileData}
                                                                filename={csvFileName+'.csv'}
                                                                className="hidden"
                                                                ref={csvLink}
                                                                target="_blank" 
                                                            />
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
                                                    <td> 
                                                         <Button className="btn-icon" onClick={handleDownload} value={file._id}>
                                                            <FontAwesomeIcon icon="cloud-download-alt" size="lg"></FontAwesomeIcon>
                                                        </Button>
                                                        <CSVLink
                                                                data={csvDownloadFileData}
                                                                filename={csvFileName+'.csv'}
                                                                className="hidden"
                                                                ref={csvLink}
                                                                target="_blank" 
                                                            />
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
                                                         <Button className="btn-icon" onClick={handleDownload} value={file._id}>
                                                            <FontAwesomeIcon icon="cloud-download-alt" size="lg"></FontAwesomeIcon>
                                                        </Button>
                                                        <CSVLink
                                                                data={csvDownloadFileData}
                                                                filename={csvFileName+'.csv'}
                                                                className="hidden"
                                                                ref={csvLink}
                                                                target="_blank" 
                                                            />
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
                                                    <td> 
                                                         <Button className="btn-icon" onClick={handleDownload} value={file._id}>
                                                            <FontAwesomeIcon icon="cloud-download-alt" size="lg"></FontAwesomeIcon>
                                                        </Button>
                                                        <CSVLink
                                                                data={csvDownloadFileData}
                                                                filename={csvFileName+'.csv'}
                                                                className="hidden"
                                                                ref={csvLink}
                                                                target="_blank" 
                                                            />
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
                                        <Input type="select" name="yearTo" onChange={ e => setYearFrom(parseInt(e.target.value)) } value={yearFrom} >
                                            {
                                                years.map((year, index) => {
                                                    return <option value = {year}> {year} </option>
                                                })
                                            }
                                        </Input>
                                    </Col>
                                    
                                    <Col md="3">
                                        <label>Year to</label>
                                        <Input type="select" name="yearTo" onChange={ e => setYearTo(parseInt(e.target.value)) } value={yearTo} >
                                            {
                                                years.map((year, index) => {
                                                    return <option value = {year}> {year} </option>
                                                })
                                            }
                                        </Input>
                                    </Col>
                                    
                            </Row>
                            ):null
                        }
                        {
                            page === 'Dashboard' ? (
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
                            ):null
                        }
                        {
                            page === 'Country Profile' ? (
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
                                        <label>Section</label>
                                        <Input type="select" name="countryProfileSectionsSelect" onChange={ e => setSection(e.target.value) } value={section} >
                                            {
                                                countryProfileSections.map((section, index) => {
                                                    return <option value={section}> {section} </option>
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
                            ):null
                        }

                        <label>File</label>
                        <CsvInterface handleSetFileData={ handleFileData }/>    
                    
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