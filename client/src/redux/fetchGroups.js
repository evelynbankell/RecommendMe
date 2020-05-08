import {fetchGroupsBegin, fetchGroupsSuccess, fetchGroupSuccess,
  addGroup, fetchGroupsFailure} from './actions/groupActions';
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

export function fetchAddGroup(title) {
    const createdDate = new Date();
    const headers = { 'Content-Type': 'form-data' }

    return dispatch => {

        const res = axios.post('http://localhost:8080/groups',{
            title,
            createdDate
          },
          { hearders: headers }
        )
        .then((res) => {
          dispatch(addGroup(res));
          return res;
        })
      }
}
