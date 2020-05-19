import React, { Component } from 'react';
import {Navbar, Button, Nav} from 'react-bootstrap';
import { GoogleLogout } from 'react-google-login';
import LoginModal from './login';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { getUser } from '../redux/reducers/users';
import { fetchUpdateUser } from '../redux/fetchUsers';


class TopBar extends Component{
  constructor(props){
    super(props)
  }


  logout = () => {
    console.log("logout user:", this.props.user);
    const {fetchUpdateUser} = this.props;
    fetchUpdateUser(this.props.user.email, this.props.user.name, "false", this.props.user.imageURL);
  };

  render(){
    const {user} = this.props;

    return (
      <React.Fragment>
          <Navbar expand="lg" className="nav-item">
            <Navbar.Brand href="#home" className="text-white">RecommendMe</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
              </Nav>
<<<<<<< HEAD
              <Navbar.Brand href="#installningar">Settings</Navbar.Brand>
=======
              <Navbar.Brand href="#installningar" className="text-white">Settings</Navbar.Brand>
>>>>>>> fb207463701a24302297bc5b671431a33e25cefb
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
const mapDispatchToProps = dispatch => bindActionCreators({
  fetchUpdateUser: fetchUpdateUser
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TopBar );
