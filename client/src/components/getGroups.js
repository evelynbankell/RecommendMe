//allows user to input a recommendation

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import {testFetchRecommendations} from '../redux/fetchRecommendations';
import { fetchGroups } from '../redux/fetchGroups';
import { fetchOneGroup } from '../redux/fetchGroups';
import {getGroupsError, getGroupsPending, getGroups, getGroup} from '../redux/reducers/groups';
import {getRecommendations} from '../redux/reducers/recommendations';
import GetRecommendations from './getRecommendations';


class ShowOneGroup extends React.Component {
  constructor(props) {
      super(props);
  }
    render() {
      return (
        <p>{this.props.current_group.title}</p>
      )
    }
}

class ShowGroups extends React.Component {
  constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (id) => {
    //this.current_group = group;
    this.props.handleGroup(id);
  };

  render() {
      if (this.props.groups && this.props.groups.length) {
      const rows = this.props.groups.map((row, index) => {
        return (
            <ul>
            <li onClick={() => this.handleClick(row.id)}>
              {row.title}
            </li>
            </ul>
        )
      })
      return rows
    }
    return null
  }
}





class GetGroups extends React.Component {
  constructor(props) {
      super(props);
  }

  handleGetGroup = () => {
    const {fetchGroups} = this.props;
    fetchGroups();
  };

  handleGroup = (id) => {
      const new_id = id.toString();
      const {fetchOneGroup} = this.props;
      fetchOneGroup(new_id);
  };

  componentDidMount() {
    const {fetchGroups} = this.props;
    fetchGroups();
  }


  render() {
    const {groups, error, pending, current_group} = this.props;

    return (

      <React.Fragment>
        <div>
            <ShowGroups groups={this.props.groups} handleGroup={(group) => {this.handleGroup(group)}}/>
            <ShowOneGroup current_group={current_group} groups={this.props.groups}/>
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

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchGroups: fetchGroups,
    fetchOneGroup: fetchOneGroup
}, dispatch)


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GetGroups );
