import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import {fetchGroupRecommendations} from '../redux/fetchRecommendations';
import { fetchOneGroup, fetchGroups } from '../redux/fetchGroups';
import { fetchGroupChatPosts } from '../redux/fetchChatPosts';
import { hideShowComponent } from '../redux/actions/groupActions';
import {getGroups, getGroup, showComponent} from '../redux/reducers/groups';
import { getUser } from '../redux/reducers/users';
import {getRecommendations} from '../redux/reducers/recommendations';

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
      <p className="group-title" onClick={() => this.handleClick(this.props.value)}>
        {this.props.value.title}
      </p>
    )
  }
}

class GetGroups extends React.Component {
  constructor(props) {
      super(props);
  }

  handleGroup = (group) => {
      const current_group = group;
      const {fetchOneGroup, hideShowComponent} = this.props;
      hideShowComponent();
      fetchOneGroup(current_group.id);
      const {fetchGroupRecommendations} = this.props;
      fetchGroupRecommendations(current_group.id);
      const {fetchGroupChatPosts} = this.props;
      fetchGroupChatPosts(current_group.id);
  };

  componentDidMount() {
    const {fetchGroups} = this.props;
    fetchGroups();
  }

  render() {
    const {groups, current_group, user, show_component} = this.props;
    const rows = this.props.groups;

    return (
      <React.Fragment>
        <div className= "">
          <ul className="p-0">
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
  groups: getGroups(state),
  user: getUser(state),
  current_group: getGroup(state),
  recommendations: getRecommendations(state),
  show_component: showComponent(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchGroups: fetchGroups,
    fetchOneGroup: fetchOneGroup,
    fetchGroupRecommendations: fetchGroupRecommendations,
    hideShowComponent: hideShowComponent,
    fetchGroupChatPosts: fetchGroupChatPosts
}, dispatch)


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GetGroups );
