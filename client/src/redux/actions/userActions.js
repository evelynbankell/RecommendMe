import {  FETCH_USER_BEGIN, FETCH_USER_SUCCESS, FETCH_USER_FAILURE, ADD_USER } from "../actionTypes";

export function addUser(user) {
    return {
        type: ADD_USER,
        user: {
          email: user.email,
          name: user.name,
          imageURL: user.imageURL,
          active: user.active
        }
    }
}

export function fetchUserBegin() {
    return {
        type: FETCH_USER_BEGIN
    }
}

export function fetchUserSuccess(user) {
    console.log("user: ", user);
    return {
        type: FETCH_USER_SUCCESS,
        payload: {
          user: user
        }
    }
}


export function fetchUserFailure(error) {
    return {
        type: FETCH_USER_FAILURE,
        error: error
    }
}
