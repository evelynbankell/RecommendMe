import React from 'react';
import './App.css';
import TopBar from './components/topBar';
import SideBar from './components/sideBar';
import MainBox from './components/mainBox';
import ChatPanel from './components/chatPanel';
import LoginModal from './components/login';


class App extends React.Component {
  constructor(props) {
      super(props);
  }

  render() {
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
              <div className="col-7">
                <MainBox/>
              </div>
            </div>
         </div>
      </div>
    )
  }
}

export default App;
