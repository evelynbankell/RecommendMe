import {  FETCH_GROUPS_BEGIN, FETCH_GROUPS_SUCCESS, FETCH_ONE_GROUP_SUCCESS,
  ADD_GROUP, FETCH_GROUPS_FAILURE, SET_SHOW_COMPONENT, SET_NOT_SHOW_COMPONENT, DELETE_GROUP,
  SET_HIDE_UPDATE, SET_SHOW_UPDATE} from "../actionTypes";


export function addGroup(group) {
    return {
        type: ADD_GROUP,
        groups: group
    }
}

export function deleteGroup(group) {
    return {
        type: DELETE_GROUP
    }
}

export function updateGroup(group) {
    return {
        type: ADD_GROUP,
        groups: group
    }
}

export function setShowComponent() {
  return {
    type: SET_SHOW_COMPONENT
  }
}

export function hideShowComponent() {
  return {
    type: SET_NOT_SHOW_COMPONENT
  }
}

export function setHideUpdate() {
  return {
    type: SET_HIDE_UPDATE
  }
}

export function setShowUpdate() {
  return {
    type: SET_SHOW_UPDATE
  }
}

export function fetchGroupsBegin() {
    return {
        type: FETCH_GROUPS_BEGIN
    }
}

export function fetchGroupsSuccess(groups) {
    console.log("groups: ", groups);
    return {
        type: FETCH_GROUPS_SUCCESS,
        payload: {
          groups: groups
        }
    }
}

export function fetchGroupSuccess(current_group) {
    console.log("current_group: ", current_group);
    return {
        type: FETCH_ONE_GROUP_SUCCESS,
        payload: {
          current_group: current_group
        }
      }
}

export function fetchGroupsFailure(error) {
    return {
        type: FETCH_GROUPS_FAILURE,
        error: error
    }
}
