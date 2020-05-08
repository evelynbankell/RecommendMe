import React, { Component } from 'react';
import GetGroups from './getGroups';
import AddGroup from './addGroup';
import { connect } from 'react-redux';
import {getGroupsError, getGroupsPending, getGroups, getGroup} from '../redux/reducers/groups';


class SideBar extends Component{
  constructor(props){
    super(props);
  }

  handleAddGroup = () => {
    console.log("TEST");
  };

  render(){
    const {groups, current_group} = this.props;
    return (
      <React.Fragment>
        <div className="createGroupText">

          <p> Create group</p>
        </div>
        <div>
          <AddGroup />
          <GetGroups/>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  error: getGroupsError(state),
  groups: getGroups(state),
  current_group: getGroup(state),
  pending: getGroupsPending(state)
})


export default connect(
    mapStateToProps
)(SideBar );
