import React from 'react';
import TopBar from './components/topBar';
import SideBar from './components/sideBar';
import './App.css';
import MainBox from './components/mainBox';
import LoginModal from './components/login';
import { getUser } from './redux/reducers/users';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class App extends React.Component {
//  const showRecommendations = useSelector(state => state.recommendations);
  //const dispatch = useDispatch();
  constructor(props) {
      super(props);
  }



  render() {
    const {user} = this.props;
    return (
      <div className="App">
        { this.props.user.active == "true" || this.props.user.length != 0 ?
          <div>
              <div className="colorTopBar">
              <TopBar/>
              </div>
                <div className="row">
                    <div className="col-3 propertiesSideBar ">
                      <SideBar/>
                    </div>
                    <div className="col-9">
                      <MainBox/>
                    </div>
                </div>

          </div>
        : <LoginModal/>}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: getUser(state)
})

export default connect(
    mapStateToProps,
)(App );
