import React from 'react';
import TopBar from './components/topBar';
import SideBar from './components/sideBar';
import './App.css';
import MainBox from './components/mainBox';
import ChatPanel from './components/chatPanel';
import LoginModal from './components/login';
import { fetchAddUser, fetchUpdateUser } from './redux/fetchUsers';
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
        <LoginModal/>
          <div>
              <div className="colorTopBar">
              <TopBar/>
              </div>
                <div className="row">
                    <div className="col-2 propertiesSideBar ">
                      <SideBar/>
                    </div>
                    <div className="col-3">
                      <ChatPanel/>
                    </div>
                    <div className="col-6">
                      <MainBox/>
                    </div>
                </div>

          </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: getUser(state)
})
const mapDispatchToProps = dispatch => bindActionCreators({
  fetchAddUser: fetchAddUser,
  fetchUpdateUser: fetchUpdateUser
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App );
