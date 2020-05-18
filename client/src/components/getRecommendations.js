import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {getRecommendationsError, getRecommendationsPending, getGroupRecommendations, getRecommendationGroup} from '../redux/reducers/recommendations';
import {getGroup} from '../redux/reducers/groups';
import { getUser } from '../redux/reducers/users';


const TableBody = ({ recommendation }) => (
  <div className="row text-center border-bottom p-3">

    <div className="col-12">
      {recommendation.createdDate ?
        <small>Date: {recommendation.createdDate}</small>
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
      {recommendation.source ?
        <p className="m-0 p-0"><strong>Where:</strong> {recommendation.source}</p>
      : "" }
    </div>
    <div className="col-12">
      {recommendation.year ?
        <p className="m-0 p-0"><strong>Year:</strong> {recommendation.year}</p>
      : "" }
    </div>
    <div className="col-12">
      {recommendation.who ?
        <p className="m-0 p-0"><strong>Made by who:</strong> {recommendation.who}</p>
      : "" }
    </div>
    <div className="col-12">
      {recommendation.rate ?
        <p className="m-0 p-0"><strong>Rating:</strong> {recommendation.rate}</p>
      : "" }
    </div>
    <div className="col-12">
      {recommendation.imageUrl ?
        <p className="m-0 p-0"><strong>Image:</strong> {recommendation.imageUrl}</p>
      : "" }
    </div>
  </div>

);


class GetRecommendations extends React.Component {
  constructor(props) {
      super(props);
  }


  render() {
    const {recommendations_current_group, current_group, error, pending, user} = this.props;

    return (
        <React.Fragment>
          <div className="">
            <div className="container">
                {this.props.current_group.id
                  ? recommendations_current_group.map((recommendation, index) => {
                    if (this.props.current_group.id === recommendation.groupId)
                      return <TableBody key={`recommendation-${recommendation.id}`} recommendation={recommendation} />;
                    })
                  : "No recommendations"}
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



export default connect(
    mapStateToProps
)(GetRecommendations );
