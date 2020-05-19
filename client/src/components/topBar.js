import React, { Component } from 'react';
import {Navbar, Button, Nav} from 'react-bootstrap';
import { GoogleLogout } from 'react-google-login';
import LoginModal from './login';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { getUser } from '../redux/reducers/users';


class TopBar extends Component{
  constructor(props){
    super(props)
  }


  logout = () => {
    console.log("logout user:");
    this.props.user.active = "false";
    console.log("logout user:", this.props.user);

  };

  render(){
    const {user} = this.props;

    return (
      <React.Fragment>
          <Navbar expand="lg">
            <Navbar.Brand href="#home">Home</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
              </Nav>
              <Navbar.Brand href="#installningar">Settings</Navbar.Brand>
            </Navbar.Collapse>

            <GoogleLogout
              clientId="1055370208996-0gh5pa9edlb3vcedlgor856pdgc1n7cm.apps.googleusercontent.com"
              buttonText="Logout"
              onLogoutSuccess={this.logout}
            >
            </GoogleLogout>

          </Navbar>
    </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  user: getUser(state)
})

export default connect(
    mapStateToProps,
)(TopBar );
