import {
  FETCH_RECOMMENDATIONS_BEGIN,
  FETCH_RECOMMENDATIONS_SUCCESS,
  FETCH_GROUP_RECOMMENDATIONS_SUCCESS,
  FETCH_RECOMMENDATIONS_FAILURE
} from "../actionTypes";


const initialState = {
  pending: false,
  recommendations: [],
  recommendations_current_group: [],
  recommendation_group: 0,
  error: null
}


export default function recommendationsReducer(state = initialState, action) {
  switch (action.type) {


    case FETCH_RECOMMENDATIONS_BEGIN:
      return {
        ...state,
        pending: true
      }

    case FETCH_RECOMMENDATIONS_SUCCESS:
      console.log("hej2", action.payload);
      return {
        ...state,
        pending: false,
        recommendations: action.payload.recommendations
      }

    case FETCH_GROUP_RECOMMENDATIONS_SUCCESS:
      //console.log("hej2", action.payload);
      return {
        ...state,
        pending: false,
        recommendations_current_group: action.payload.recommendations_current_group,
        recommendation_group: action.payload.recommendations_current_group.groupId
      }

    case FETCH_RECOMMENDATIONS_FAILURE:
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

export const getRecommendationGroup = state => state.recommendations.recommendations_current_group.groupId;
export const getGroupRecommendations = state => state.recommendations.recommendations_current_group;
export const getRecommendations = state => state.recommendations.recommendations;
export const getProductsPending = state => state.pending;
export const getProductsError = state => state.error;
