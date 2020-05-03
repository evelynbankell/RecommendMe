//allows user to input a recommendation


//import { addRecommendation } from "../redux/actions";


import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import fetchProducts from '../redux/fetchRecommendations';
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




class AddRecommendation extends React.Component {
  constructor(props) {
      super(props);
  }


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



export default connect(
    mapStateToProps
)(AddRecommendation );
