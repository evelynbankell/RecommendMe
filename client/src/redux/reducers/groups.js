import {  FETCH_GROUPS_BEGIN, FETCH_GROUPS_SUCCESS, FETCH_ONE_GROUP_SUCCESS, FETCH_GROUPS_FAILURE } from "../actionTypes";


const initialState = {
  pending: false,
  groups: [],
  current_group: [],
  error: null
}


export default function groupsReducer(state = initialState, action) {
  switch (action.type) {

    case FETCH_GROUPS_BEGIN:
      return {
        ...state,
        pending: true
      }

    case FETCH_GROUPS_SUCCESS:
      return {
        ...state,
        pending: false,
        groups: action.payload.groups
      }

    case FETCH_ONE_GROUP_SUCCESS:
      return {
        ...state,
        pending: false,
        current_group: action.payload.current_group

      }

    case FETCH_GROUPS_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.error
      }

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}




export const getGroups = state => state.groups.groups;
export const getGroupsPending = state => state.pending;
export const getGroup = state => state.groups.current_group;
export const getGroupsError = state => state.error;
