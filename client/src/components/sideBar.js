import React, { Component } from 'react';
import {Navbar, Button, Nav} from 'react-bootstrap';
import GetGroups from './getGroups';


class SideBar extends Component{
  constructor(props){
    super(props)
  }
  render(){
    return (
      <React.Fragment>
        <div>
          <GetGroups/>
        </div>
    </React.Fragment>
    )
  }
}

export default SideBar
