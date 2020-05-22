import {fetchChatPostsBegin, fetchGroupChatPostsSuccess, fetchChatPostsFailure,
  addChatPost} from './actions/chatPostActions';

import axios from 'axios';

export function fetchGroupChatPosts(id) {
    return dispatch => {
        dispatch(fetchChatPostsBegin());
        fetch('http://localhost:8080/groups/' + parseInt(id) + '/chatposts')
        .then(res => res.json())
        .then(res => {
            const sorted_result = res.sort((a, b) => (a.createdDate > b.createdDate) ? 1 : -1);
            if(res.error) {
                throw(res.error);
            }
            dispatch(fetchGroupChatPostsSuccess(res));
            return res;
        })
        .catch(error => {
            dispatch(fetchChatPostsFailure(error));
        })
    }
}

export function fetchAddChatPost(id, content, createdBy) {
    const today = new Date();
    const date = today.getFullYear()+'-'+('0' +(today.getMonth()+1)).slice(-2) +'-'+('0' +(today.getDate())).slice(-2);
    const time = ('0' +(today.getHours())).slice(-2) + ":" + ('0' +(today.getMinutes())).slice(-2) + ":" + ('0' +(today.getSeconds())).slice(-2);
    var createdDate = date+' '+time;

    return dispatch => {

      const res = axios.post('http://localhost:8080/groups/' + parseInt(id) + '/chatpost', {
        content,
        createdBy,
        createdDate
      })
      .then((res) => {
          dispatch(addChatPost(res));
          return res;
        })
        .catch(error => {
            dispatch(fetchChatPostsFailure(error));
        })
      }
}
