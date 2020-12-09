import React, { useState, useEffect, useRef } from "react";
import Header from '../components/header';
import axios from 'axios';
import { Row, Col, Button, Modal, Card, CardBody, Table, Input, Form, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import {createBrowserHistory } from 'history';
export const history = createBrowserHistory({forceRefresh:true});


function Users(){
    const [users, setUsers] = useState([]);
    const API_BASE = process.env.REACT_APP_API_BASE;
    //const API_BASE = process.env.REACT_APP_TEST_API_BASE;

    const getCurrentUser = () => {
        return localStorage.getItem('user')
      }

    const handleClick = () =>{
        history.push('/sdgportalreact/CreateUsers');
    }

    useEffect(() => {
        const fetchData = async() =>{
            const result = await axios(API_BASE+'/users');
            const apiData = result.data.data;
            apiData.sort(function(a, b){return a.createdAt - b.createdAt});
            setUsers(result.data.data);
        }
        fetchData();
    }, [users])


    return (
        <>
        <Header></Header>
        <div className="container-fluid users-div">
            <Row>
            <Col md="2"></Col>
                <Col md="8">
                    <Card>
                        <CardBody>
                        <h3>System Users</h3>
                            <Button className="btn-warning center" onClick={ handleClick }>Add new user</Button>
                            <Table>
                                <thead>
                                        <tr>
                                            <th width="30%">Email</th>
                                            <th width="30%">Username</th>
                                            <th width="30%">Role</th>
                                        </tr>
                                </thead>
                                <tbody>
                                {
                                    
                                    users.map(user => {
                                        return <tr className="user-div" key={user._id}>
                                               
                                                <td> {user.email} </td>   
                                                <td> {user.username} </td>
                                                <td> {user.role} </td>
                                        </tr>   
                                    })
                                }
                                </tbody>
                            </Table>   
                        </CardBody>
                    </Card>
                </Col>
                <Col md="2"></Col>

            </Row>

        </div>

        </>
    )

}

export default Users;