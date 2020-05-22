import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchDeleteRecommendation, fetchGroupRecommendations } from '../redux/fetchRecommendations';
import {getRecommendationsError, getRecommendationsPending, getGroupRecommendations, getRecommendationGroup} from '../redux/reducers/recommendations';
import {getGroup} from '../redux/reducers/groups';
import { getUser } from '../redux/reducers/users';

class TableBody extends React.Component {
  constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (groupid, recommendation_id) => {
    this.props.handleDelete(groupid, recommendation_id);
  };

  render() {
    const {recommendation, current_group, user} = this.props;
    return (
      <ul>
      <div className="row text-center border-bottom p-3">
        <div className="col-12">
          { recommendation.createdBy === user.name ?
          <small className="delete-group float-right p-0" onClick={() => this.handleClick(this.props.current_group.id, this.props.recommendation.id)}>
            Delete Recommendation
          </small>
        : ""}
        </div>
        <div className="col-12">
          {recommendation.createdDate ?
            <small className="pt-0">Date: {recommendation.createdDate}</small>
          : ""}
        </div>
        <div className="col-12">
          <p className="m-0 p-0"><strong>Title:</strong> {recommendation.title}</p>
        </div>
        <div className="col-12">
          <p className="m-0 p-0"><strong>Category:</strong> {recommendation.category}</p>
        </div>
        <div className="col-12">
          {recommendation.description ?
            <p className="m-0 p-0"><strong>Description:</strong> {recommendation.description}</p>
          : "" }
        </div>
        <div className="col-12">
          {recommendation.source != "undefined" ?
            <p className="m-0 p-0"><strong>Where:</strong> {recommendation.source}</p>
          : "" }
        </div>
        <div className="col-12">
          {recommendation.year != "undefined" ?
            <p className="m-0 p-0"><strong>Year:</strong> {recommendation.year}</p>
          : "" }
        </div>
        <div className="col-12">
          {recommendation.comment != "undefined" ?
            <p className="m-0 p-0"><strong>Comment:</strong> {recommendation.comment}</p>
          : "" }
        </div>
        <div className="col-12">
          {recommendation.who != "undefined" ?
            <p className="m-0 p-0"><strong>Made by who:</strong> {recommendation.who}</p>
          : "" }
        </div>
        <div className="col-12">
          {recommendation.rate != "undefined" ?
            <p className="m-0 p-0"><strong>Rating:</strong> {recommendation.rate}</p>
          : "" }
        </div>
        <div className="col-12">
          {recommendation.imageUrl ?
            <p className="m-0 p-0"><img src= {recommendation.imageUrl} alt="" width="220" /> </p>
          : "" }
        </div>
      </div>
      </ul>
    )
  }
}


class GetRecommendations extends React.Component {
  constructor(props) {
      super(props);
  }

  handleDelete = (group_id, rec_id) => {
    const {fetchDeleteRecommendation} = this.props;
    fetchDeleteRecommendation(group_id, rec_id);
    const {fetchGroupRecommendations} = this.props;
    fetchGroupRecommendations(group_id);

  };


  render() {
    const {recommendations_current_group, current_group, error, pending, user} = this.props;

    return (
        <React.Fragment>
          <div className="">
            <div className="container float-left">
          <div className="table-wrapper-scroll-y posts-scrollbar">
                {this.props.current_group.id
                  ? recommendations_current_group.map((recommendation, index) => {
                    if (this.props.current_group.id === recommendation.groupId)
                      return <TableBody key={`recommendation-${recommendation.id}`} recommendation={recommendation}
                      current_group={this.props.current_group} user={this.props.user} handleDelete={(group, recommendation) => {this.handleDelete(group, recommendation)}}/>;
                    })
                  : "No recommendations"}
                  </div>
              </div>
            </div>
        </React.Fragment>
    )
  }
}


const mapStateToProps = state => ({
    error: getRecommendationsError(state),
    recommendations_current_group: getGroupRecommendations(state),
    recommendationsGroup: getRecommendationGroup(state),
    current_group: getGroup(state),
    user: getUser(state),
    pending: getRecommendationsPending(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchGroupRecommendations: fetchGroupRecommendations,
    fetchDeleteRecommendation: fetchDeleteRecommendation
}, dispatch)



export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GetRecommendations );
