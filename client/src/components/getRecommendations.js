//allows user to input a recommendation


//import { addRecommendation } from "../redux/actions";


import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import fetchRecommendations from '../redux/fetchRecommendations';
import {getProductsError, getProductsPending, getRecommendations} from '../redux/reducers/recommendations';
//import {getRecommendations} from '../redux/actions';



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
    const {recommendations, error, pending} = this.props;
    console.log("length", recommendations.length);

    return (
        <div>
          <ul>
          {recommendations && recommendations.length
            ? recommendations.map((recommendation, index) => {
                return <TableBody key={`recommendation-${recommendation.id}`} recommendation={recommendation} />;
              })
            : "No recommendations"}
          </ul>
          <button onClick={this.handleGetRecommendations}>Get recommendations</button>
        </div>
    )
  }
}

/*
{recommendations && recommendations.length
  ? recommendations.map((recommendation, index) => {
      return <TableBody key={`recommendation-${recommendation.id}`} recommendation={recommendation} />;
    })
  : "No recommendations"}
  */

const mapStateToProps = state => ({
    error: getProductsError(state),
    recommendations: getRecommendations(state),
    pending: getProductsPending(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchRecommendations: fetchRecommendations
}, dispatch)


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GetRecommendations );
