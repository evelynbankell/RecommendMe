import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Navbar, Button, Nav} from 'react-bootstrap';
import GetGroups from './getGroups';
import GetRecommendations from './getRecommendations';
import AddRecommendation from './addRecommendation';
import {getRecommendations} from '../redux/reducers/recommendations';
import {getGroupsError, getGroupsPending, getGroups, getGroup} from '../redux/reducers/groups';


class MainBox extends Component{
  constructor(props){
    super(props)
  }
  render(){
      const {groups, error, pending, current_group} = this.props;
    return (
      <React.Fragment>
        <div>
          <p>
          {this.props.current_group.id
            ? <GetRecommendations current_group={this.props.current_group}/>
            : "No recommendations"}
            <AddRecommendation current_group={this.props.current_group}/>
          </p>
        </div>
    </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  error: getGroupsError(state),
  groups: getGroups(state),
  current_group: getGroup(state),
  recommendations: getRecommendations(state),
  pending: getGroupsPending(state)
})


export default connect(
    mapStateToProps
)(MainBox );
