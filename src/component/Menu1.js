import React, { Component } from 'react'
import {Navbar, Nav} from 'react-bootstrap'
//import {Button} from 'react-bootstrap'
export default class Menu1 extends Component {
    render() {
        const dd={
            marginLeft:'50px',
            fontFamily:'Poppins',
            fontWeight:'bold'
        }
        return (
            <Navbar bg="light" expand="lg" className="sticky-top">
                <Navbar.Brand href="#home" style={dd}>ROXANDREA</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto" style={{marginLeft:'200px'}}>
                    <Nav.Link href="/" style={dd}>Home</Nav.Link>
                    {/* <Nav.Link href="bookroom" style={dd}>BookRoom</Nav.Link> */}
                    <Nav.Link href="rooms" style={dd}>Rooms</Nav.Link>
                    {/* <Nav.Link href="restaurant" style={dd}>Restaurant</Nav.Link> */}
                    <Nav.Link href="about" style={dd}>About</Nav.Link>
                    <Nav.Link href="contact" style={dd}>Contact</Nav.Link>
                    {/* <Nav.Link href="cart" style={dd}><i className="fas fa-shopping-cart" style={{fontSize:'20pt'}}></i></Nav.Link> */}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
