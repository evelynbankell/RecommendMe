import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setShowAdd, hideShowAdd } from '../redux/actions';
import { fetchAddRecommendation, fetchGroupRecommendations } from '../redux/fetchRecommendations';
import {getRecommendations, getRecommendationsError, getRecommendationsPending, showAdd} from '../redux/reducers/recommendations';
import {getGroup} from '../redux/reducers/groups';
import { getUser } from '../redux/reducers/users';
import {Form, FormGroup, Label, Input, Button } from 'react-bootstrap';

import socketIOClient from "socket.io-client";
const URL_LOCAL = 'http://localhost:8080';

let socket = null;

class AddRec extends React.Component {
  constructor(props) {
      super(props);
      this.onFormSubmit = this.onFormSubmit.bind(this);
      this.handleHide = this.handleHide.bind(this);
  }

  handleHide = (show_add) => {
      this.props.handleClickHide(show_add);
  };

   onFormSubmit(val) {
    this.props.handleNewRec(this.category, this.title, this.description, this.rate, this.source, this.who, this.year, this.comment, this.imageUrl);
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

  handleChangeCommment = event => {
    const { name, value } = event.target;
    this.comment = value;
  }

  handleChangeImage = event => {

    this.imageUrl = event.target.files[0];
    //his.imageUrl = value.replace("C:\\fakepath\\", "");
    //this.imageUrl.toString();

  }




  render() {
    const { category, title, description, rate, source, who, year, recommendations, comment, imageUrl, show_add } = this.props;
    return (


      <Form onSubmit={this.onFormSubmit}>
        <strong className="float-right delete-group" onClick={() => this.handleHide(this.props.show_add )}>X</strong>
        <div className="row form-group">
          <div className="col-6">

            <label className="pt-2 pr-2 mb-0" name="category" type="text" label="Category">Category:</label>
            <input
            name="category"
            className="form-control"
            id="category"
            placeholder="Enter a category"
            required
            list="categories"
            onChange={this.handleChangeCategory}
            />

            <datalist id="categories">
              <option value="E-Book"/>
              <option value="TV-serie"/>
              <option value="Movie"/>
              <option value="Recipe"/>
              <option value="Music"/>
            </datalist>

          </div>
          <div className="col-6">
            <label className="pt-2 pr-2 mb-0" name="title" type="text" label="Title">Title: </label>
            <input
            type="string"
            name="title"
            className="form-control"
            id="name"
            placeholder="Enter a title"
            value={title}
            onChange={this.handleChangeTitle}
            required
            />
          </div>
          <div className="col-6">
            <label className="pt-2 pr-2 mb-0" name="description" type="text" label="Description">Description: </label>
            <input
            type="text"
            name="description"
            className="form-control"
            id="name"
            placeholder="Enter a description"
            value={description}
            onChange={this.handleChangeDescription}
            required
            />
          </div>
          <div className="col-6">
            <label className="pt-2 pr-2 mb-0" name="rate" type="number" label="Rate">Rating: </label>
            <input
            type="number"
            name="rate"
            className="form-control"
            id="name"
            placeholder="Enter between 0-5"
            max="5"
            min="0"
            value={rate}
            onChange={this.handleChangeRate}
            />
          </div>
          <div className="col-6">
            <label className="pt-2 pr-2 mb-0" name="source" type="text" label="Source">Source: </label>
            <input
            type="string"
            name="source"
            className="form-control"
            id="name"
            placeholder="Enter where you found it"
            value={source}
            onChange={this.handleChangeSource}
            />
          </div>
          <div className="col-6">
            <label className="pt-2 pr-2 mb-0" name="who" type="text" label="Who">Who:  </label>
            <input
            type="string"
            name="who"
            className="form-control"
            id="name"
            placeholder="Enter who made it"
            value={who}
            onChange={this.handleChangeWho}
            />
          </div>
          <div className="col-6">
            <label className="pt-2 pr-2 mb-0" name="year" type="text" label="Year">Year: </label>
            <input
            type="number"
            name="year"
            className="form-control"
            id="name"
            placeholder="Enter year of publish"
            value={year}
            onChange={this.handleChangeYear}
            />
          </div>
          <div className="col-6">
            <label className="pt-2 pr-2 mb-0" name="comment" type="text" label="Comment">Comment: </label>
            <input
            type="string"
            name="comment"
            className="form-control"
            id="name"
            placeholder="Enter comment:"
            value={comment}
            onChange={this.handleChangeCommment}
            />
          </div>
          <div className="col-6">
            <label className="pt-2 pr-2 mb-0" name="imageUrl" type="text" label="imageUrl">Add image: </label>
            <input
            type="file"
            name="imageUrl"
            id="imageUrl"
            className="form-control"
            accept="image/*"
            value={imageUrl}
            onChange={this.handleChangeImage}
            />
          </div>
          <div className="col-12 pt-2">
              <Button variant="primary" type="submit">Create</Button>
          </div>
          </div>
        </Form>
    )
  }
}



class AddRecommendation extends React.Component {
  constructor(props) {
      super(props);
  }

  handleNewRec = (category, title, description, rate, source, who, year, comment, imageUrl) => {
    const new_id = this.props.current_group.id.toString();
    const {fetchAddRecommendation} = this.props;
    fetchAddRecommendation(new_id, category, title, description, rate, source, who, year, comment, imageUrl, this.props.user.name);
    socket.emit('NewRecommendation', new_id);
  };

  handleClick = (show_add) => {
      const {setShowAdd} = this.props;
      setShowAdd();
  };

  handleClickHide = (show_add) => {
      const {hideShowAdd} = this.props;
      hideShowAdd();
  };

  render() {
    const {recommendations, current_group, error, pending, user, show_add} = this.props;

    socket = socketIOClient(URL_LOCAL);

    socket.on("NewRecommendation", data => {
      console.log("SocketIO event for new rec created - reloading rec if in active group:", data);
      if(this.props.current_group.id == data) {
          const {fetchGroupRecommendations} = this.props;
          fetchGroupRecommendations(data);
      }
    });

    return (
        <React.Fragment>
          <div className="mt-2">
            {this.props.current_group.id ?
            <p className="small group-title" onClick={() => this.handleClick(this.props.show_add )}>CREATE NEW RECOMMENDATION</p>
            : "" }
            {this.props.current_group.id && this.props.show_add ?
                <AddRec handleNewRec={(category, title, description, rate, source, who, year, comment, imageUrl) =>
                  {this.handleNewRec(category, title, description, rate, source, who, year, comment, imageUrl)}} handleClickHide={(show_add) => {this.handleClickHide(show_add)}}/>
            : ""}
          </div>
        </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
    error: getRecommendationsError(state),
    recommendations: getRecommendations(state),
    current_group: getGroup(state),
    user: getUser(state),
    show_add: showAdd(state),
    pending: getRecommendationsPending(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchAddRecommendation: fetchAddRecommendation,
    fetchGroupRecommendations: fetchGroupRecommendations,
    setShowAdd: setShowAdd,
    hideShowAdd: hideShowAdd

}, dispatch)


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddRecommendation );
