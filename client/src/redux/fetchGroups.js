import {fetchGroupsBegin, fetchGroupsSuccess, fetchGroupSuccess,
  addGroup, fetchGroupsFailure, deleteGroup} from './actions/groupActions';
//import fetch from 'cross-fetch';
import axios from 'axios';

export function fetchGroups() {
    return dispatch => {
        dispatch(fetchGroupsBegin());
        fetch('http://localhost:8080/groups')
        .then(res => res.json())
        .then(res => {
            if(res.error) {
                throw(res.error);
            }
            dispatch(fetchGroupsSuccess(res));
            return res;
        })
        .catch(error => {
            dispatch(fetchGroupsFailure(error));
        })
    }
}

export function fetchOneGroup(id) {
    return dispatch => {
        dispatch(fetchGroupsBegin());
        fetch('http://localhost:8080/groups/'+ parseInt(id))
        .then(res => res.json())
        .then(res => {
            if(res.error) {
                throw(res.error);
            }
            dispatch(fetchGroupSuccess(res));
            return res;
        })
        .catch(error => {
            dispatch(fetchGroupsFailure(error));
        })
    }
}

export function fetchDeleteGroup(id) {
  return dispatch => {

      const res = axios({
        method: 'delete',
        url: 'http://localhost:8080/groups/'+parseInt(id),
        data: id
      })
      .then((res) => {
          dispatch(deleteGroup(res));
          return res;
        })
        .catch(error => {
            dispatch(fetchGroupsFailure(error));
        })
  }
}

export function fetchAddGroup(title, createdBy, imageURL) {
    const today = new Date();
    const date = today.getFullYear()+'-'+('0' +(today.getMonth()+1)).slice(-2) +'-'+('0' +(today.getDate())).slice(-2);
    const time = ('0' +(today.getHours())).slice(-2) + ":" + ('0' +(today.getMinutes())).slice(-2);
    var createdDate = date+' '+time;

    const formData = new FormData();
    formData.set('title', title);
    formData.set('createdBy', createdBy);
    formData.set('createdDate', createdDate);
    formData.append('imageURL', imageURL);

    return dispatch => {

        const res = axios({
          method: 'post',
          url: 'http://localhost:8080/groups/',
          data: formData
        })
        .then((res) => {
            dispatch(addGroup(res));
            return res;
          })
          .catch(error => {
              dispatch(fetchGroupsFailure(error));
          })
    }
}
