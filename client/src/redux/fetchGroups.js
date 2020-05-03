import {fetchGroupsBegin, fetchGroupsSuccess, fetchGroupSuccess, fetchGroupsFailure} from './actions/groupActions';
import fetch from 'cross-fetch';

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
