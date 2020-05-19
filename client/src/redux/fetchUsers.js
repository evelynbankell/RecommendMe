import {fetchUserBegin, fetchUserSuccess, fetchUserFailure, addUser, updateUser} from './actions/userActions';
//import fetch from 'cross-fetch';
import axios from 'axios';


export function fetchUser(email) {
    return dispatch => {
        dispatch(fetchUserBegin());
        fetch('http://localhost:8080/users/'+ email)
        .then(res => res.json())
        .then(res => {
            if(res.error) {
                throw(res.error);
            }
            dispatch(fetchUserSuccess(res));
            return res;
        })
        .catch(error => {
            dispatch(fetchUserFailure(error));
        })
    }
}

export function fetchAddUser(email, name, imageURL) {
    const formData = new FormData();
    formData.set('email', email);
    formData.set('name', name);
    formData.set('active', true);
    formData.append('imageURL', imageURL);

    return dispatch => {

      const res = axios({
        method: 'post',
        url: 'http://localhost:8080/users/',
        data: formData
      })
      .then((res) => {
          dispatch(addUser(res));
          return res;
        })
        .catch(error => {
            dispatch(fetchUserFailure(error));
        })
      }
}

export function fetchUpdateUser(email, name, active, imageURL) {
    const formData = new FormData();
    formData.set('email', email);
    formData.set('name', name);
    formData.set('active', active);
    formData.append('imageURL', imageURL);

    return dispatch => {

      const res = axios({
        method: 'put',
        url: 'http://localhost:8080/users/'+email,
        data: formData
      })
      .then((res) => {
          dispatch(updateUser(res));
          return res;
        })
        .catch(error => {
            dispatch(fetchUserFailure(error));
        })
      }
}
