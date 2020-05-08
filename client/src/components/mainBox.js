import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Navbar, Button, Nav} from 'react-bootstrap';
import GetGroups from './getGroups';
import GetRecommendations from './getRecommendations';
import AddRecommendation from './addRecommendation';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchGroupRecommendations } from '../redux/fetchRecommendations';
import {getRecommendations} from '../redux/reducers/recommendations';
import {getGroupsError, getGroupsPending, getGroups, getGroup} from '../redux/reducers/groups';



class MainBox extends Component{
  constructor(props){
    super(props)
  }

  componentDidMount() {
      const {fetchGroupRecommendations} = this.props;
      fetchGroupRecommendations(this.props.current_group.id);
  }

  render(){
      const {groups, error, pending, current_group} = this.props;
    return (
      <React.Fragment>
        <div>
        <h1> Rubrik </h1>
          {this.props.current_group.id
            ? <GetRecommendations current_group={this.props.current_group}/>
            : "No recommendations"}
            <AddRecommendation current_group={this.props.current_group}/>
        </div>
    </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  error: getGroupsError(state),
  groups: getGroups(state),
  current_group: getGroup(state),
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
