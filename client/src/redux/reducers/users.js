import {  FETCH_USER_BEGIN, FETCH_USER_SUCCESS, FETCH_USER_FAILURE, ADD_USER } from "../actionTypes";


const initialState = {
  pending: false,
  user: [],
  error: null
}


export default function userReducer(state = initialState, action) {
  switch (action.type) {

    case FETCH_USER_BEGIN:
      return {
        ...state,
        pending: true
      }

    case FETCH_USER_SUCCESS:
      return {
        ...state,
        pending: false,
        user: action.payload.user
      }

    case FETCH_USER_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.error
      }

      case ADD_USER:
        return {
          ...state,
          pending: false,
          user: {
            email: action.user.email,
            name: action.user.name,
            imageURL: action.user.imageURL,
            active: action.user.active
          }
        }

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}




export const getUser = state => state.user.user;
export const getUserPending = state => state.pending;
export const getUserError = state => state.error;
