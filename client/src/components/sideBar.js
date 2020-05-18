import React, { Component } from 'react';
import GetGroups from './getGroups';
import AddGroup from './addGroup';
import LoginModal from './login';
import { connect } from 'react-redux';
import {getGroupsError, getGroupsPending, getGroups, getGroup} from '../redux/reducers/groups';
import { getUser } from '../redux/reducers/users';

class SideBar extends Component{
  constructor(props){
    super(props);
  }

  handleAddGroup = () => {
    console.log("TEST");
  };

  render(){
    const {groups, current_group, user} = this.props;
    return (
      <React.Fragment>
        <div className="createGroupText">
        </div>

          <div>
            <AddGroup />
            <GetGroups />

        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  error: getGroupsError(state),
  groups: getGroups(state),
  user: getUser(state),
  current_group: getGroup(state),
  pending: getGroupsPending(state)
})


export default connect(
    mapStateToProps
)(SideBar );
