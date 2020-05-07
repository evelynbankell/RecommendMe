import React, { Component } from 'react';
import {Navbar, Button, Nav} from 'react-bootstrap';


class TopBar extends Component{
  constructor(props){
    super(props)
  }
  render(){
    return (
      <React.Fragment>
      <Navbar expand="lg">
        <Navbar.Brand href="#home">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
          </Nav>
          <Navbar.Brand href="#installningar">Inställningar</Navbar.Brand>
          <Navbar.Brand href="#logga-in">Logga in</Navbar.Brand>
        </Navbar.Collapse>
      </Navbar>
    </React.Fragment>
    )
  }
}

export default TopBar
