import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { fetchUser, fetchAddUser } from '../redux/fetchUsers';
import { getUser } from '../redux/reducers/users';

import GoogleLogin from 'react-google-login';
import { GoogleLogout } from 'react-google-login';


class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.responseGoogleOnSuccess = this.responseGoogleOnSuccess.bind(this);
    this.responseGoogleOnFailure = this.responseGoogleOnFailure.bind(this);
  }


  responseGoogleOnSuccess (response) {
    console.log("Google LogIn", response.profileObj);
    const {fetchUser} = this.props;
    fetchUser(response.profileObj.email);

    if (this.props.user.length!=0) {
      console.log("user found: ", this.props.user);
    } else {
      console.log("user  not found: ");
      const {fetchAddUser} = this.props;
      fetchAddUser(response.profileObj.email, response.profileObj.name, response.profileObj.imageUrl);
    }
  }

  responseGoogleOnFailure (response) {
    console.log("GoogleOnFailure", response);
  }

  render() {
    const {error, pending, user} = this.props;
    console.log("USER", user);


    return (
        <div>
        <div className="modal display-block">
          <section className="modal-main">
            <div className="card titleSignIn">
              <div className="card-body">
                <p className="text mt-5">Welcome to RecommendMe</p>
                <p className="lead">Please, sign in with your google account</p>
                <div className="SignInButton">
                  <GoogleLogin
                     clientId="1055370208996-0gh5pa9edlb3vcedlgor856pdgc1n7cm.apps.googleusercontent.com"
                     onSuccess={this.responseGoogleOnSuccess}
                     onFailure={this.responseGoogleOnFailure}
                     cookiePolicy={'single_host_origin'}
                     isSignedIn={true}
                   >
                  </GoogleLogin>
                </div>
              </div>
            </div>
          </section>
          </div>
        </div>


    );
  }
};


const mapStateToProps = state => ({
  user: getUser(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchUser: fetchUser,
  fetchAddUser: fetchAddUser
}, dispatch)


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginModal );
