import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import {fetchGroupRecommendations} from '../redux/fetchRecommendations';
import { fetchOneGroup, fetchGroups } from '../redux/fetchGroups';
import {getGroupsError, getGroupsPending, getGroups, getGroup} from '../redux/reducers/groups';
import {getRecommendations} from '../redux/reducers/recommendations';
import GetRecommendations from './getRecommendations';
import AddRecommendation from './addRecommendation';

class ShowGroups extends React.Component {
  constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (group) => {
    this.props.handleGroup(group);
  };

  render() {
    return (
      <p onClick={() => this.handleClick(this.props.value)}>
        {this.props.value.title}
      </p>
    )
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

  handleGroup = (group) => {
      const current_group = group;
      const {fetchOneGroup} = this.props;
      fetchOneGroup(current_group.id);
      const {fetchGroupRecommendations} = this.props;
      fetchGroupRecommendations(current_group.id);
  };

  componentDidMount() {
    const {fetchGroups} = this.props;
    fetchGroups();
  }


  render() {
    const {groups, error, pending, current_group} = this.props;
    const rows = this.props.groups;

    return (
      <React.Fragment>
        <div className= "groupTextLeftSideBar">
          <ul>
            {rows.map((row) =>
                <ShowGroups key={row.id} value={row} handleGroup={(group) => {this.handleGroup(group)}}/>
              )}
          </ul>
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
    fetchOneGroup: fetchOneGroup,
    fetchGroupRecommendations: fetchGroupRecommendations
}, dispatch)


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GetGroups );
