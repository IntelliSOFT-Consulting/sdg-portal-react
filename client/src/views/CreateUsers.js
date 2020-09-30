import React, { useState } from "react";
import {
    Container, Row, Col, Card,  Input, Form, Label, InputGroup, InputGroupAddon, InputGroupText
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from '../components/LoginHeader';
import {createBrowserHistory } from 'history';
export const history = createBrowserHistory({forceRefresh:true});

function CreateUsers(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');
    const roles = ['Data entry clerk', 'Administrator'];

    const [errorMsg, setErrorMsg] = useState('');

    const API_BASE = process.env.REACT_APP_API_BASE;

    // function validateForm() {
    //     return email.length > 0 && password.length > 0;
    // }

    function handleSubmit(event) {
        event.preventDefault();

        fetch(API_BASE + '/user/create', {
            method: 'POST',
            body: JSON.stringify({email, password, username, role}),
            headers: {
                'Content-Type': 'application/json'
            } 
        }).then(res => {
            console.log(res)
            if(res.status === 200){
                history.push('/sdgportalreact/Users');
                localStorage.setItem("user", email);
            }else{
                const error = new Error(res.error);
                throw error;
            }
        }).catch(err => {
            setEmail('');
            setPassword('');
            setErrorMsg('Invalid email or password. Please try again.')
        })
    }
  

    return(
        <>
        <Header></Header>
        <Container>
            <Row>
                <Col md="8" lg="6" className="mx-auto">
                <Card className="login-card">
                <Form onSubmit={handleSubmit}>
                    <h3 className="title text-center">Create a new User </h3>
                    <p className="error-message-label"> {errorMsg} </p>                   
                    <Label> Username </Label>
                    <InputGroup className="form-group-no-border">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <FontAwesomeIcon icon="user-circle"></FontAwesomeIcon>
                            </InputGroupText>
                        </InputGroupAddon>
                       
                        <Input type="text" placeholder="Username" className="form-control" value={username} onChange={e => setUsername(e.target.value)} required/>
                    </InputGroup>

                    <Label> Email </Label>
                    <InputGroup className="form-group-no-border">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <FontAwesomeIcon icon="envelope"></FontAwesomeIcon>
                            </InputGroupText>
                        </InputGroupAddon>
                       
                        <Input type="text" placeholder="Email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required/>
                    </InputGroup>

                    <Label> Role </Label>
                    <InputGroup className="form-group-no-border">
                        {/* <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <FontAwesomeIcon icon="envelope"></FontAwesomeIcon>
                            </InputGroupText>
                        </InputGroupAddon> */}
                       
                        <Input type="select" name="rolesSelect" onChange={ e => setRole(e.target.value) } value={role} >
                            {
                                roles.map((role, index) => {
                                    return <option value = {role} key={index}> {role} </option>
                                })
                            }
                        </Input>
                    </InputGroup>

                    <Label> Password </Label>
                    <InputGroup className="form-group-no-border">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <FontAwesomeIcon icon="lock"></FontAwesomeIcon>
                            </InputGroupText>
                        </InputGroupAddon>
                        
                        <Input type="password" placeholder="Password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required/>
                    </InputGroup>
                   <Input type="submit" value="Create new User" className="btn btn-round btn-warning"></Input>
                </Form>
            </Card>
                </Col>
            </Row>
           

        </Container>

        </>
    )

}

export default CreateUsers;