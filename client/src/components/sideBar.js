import React, { Component } from 'react';
import GetGroups from './getGroups';
import Button from "react-bootstrap/Button";


class SideBar extends Component{
  constructor(props){
    super(props)
  }
  render(){
    return (
      <React.Fragment>
        <div className="createGroupText">

          <p> Create group</p>
        </div>
        <div>
          <GetGroups/>
        </div>
    </React.Fragment>
    )
  }
}

export default SideBar
