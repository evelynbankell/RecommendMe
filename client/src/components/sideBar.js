import React, { Component } from 'react';
import GetGroups from './getGroups';
import AddGroup from './addGroup';
import LoginModal from './login';
import MainBox from './mainBox';
import Popup from 'react-popup';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setShowComponent } from '../redux/actions/groupActions';
import { fetchOneGroup, fetchGroups, fetchAddGroup } from '../redux/fetchGroups';
import {getGroupsError, getGroupsPending, getGroups, getGroup, showComponent} from '../redux/reducers/groups';
import { getUser } from '../redux/reducers/users';
import {Form, FormGroup, Label, Input, Button } from 'react-bootstrap';

class Prompt extends React.Component {
  constructor(props) {
      super(props);
      this.onFormSubmit = this.onFormSubmit.bind(this);
  }

   onFormSubmit(val) {
    this.props.handleNewGroup(this.title);
  }

  handleChangeTitle = event => {
    const { name, value } = event.target;
    this.title = value;
  }

    render() {
      const {title, user } = this.props;
      return (
        <Form onSubmit={this.onFormSubmit}>
          <small className="pt-4 pb-4" >CREATE NEW GROUP:</small>
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

class SideBar extends Component{
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (show_component) => {
      const {setShowComponent} = this.props;
      setShowComponent();
  };

  handleNewGroup = (title) => {
    const {fetchAddGroup} = this.props;
    fetchAddGroup(title);
  };

  render(){
    const {groups, current_group, user, show_component} = this.props;
    return (
      <React.Fragment>
        <div>
          <p className="p-2 lead"> Welcome {this.props.user.name}</p>
        </div>
          <p className="p-3 group-title" onClick={() => this.handleClick(this.props.show_component )}>CREATE NEW GROUP</p>
        <div>
          <GetGroups />
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  error: getGroupsError(state),
  groups: getGroups(state),
  user: getUser(state),
  current_group: getGroup(state),
  show_component: showComponent(state),
  pending: getGroupsPending(state)
})
const mapDispatchToProps = dispatch => bindActionCreators({
    fetchAddGroup: fetchAddGroup,
    setShowComponent: setShowComponent
}, dispatch)


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SideBar );
