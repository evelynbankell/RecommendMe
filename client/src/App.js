import React from 'react';
import TopBar from './components/topBar';
import SideBar from './components/sideBar';
import './App.css';
import MainBox from './components/mainBox';
import Users from './components/user';

import GoogleLogin from 'react-google-login';
import { GoogleLogout } from 'react-google-login';


class App extends React.Component {
//  const showRecommendations = useSelector(state => state.recommendations);
  //const dispatch = useDispatch();

  render() {
    return (
      <div className="App">
        <div className="colorTopBar">
        <TopBar/>
        </div>
          <div className="row">
              <div className="col-3 propertiesSideBar ">
                <SideBar/>
              </div>
              <div className="col-9">
              <MainBox/>
              <LoginModal />
              </div>
          </div>
      </div>
    )
  }
}


class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.responseGoogleOnSuccess = this.responseGoogleOnSuccess.bind(this);
    this.responseGoogleOnFailure = this.responseGoogleOnFailure.bind(this);
  }

  responseGoogleOnSuccess (response) {
    console.log("GoogleOnSuccess", response.profileObj);
    //this.props.handleLoginSuccess(response.profileObj);
  }

  responseGoogleOnFailure (response) {
    console.log("GoogleOnFailure", response);
  }

  render() {
    //const showHideClassName = this.props.show_login ? "modal display-block" : "modal display-none";
    return (
      <div>
        <section className="modal-main">
          <div className="card titleSignIn">
            <div className="card-body">
              <p className="text mt-5">Welcome to RecommendMe</p>
              <p className="lead">Please, sign in with your google account</p>
              {this.props.children}
              <div className="SignInButton">
                <GoogleLogin
                   clientId="1055370208996-0gh5pa9edlb3vcedlgor856pdgc1n7cm.apps.googleusercontent.com"
                   onSuccess={this.responseGoogleOnSuccess}
                   onFailure={this.responseGoogleOnFailure}
                   cookiePolicy={'single_host_origin'}
                   isSignedIn
                 >
                </GoogleLogin>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
};

export default App;
