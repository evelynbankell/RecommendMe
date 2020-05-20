import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchAddChatPost, fetchGroupChatPosts} from '../redux/fetchChatPosts';
import { fetchGroupRecommendations } from '../redux/fetchRecommendations';
import {getRecommendations} from '../redux/reducers/recommendations';
import {getGroupsError, getGroupsPending, getGroups, getGroup, showComponent} from '../redux/reducers/groups';
import {getChatPosts} from '../redux/reducers/chatPosts';
import { getUser } from '../redux/reducers/users';
// RUN npm i socket.io-client
import socketIOClient from "socket.io-client";
const URL_LOCAL = 'http://localhost:8080';

let socket = null;

const TableBody = ({ chat_post }) => (
  <div className="row float-left bubble p-1 m-2">
    <div className="col-12">
      {chat_post.createdDate ?
        <small>{chat_post.createdDate}</small>
      : ""}
    </div>
    <div className="col-12">
      <p className="m-0 p-0 small"> {chat_post.createdBy}</p>
    </div>
    <div className="col-12">
      <strong className="m-0 p-0"> {chat_post.content}</strong>
    </div>
  </div>

);

class Footer extends Component {
  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit(val) {
   this.props.handleNewChat(this.content);
 }

 handleChangeContent = event => {
   const { name, value } = event.target;
   this.content = value;
 }

  render() {
      const { content } = this.props;
      return (
          <form onSubmit={this.onFormSubmit}>
            <div>
              <div className="row">
                <div className="col-12">
                    <input
                        className = "messageStyle"
                        type="text"
                        name="content"
                        id="content"
                        placeholder="Write a message"
                        value={content}
                        onChange={this.handleChangeContent}
                        required />
                </div>
                <div className="col-12">
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

  componentDidMount() {
      const {fetchGroupChatPosts} = this.props;
      fetchGroupChatPosts(this.props.current_group.id);
  }



  handleNewChat = (content) => {
    const new_id = this.props.current_group.id.toString();
    const {fetchAddChatPost} = this.props;
    fetchAddChatPost(new_id, content, this.props.user.name);
    socket.emit('NewPost', new_id);

  };

  render(){
      const {groups, error, pending, current_group, user, chat_posts, show_component} = this.props;
      socket = socketIOClient(URL_LOCAL);

      socket.on("NewPost", data => {
        console.log("SocketIO event for new post created - reloading post if in active channel:", data);
        if(this.props.current_group.id == data) {
            const {fetchGroupChatPosts} = this.props;
            fetchGroupChatPosts(data);
        }
      });

    return (
      <React.Fragment>
        {this.props.current_group.id && this.props.show_component == false ?
        <div className="chatBox m-2">
          <div className="mt-2 pt-2">
            <p className="lead">GROUP CHAT</p>
          </div>
          <div className="table-wrapper-scroll-y posts-scrollbar">
          <div className="container posts-in-channel">
              {this.props.current_group.id
                ? this.props.chat_posts.map((chat_post, index) => {
                    return <TableBody key={`chat_post-${chat_post.id}`} chat_post={chat_post} />;
              })  : "No posts"}
            </div>
          </div>
          <div className="footer m-2 p-3">
            <Footer handleNewChat={(content) => {this.handleNewChat(content)}} />
          </div>
        </div>
        : "" }
    </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  error: getGroupsError(state),
  groups: getGroups(state),
  current_group: getGroup(state),
  user: getUser(state),
  show_component: showComponent(state),
  chat_posts: getChatPosts(state),
  recommendations: getRecommendations(state),
  pending: getGroupsPending(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchGroupChatPosts: fetchGroupChatPosts,
  fetchAddChatPost: fetchAddChatPost
}, dispatch)


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatPanel );
