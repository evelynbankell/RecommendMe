import React, { Component } from 'react';
import { connect } from 'react-redux';
import GetGroups from './getGroups';
import AddGroup from './addGroup';
import UpdateGroup from './updateGroup';
import GetRecommendations from './getRecommendations';
import AddRecommendation from './addRecommendation';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchDeleteGroup, fetchGroups } from '../redux/fetchGroups';
import { setShowComponent } from '../redux/actions/groupActions';
import { setShowUpdate, setHideUpdate } from '../redux/actions/groupActions';
import { fetchGroupRecommendations } from '../redux/fetchRecommendations';
import {getRecommendations} from '../redux/reducers/recommendations';
import {getGroupsError, getGroupsPending, getGroups, getGroup, showComponent, showUpdate} from '../redux/reducers/groups';
import { getUser } from '../redux/reducers/users';

import socketIOClient from "socket.io-client";
const URL_LOCAL = 'http://localhost:8080';

let socket = null;


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
    socket.emit('DeleteGroup', this.props.current_group.id);
  };

  handleUpdate = (group_id) => {
    const {setShowUpdate} = this.props;
    setShowUpdate();
  };



  render(){
      const {groups, error, pending, current_group, user, show_component, show_update} = this.props;

      socket = socketIOClient(URL_LOCAL);

      socket.on("DeleteGroup", data => {
        console.log("SocketIO event for delete group created - reloading groups:", data);
        const {fetchGroups} = this.props;
        fetchGroups();
      });

    return (
      <React.Fragment>
          {this.props.show_component ?
          <AddGroup/>
          :

        <div>
          {this.props.show_update ? <UpdateGroup/> :
          <div className="container">
          <div className = "row m-0 p-0">
            <div className= "col-4 p-3 m-0">
              {this.props.current_group.imageURL ?
              <img className="pic pt-2" src= {this.props.current_group.imageURL} alt="" />
              : "" }
            </div>
            <div className= "col-5 mt-3 pt-3">
              <h1 className="pt-2"> {this.props.current_group.title}</h1>
            </div>
            <div className= "col-3 float-right mt-3">
              { this.props.current_group.createdBy === this.props.user.name ?
              <button className="btn btn-danger p-3 delete-group2" onClick={() => this.handleClick(this.props.current_group.id)}>
                Delete Group
              </button>
              : ""}
              { this.props.current_group.createdBy === this.props.user.name ?
              <button type="button" className=" p-3 delete-group2" onClick={() => this.handleUpdate(this.props.current_group.id)}>
                Update Group
              </button>
              : ""}
            </div>
            </div>
            <div className="row">
              <div className="col-12">
                 <ul className="text-center">
                 <AddRecommendation current_group={this.props.current_group}/>
                 {this.props.current_group.id
                   ? <GetRecommendations current_group={this.props.current_group}/>
                   : "No recommendations"}

                </ul>
              </div>
            </div>
          </div>
          }
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
  show_update: showUpdate(state),
  user: getUser(state),
  recommendations: getRecommendations(state),
  pending: getGroupsPending(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchGroupRecommendations: fetchGroupRecommendations,
    fetchDeleteGroup: fetchDeleteGroup,
    setShowComponent: setShowComponent,
    setHideUpdate: setHideUpdate,
    setShowUpdate: setShowUpdate,
    fetchGroups: fetchGroups
}, dispatch)


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainBox );
