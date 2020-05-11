import React, { useState, useEffect } from "react";
import Header from '../components/header';
import axios from 'axios';

//const API_BASE = "http://localhost:3000"

function DataUpload(){
     
    const [file, setFile] = useState(null);
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
        console.log(file)
    })

    return (
        <>
        <Header></Header>
        <input type="text" className="form-control" name="title"></input>
        <input type="text" className="form-control" name="description" ></input>
        <input type="file" className="form-control" name="data" onChange={(e) => setFile(e.target.files[0])} />
        <input type="submit" className="btn" name="Upload" onClick={onClickHandler}></input>
        </>
    )

}

export default DataUpload;