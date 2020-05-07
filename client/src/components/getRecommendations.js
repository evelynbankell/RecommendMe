import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchRecommendations } from '../redux/fetchRecommendations';
import {getRecommendationsError, getRecommendationsPending, getGroupRecommendations, getRecommendationGroup} from '../redux/reducers/recommendations';
import {getGroup} from '../redux/reducers/groups';


const TableBody = ({ recommendation }) => (
  <li>
    <span>
      {recommendation.category}
    </span>
    &nbsp;
    <span>
      {recommendation.title}
    </span>
  </li>
);

class GetRecommendations extends React.Component {
  constructor(props) {
      super(props);
  }

  handleGetRecommendations = () => {
    const {fetchRecommendations} = this.props;
    fetchRecommendations();
  };

  render() {
    const {recommendations_current_group, current_group, error, pending} = this.props;
    console.log("current", current_group);
    console.log("recommendations_current_group", recommendations_current_group);

    return (
        <React.Fragment>
            {this.props.current_group.id
              ? recommendations_current_group.map((recommendation, index) => {
                if (this.props.current_group.id === recommendation.groupId)
                  return <TableBody key={`recommendation-${recommendation.id}`} recommendation={recommendation} />;
                })
              : "No recommendations"}

        </React.Fragment>
    )
  }
}


const mapStateToProps = state => ({
    error: getRecommendationsError(state),
    recommendations_current_group: getGroupRecommendations(state),
    recommendationsGroup: getRecommendationGroup(state),
    current_group: getGroup(state),
    pending: getRecommendationsPending(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchRecommendations: fetchRecommendations
}, dispatch)


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GetRecommendations );
