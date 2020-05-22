import {  FETCH_GROUPS_BEGIN, FETCH_GROUPS_SUCCESS, FETCH_ONE_GROUP_SUCCESS,
  ADD_GROUP, FETCH_GROUPS_FAILURE, SET_SHOW_COMPONENT, SET_NOT_SHOW_COMPONENT, DELETE_GROUP,
  SET_SHOW_UPDATE, SET_HIDE_UPDATE } from "../actionTypes";


const initialState = {
  pending: false,
  groups: [],
  current_group: [],
  show_component: true,
  show_update: false,
  error: null
}


export default function groupsReducer(state = initialState, action) {
  switch (action.type) {

    case FETCH_GROUPS_BEGIN:
      return {
        ...state,
        pending: true
      }

    case SET_SHOW_COMPONENT:
      return {
        ...state,
        show_component: true
      }

    case SET_NOT_SHOW_COMPONENT:
      return {
        ...state,
        show_component: false
      }

    case SET_SHOW_UPDATE:
      return {
        ...state,
        show_update: true
      }

    case SET_HIDE_UPDATE:
      return {
        ...state,
        show_update: false
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

    case ADD_GROUP:
      return {
        ...state,
        pending: false,
        groups: {
          title: action.groups.title,
          imageURL: action.groups.imageURL
        }
      }

    case DELETE_GROUP:
      return {
        ...state,
        pending: false,
      }

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}


export const showUpdate = state => state.groups.show_update;
export const showComponent = state => state.groups.show_component;
export const getGroups = state => state.groups.groups;
export const getGroupsPending = state => state.pending;
export const getGroup = state => state.groups.current_group;
export const getGroupsError = state => state.error;
