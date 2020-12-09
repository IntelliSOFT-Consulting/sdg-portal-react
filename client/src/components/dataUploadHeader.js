import React from "react";
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import axios from 'axios';
import { Navbar, Nav, Button } from "reactstrap";
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory({forceRefresh:true});
// reactstrap components


function dataUploadHeader (){
    const API_BASE = process.env.REACT_APP_API_BASE;

    const handleLogoutBtn = () => {
        axios.get(API_BASE + '/user/logout')
        .then(res => {
            if(res.status === 200){
                localStorage.removeItem("user");
                localStorage.clear();
                history.push('/sdgportalreact/Login');
            }else{
                const error = new Error(res.error);
                console.log(error);
                //throw error;
            }

        }).catch(error => {
            console.log(error.res);
            //alert('Error logging in, please try again.')
        })
    }
        return (
            <> 
            <header className="header-global country-profile-header">
                <Navbar>
                <Link to="/" className="navbar-brand">
                        <img alt="..." src={require("../assets/img/brand/logo.png")}></img>
                    </Link>
                    <Nav className="country-profile-title">
                    <h5 className="display-3 mb-4 mt-2 text-center"> Data Upload Dashboard</h5>
                    </Nav>
                    
                    <Menu right>
                        <Link to="/" className="text-white">HOME</Link> 
                        <Link to="/DataUpload" className="text-white">DATA DASHBOARD</Link>
                        <Link to="/Users" className="text-white">VIEW USERS</Link>
                        <Link to="/CreateUsers" className="text-white">CREATE USERS</Link>
                        <Button className="btn-link btn-warning" onClick={handleLogoutBtn}>LOGOUT</Button>
                    </Menu>
                </Navbar>
            </header> 
          
            </>
        );
}

export default dataUploadHeader;