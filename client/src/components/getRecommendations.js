import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchRecommendations, fetchGroupRecommendations } from '../redux/fetchRecommendations';
import {getProductsError, getProductsPending, getGroupRecommendations, getRecommendationGroup} from '../redux/reducers/recommendations';
//import {getRecommendations} from '../redux/actions';
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

  componentDidMount() {
      const {fetchGroupRecommendations} = this.props;
      fetchGroupRecommendations(this.props.current_group.id);
  }

  render() {
    const {recommendations_current_group, current_group, error, pending} = this.props;

    return (
        <React.Fragment>
            {this.props.current_group.id
              ? recommendations_current_group.map((recommendation, index) => {
                if (recommendation.groupId == this.props.current_group.id)
                  return <TableBody key={`recommendation-${recommendation.id}`} recommendation={recommendation} />;
                })
              : "No recommendations"}

        </React.Fragment>
    )
  }
}



const mapStateToProps = state => ({
    error: getProductsError(state),
    recommendations_current_group: getGroupRecommendations(state),
    recommendationsGroup: getRecommendationGroup(state),
    current_group: getGroup(state),
    pending: getProductsPending(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchRecommendations: fetchRecommendations,
    fetchGroupRecommendations: fetchGroupRecommendations
}, dispatch)


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GetRecommendations );
