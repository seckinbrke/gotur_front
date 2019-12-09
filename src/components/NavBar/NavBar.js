import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavBar.css';
import { Navbar, NavDropdown, Nav } from 'react-bootstrap';
import icon from '../../img/gotur.png'

export default Headers = () => {
    return (
        <Navbar collapseOnSelect expand="lg">
            <Navbar.Brand href="#home">
                <span className="brandText">götür</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#pricing">
                        <span className="pages">anasayfa</span>
                    </Nav.Link>
                    <Nav.Link href="#features">
                        <span className="pages">kategoriler</span>
                    </Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link href="#deets">
                        <img className="icon" src={icon} alt="" />
                    </Nav.Link>

                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )

}