import React, { Component } from 'react';
import { connect } from 'react-redux';
import GetGroups from './getGroups';
import AddGroup from './addGroup';
import GetRecommendations from './getRecommendations';
import AddRecommendation from './addRecommendation';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchDeleteGroup, fetchGroups } from '../redux/fetchGroups';
import { setShowComponent } from '../redux/actions/groupActions';
import { fetchGroupRecommendations } from '../redux/fetchRecommendations';
import {getRecommendations} from '../redux/reducers/recommendations';
import {getGroupsError, getGroupsPending, getGroups, getGroup, showComponent} from '../redux/reducers/groups';
import { getUser } from '../redux/reducers/users';
import Popup from 'react-popup';
import {Form, FormGroup, Label, Input } from 'react-bootstrap';

import ReactShadowScroll from 'react-shadow-scroll'; //npm i react-shadow-scroll

class MainBox extends Component{
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
      const {fetchGroupRecommendations} = this.props;
      fetchGroupRecommendations(this.props.current_group.id);
  }

  handleClick = (group_id) => {
    const {fetchDeleteGroup} = this.props;
    fetchDeleteGroup(group_id);
    const {setShowComponent} = this.props;
    setShowComponent();
    const {fetchGroups} = this.props;
    fetchGroups();

  };



  render(){
      const {groups, error, pending, current_group, user, show_component} = this.props;

    return (
      <React.Fragment>
        {this.props.show_component ?
        <AddGroup/>
        :
        <div className = "">
          <div className = "row p-0 m-0">
            <div className= "col-4 p-3 m-0">
              {this.props.current_group.imageURL ?
              <img className="pic pt-2" src= {this.props.current_group.imageURL} alt="" />
              : "" }
            </div>
            <div className= "col-4 mt-3 pt-3">
              <h1 className="pt-2"> {this.props.current_group.title}</h1>
            </div>
            <div className= "col-4">
            </div>
          </div>
          { this.props.current_group.createdBy === this.props.user.name ?
          <strong className="m-0 p-0 delete-group" onClick={() => this.handleClick(this.props.current_group.id)}>
            Delete Group
          </strong>
          : ""}
          <ReactShadowScroll isShadow={true} scrollWidth={10} scrollPadding={5}>
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
          </ReactShadowScroll>
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
    fetchGroupRecommendations: fetchGroupRecommendations,
    fetchDeleteGroup: fetchDeleteGroup,
    setShowComponent: setShowComponent,
    fetchGroups: fetchGroups
}, dispatch)


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainBox );
