import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Navbar, Button, Nav} from 'react-bootstrap';
import GetGroups from './getGroups';
import AddGroup from './addGroup';
import GetRecommendations from './getRecommendations';
import AddRecommendation from './addRecommendation';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchGroupRecommendations } from '../redux/fetchRecommendations';
import {getRecommendations} from '../redux/reducers/recommendations';
import {getGroupsError, getGroupsPending, getGroups, getGroup, showComponent} from '../redux/reducers/groups';
import { getUser } from '../redux/reducers/users';
import Popup from 'react-popup';
import {Form, FormGroup, Label, Input } from 'react-bootstrap';


class MainBox extends Component{
  constructor(props){
    super(props)
  }

  componentDidMount() {
      const {fetchGroupRecommendations} = this.props;
      fetchGroupRecommendations(this.props.current_group.id);
  }



  render(){
      const {groups, error, pending, current_group, user, show_component} = this.props;

    return (
      <React.Fragment>
        {this.props.show_component ?
        <AddGroup/>
        :
        <div className = "MainBox">
        <h1 className="pt-2"> {this.props.current_group.title} </h1>
          <ul>
          <AddRecommendation current_group={this.props.current_group}/>
          <div>
          <div className="Bild">
          <img src= {this.props.current_group.imageUrl} alt="" width="300" />
          </div>
          {this.props.current_group.id
            ? <GetRecommendations current_group={this.props.current_group}/>
            : "No recommendations"}
            </div>
            </ul>
        </div>
        }
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  error: getGroupsError(state),
  groups: getGroups(state),
  current_group: getGroup(state),
  show_component: showComponent(state),
  user: getUser(state),
  recommendations: getRecommendations(state),
  pending: getGroupsPending(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchGroupRecommendations: fetchGroupRecommendations
}, dispatch)


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainBox );
