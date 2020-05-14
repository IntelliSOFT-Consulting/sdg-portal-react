import React, { useState, useEffect } from "react";
import Header from '../components/header';
import axios from 'axios';
import {
    Container, Row, Col, Button, Modal, Card, CardBody, CardHeader
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


//const API_BASE = "http://localhost:3000"

function DataUpload(){
     
    const [file, setFile] = useState(null);
    const [files, setFiles] = useState([]);
    const [toggleModal, setOpenModal] = useState(false);

    const API_BASE = "http://localhost:3000/api"

    const onClickHandler = () =>{
        const data = new FormData()
        data.append('file', file)
        data.append("title", "Title");
        data.append("description", "Description")
        console.log(data)

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


    return (
        <>
        <Header></Header>
        <div className="container-fluid files-div" >
            <Button className="btn-warning" onClick={ () => setOpenModal(true) }>Add new data</Button>
            <Row>
                <Col>
                    <label>SDGs Data</label>
                    {
                        files.map(file => {
                            let filePath = "../" +  file.data.file.path;
                            return <div className="file-div" key={file.Id}>
                                    <FontAwesomeIcon icon="file" size="lg"></FontAwesomeIcon>
                                    <a href = {filePath} >{file.data.file.name} </a>
                                </div>
                        })
                    }
                </Col>

                <Col>
                    <label>Agenda 2063 Data</label>
                    {
                        files.map(file => {
                            let filePath =  file.data.file.path;
                            let url = "../" + filePath.substring(21);
                            console.log(url);
                            return <div className="file-div" key={file.Id}>
                                    <FontAwesomeIcon icon="file" size="lg"></FontAwesomeIcon>
                                    <a href = {url} >{file.data.file.name} </a>
                                </div>
                        })
                    }
                </Col>

                <Col>
                    <label>Dashboard Data</label>
                    {
                        files.map(file => {
                            let filePath = "file: //" +  file.data.file.path;
                            return <div className="file-div" key={file.Id}>
                                    <FontAwesomeIcon icon="file" size="lg"></FontAwesomeIcon>
                                    <a href = {filePath} >{file.data.file.name} </a>
                                </div>
                        })
                    }
                </Col>

                <Col>
                    <label>Country Profile Data</label>
                    {
                        files.map(file => {
                            let filePath = "file: //" +  file.data.file.path;
                            return <div className="file-div" key={file.Id}>
                                    <FontAwesomeIcon icon="file" size="lg"></FontAwesomeIcon>
                                    <a href = {filePath} >{file.data.file.name} </a>
                                </div>
                        })
                    }
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
                            <input type="text" className="form-control" name="title"></input>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="2">
                        <label>Description</label>
                        </Col>
                        <Col>
                            <input type="text" className="form-control" name="description"></input>
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