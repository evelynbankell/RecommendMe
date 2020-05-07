import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchAddRecommendation } from '../redux/fetchRecommendations';
import {getRecommendations, getRecommendationsError, getRecommendationsPending} from '../redux/reducers/recommendations';
import {getGroup} from '../redux/reducers/groups';


class AddRec extends React.Component {
  constructor(props) {
      super(props);
      this.onFormSubmit = this.onFormSubmit.bind(this);
  }

   onFormSubmit(val) {
    this.props.handleNewRec(this.category, this.title, this.description, this.rate, this.source, this.who, this.year);
  }

  //Not the best solution -> Try to make this prettier
  handleChangeTitle = event => {
    const { name, value } = event.target;
    this.title = value;
  }

  handleChangeCategory = event => {
    const { name, value } = event.target;
    this.category = value;
  }

  handleChangeDescription = event => {
    const { name, value } = event.target;
    this.description = value;
  }

  handleChangeRate = event => {
    const { name, value } = event.target;
    this.rate = value;
  }

  handleChangeSource = event => {
    const { name, value } = event.target;
    this.source = value;
  }

  handleChangeWho = event => {
    const { name, value } = event.target;
    this.who = value;
  }

  handleChangeYear = event => {
    const { name, value } = event.target;
    this.year = value;
  }


  render() {
    const { category, title, description, rate, source, who, year, recommendations } = this.props;
    return (
      <form onSubmit={this.onFormSubmit}>
          <p>CREATE NEW RECOMMENDATION:</p>
            <label name="category" type="text" label="Category">Category: </label>
            <input
            type="string"
            name="category"
            id="name"
            placeholder="Enter a category"
            value={category}
            onChange={this.handleChangeCategory}
            />

            <label name="title" type="text" label="Title">Title: </label>
            <input
            type="string"
            name="title"
            id="name"
            placeholder="Enter a title"
            value={title}
            onChange={this.handleChangeTitle}
            />

            <label name="description" type="text" label="Description">Description: </label>
            <input
            type="text"
            name="description"
            id="name"
            placeholder="Enter a description"
            value={description}
            onChange={this.handleChangeDescription}
            />

            <label name="rate" type="text" label="Rate">Rating: </label>
            <input
            type="integer"
            name="rate"
            id="name"
            placeholder="Enter a number 0-5"
            value={rate}
            onChange={this.handleChangeRate}
            />

            <label name="source" type="text" label="Source">Source: </label>
            <input
            type="string"
            name="source"
            id="name"
            placeholder="Where"
            value={source}
            onChange={this.handleChangeSource}
            />

            <label name="who" type="text" label="Who">Who: </label>
            <input
            type="string"
            name="who"
            id="name"
            placeholder="Who made it?"
            value={who}
            onChange={this.handleChangeWho}
            />

            <label name="year" type="text" label="Year">Year: </label>
            <input
            type="integer"
            name="year"
            id="name"
            placeholder="Which year got it published?"
            value={year}
            onChange={this.handleChangeYear}
            />

            <div>
                <button type="submit">Create</button>
            </div>
        </form>
    )
  }
}



class AddRecommendation extends React.Component {
  constructor(props) {
      super(props);
  }

  handleNewRec = (category, title, description, rate, source, who, year) => {
    const new_id = this.props.current_group.id.toString();
    const {fetchAddRecommendation} = this.props;
    fetchAddRecommendation(new_id, category, title, description, rate, source, who, year);
  };

  render() {
    const {recommendations, current_group, error, pending} = this.props;
    if (this.props.current_group.id != null)
      console.log("current_group", this.props.current_group.id);

    return (
        <React.Fragment>
          {this.props.current_group.id ?
              <AddRec handleNewRec={(category, title, description, rate, source, who, year) => {this.handleNewRec(category, title, description, rate, source, who, year)}}/>
              : ""
          }
        </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
    error: getRecommendationsError(state),
    recommendations: getRecommendations(state),
    current_group: getGroup(state),
    pending: getRecommendationsPending(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchAddRecommendation: fetchAddRecommendation
}, dispatch)


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddRecommendation );
