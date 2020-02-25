import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavBar.css';
import { Navbar, NavDropdown, Nav } from 'react-bootstrap';
import icon from '../../img/gotur.png'
import { history } from '../../App';

export default Headers = () => {
    return (
        <Navbar collapseOnSelect expand="lg" className='navBar'>
            <Navbar.Brand href="#home">
                <span onClick={()=> history.push({ pathname: "/"})} className="brandText" >götür</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link >
                        <span onClick={()=> history.push({ pathname: "/"})} className="pages">anasayfa</span>
                    </Nav.Link>
                    <Nav.Link >
                        <span onClick={()=> history.push({ pathname: "/"})} className="pages">çıkış</span>
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