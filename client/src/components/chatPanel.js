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
import { getUser } from '../redux/reducers/users';


class Footer extends Component {
  constructor(props) {
    super(props);
  }

  handleChange = event => {
    console.log("in handleChange");
  }

  onFormSubmit = (event) => {
    console.log("in submit: ");
  }

  render() {
      return (
          <form onSubmit={this.onFormSubmit}>
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-8">
                    <input
                        className = "messageStyle"
                        type="text"
                        name="content"
                        id="content"
                        placeholder="Write a message"
                        onChange={this.handleChange} />
                </div>
                <div className="col-md-4">
                  <button className="btn btn-primary" type="submit">
                      <small>SEND</small>
                  </button>
                </div>
              </div>
            </div>
          </form>
      )
  }
}



class ChatPanel extends Component{
  constructor(props){
    super(props)
  }

  handleNewPostClick = (content) => {
  console.log("in Click ");
}



  render(){
      const {groups, error, pending, current_group, user} = this.props;
    return (
      <React.Fragment>
        <div className="chatBox m-2">
          <div className="mt-2 pt-2">
            <p className="lead">GROUP CHAT</p>
          </div>
          <div className="table-wrapper-scroll-y posts-scrollbar">
            <table className="table posts-in-channel">
            </table>
          </div>
          <div className="footer m-2 p-3">
            <Footer handleNewPostClick={(content) => {this.handleNewPostClick(content)}} />
          </div>
        </div>

    </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  error: getGroupsError(state),
  groups: getGroups(state),
  current_group: getGroup(state),
  user: getUser(state),
  recommendations: getRecommendations(state),
  pending: getGroupsPending(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatPanel );
