import React, { useState } from "react";
import {
    Container, Row, Col, Card,  Input, Form, Label, InputGroup, InputGroupAddon, InputGroupText
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from '../components/header';
import history from '../history';

function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorMsg, setErrorMsg] = useState('');

    const API_BASE = process.env.REACT_APP_API_BASE;

    // function validateForm() {
    //     return email.length > 0 && password.length > 0;
    // }

    function handleSubmit(event) {
        event.preventDefault();

        fetch(API_BASE + '/user/authenticate', {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {
                'Content-Type': 'application/json'
            } 
        }).then(res => {
            console.log(res)
            if(res.status === 200){
                history.push('/DataUpload');
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
                    <h3 className="title text-center">Login to the Data Upload Dashboard </h3>
                    <p className="error-message-label"> {errorMsg} </p>                   
                    <Label> Email </Label>
                    <InputGroup className="form-group-no-border">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <FontAwesomeIcon icon="envelope"></FontAwesomeIcon>
                            </InputGroupText>
                        </InputGroupAddon>
                       
                        <Input type="text" placeholder="Email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required/>
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
                   <Input type="submit" value="Log in" className="btn btn-round btn-warning"></Input>
                </Form>

                <Link to="/DataUpload" className="btn-link btn-warning forgot-password-link">Forgot Password? </Link>
            </Card>
                </Col>
            </Row>
           

        </Container>

        </>
    )

}

export default Login;