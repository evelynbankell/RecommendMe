import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchOneGroup, fetchGroups, fetchUpdateGroup } from '../redux/fetchGroups';
import {getGroupsError, getGroupsPending, getGroups, getGroup, showUpdate} from '../redux/reducers/groups';
import { setHideUpdate } from '../redux/actions/groupActions';
import { getUser } from '../redux/reducers/users';

import {Form, FormGroup, Label, Input, Button } from 'react-bootstrap';

import socketIOClient from "socket.io-client";
const URL_LOCAL = 'http://localhost:8080';

let socket = null;


class GroupForm extends React.Component {
  constructor(props) {
      super(props);
      this.onFormSubmit = this.onFormSubmit.bind(this);
      this.handleHide = this.handleHide.bind(this);
  }

   onFormSubmit(val) {
    this.props.handleUpdateGroup(this.props.current_group, this.title, this.imageURL);
  }

  handleHide = (show_update) => {
      this.props.handleClickHide(show_update);
  };

  handleChangeTitle = event => {
    const { name, value } = event.target;
    this.title = value;
  }
  handleChangeImage = event => {
    this.imageURL = event.target.files[0];
    console.log("im", this.imageURL);
  }

  render() {
    const {current_group, title, user, imageURL, show_update } = this.props;
    return (
      <Form onSubmit={this.onFormSubmit}>
        <strong className="float-right delete-group" onClick={() => this.handleHide(this.props.show_update )}>X</strong>
        <small className="m-4" >UPDATE GROUP:</small>
        <div className="row form-group pl-3">

          <div className="col-12">
            <label className="pt-2 pr-2 mb-0" name="title" label="Title">Title: </label>
            <input
            type="string"
            name="title"
            className="form-control pr-2"
            id="group-title"
            placeholder={title}
            value={title}
            onChange={this.handleChangeTitle}
            />
          </div>
          <div className="col-12">
            <label className="pt-2 pr-2 mb-0" name="imageURL" label="imageURL">Add image: </label>
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
              <Button variant="primary" type="submit">Update</Button>
          </div>
          </div>
        </Form>
    )
  }
}


class UpdateGroup extends React.Component {
  constructor(props) {
      super(props);
  }

  handleClickHide = (show_update) => {
    const {setHideUpdate, fetchOneGroup} = this.props;
    setHideUpdate();
    fetchOneGroup(this.props.current_group.id);
  };

  handleUpdateGroup = (current_group, title, imageURL) => {
    const {fetchUpdateGroup, fetchOneGroup, fetchGroups} = this.props;
    fetchUpdateGroup(current_group.id, title, imageURL);
    socket.emit('UpdateGroup', this.props.current_group.id);
    //fetchOneGroup(current_group.id);
    //fetchGroups();
  };

  render() {
    const {user, current_group, show_update} = this.props;
    socket = socketIOClient(URL_LOCAL);

    socket.on("UpdateGroup", data => {
      console.log("SocketIO event for update group created - reloading group:", data);
      const {fetchGroups, fetchOneGroup} = this.props;
      fetchGroups();
      fetchOneGroup(data);
    });

    return (
        <React.Fragment>
          {this.props.current_group.id && this.props.show_update ?
          <div className="p-3">
            <GroupForm handleUpdateGroup={(current_group, title, imageURL) =>
              {this.handleUpdateGroup(this.props.current_group, title, imageURL)}} handleClickHide={(show_update) => {this.handleClickHide(show_update)}}/>
          </div>
          : "" }
        </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  groups: getGroups(state),
  current_group: getGroup(state),
  user: getUser(state),
  show_update: showUpdate(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchUpdateGroup: fetchUpdateGroup,
    fetchOneGroup: fetchOneGroup,
    fetchGroups: fetchGroups,
    setHideUpdate: setHideUpdate
}, dispatch)


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UpdateGroup );
