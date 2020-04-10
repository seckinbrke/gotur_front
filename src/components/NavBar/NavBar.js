/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavBar.css';
import { Navbar, Nav } from 'react-bootstrap';
import icon from '../../img/gotur.png'
import { history } from '../../App';

const Headers = () => {
    const [name, setName] = useState("");
    //const [userInfo, setUserInfo] = useState([]);
    useEffect(() => {
        let userInformation = JSON.parse(localStorage.getItem('userInformation'));
      // setUserInfo(userInformation)
        setName(userInformation[0] === undefined ? "" : userInformation[0].USER.name + ' ' + userInformation[0].USER.surname)
    })
/*
    const checkLogin = () => {
        if (userInfo.length !== 0) {
            return (
                <Nav className="mr-auto">
                    <Nav.Link >
                        <span onClick={() => history.push({ pathname: "/anasayfa" })} className="pages">anasayfa</span>
                    </Nav.Link>
                    <Nav.Link >
                        <span className="pages">admin</span>
                    </Nav.Link>
                    <Nav.Link >
                        <span className="pages">{name}</span>
                    </Nav.Link>
                    <Nav.Link >
                        <span className="pages">çıkış</span>
                    </Nav.Link>
                </Nav>
            )
        } else {
            return (
                <Nav className="mr-auto">
                    <Nav.Link >
                        <span onClick={() => history.push({ pathname: "/anasayfa" })} className="pages">anasayfa</span>
                    </Nav.Link>
                </Nav>
            )
        }
    }*/


    return (
        <Navbar collapseOnSelect expand="lg" className='navBar'>
            <Navbar.Brand>
                <span className="brandText" >götür</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link >
                        <span onClick={() => history.push({ pathname: "/anasayfa" })} className="pages">anasayfa</span>
                    </Nav.Link>
                    <Nav.Link >
                        <span className="pages">admin</span>
                    </Nav.Link>
                    <Nav.Link >
                        <span className="pages">çıkış</span>
                    </Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link >
                        <img className="icon" src={icon} alt="" />
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
export default Headers;