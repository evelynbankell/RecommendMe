import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchOneGroup, fetchGroups, fetchAddGroup } from '../redux/fetchGroups';
import {getGroupsError, getGroupsPending, getGroups, getGroup} from '../redux/reducers/groups';
import { getUser } from '../redux/reducers/users';

import {Form, FormGroup, Label, Input, Button } from 'react-bootstrap';


class GroupForm extends React.Component {
  constructor(props) {
      super(props);
      this.onFormSubmit = this.onFormSubmit.bind(this);
  }

   onFormSubmit(val) {
    this.props.handleNewGroup(this.title, this.imageURL);
  }

  handleChangeTitle = event => {
    const { name, value } = event.target;
    this.title = value;
  }
  handleChangeImage = event => {
    this.imageURL = event.target.files[0];
  }

  render() {
    const {title, user, imageURL } = this.props;
    return (
      <Form onSubmit={this.onFormSubmit}>
        <small className="m-4" >CREATE NEW GROUP:</small>
        <div className="row form-group pl-3">

          <div className="col-12">
            <label className="pt-2 pr-2 mb-0" name="title" label="Title">Title: </label>
            <input
            type="string"
            name="title"
            className="form-control pr-2"
            id="group-title"
            placeholder="Enter a title"
            value={title}
            onChange={this.handleChangeTitle}
            required
            />
          </div>
          <div className="col-12">
            <label className="pt-2 pr-2 mb-0" name="imageURL" type="text" label="imageURL">Add image: </label>
            <input
            type="file"
            name="imageURL"
            id="imageURL"
            className="form-control"
            accept="image/*"
            value={imageURL}
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


class AddGroup extends React.Component {
  constructor(props) {
      super(props);
  }

  handleNewGroup = (title, imageURL) => {
    const {fetchAddGroup} = this.props;
    fetchAddGroup(title, this.props.user.name, imageURL);
    const {fetchGroups} = this.props;
    fetchGroups();
  };

  render() {
    const {user} = this.props;
    return (
        <React.Fragment>
          <div className="p-3">
            <GroupForm handleNewGroup={(title, imageURL) =>
              {this.handleNewGroup(title, imageURL)}}/>
          </div>
        </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  groups: getGroups(state),
  current_group: getGroup(state),
  user: getUser(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchAddGroup: fetchAddGroup,
    fetchGroups: fetchGroups
}, dispatch)


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddGroup );
