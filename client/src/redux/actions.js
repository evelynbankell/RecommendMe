import { FETCH_RECOMMENDATIONS_BEGIN, FETCH_RECOMMENDATIONS_SUCCESS,
  FETCH_GROUP_RECOMMENDATIONS_SUCCESS, FETCH_RECOMMENDATIONS_FAILURE,
  ADD_RECOMMENDATION, DELETE_RECOMMENDATION, SET_SHOW_ADD, SET_NOT_SHOW_ADD}
  from "./actionTypes";

export function addRecommendation(recommendations) {
    return {
        type: ADD_RECOMMENDATION,
        recommendations: {
          category: recommendations.category,
          title: recommendations.title,
          description: recommendations.description,
          rate: recommendations.rate,
          source: recommendations.source,
          who: recommendations.who,
          year: recommendations.year,
          imageUrl: recommendations.imageUrl
        }
    }
}

export function deleteRecommendation(recommendation) {
    return {
        type: DELETE_RECOMMENDATION
    }
}

export function setShowAdd() {
  return {
    type: SET_SHOW_ADD
  }
}

export function hideShowAdd() {
  return {
    type: SET_NOT_SHOW_ADD
  }
}


export function fetchRecommendationsBegin() {
    return {
        type: FETCH_RECOMMENDATIONS_BEGIN
    }
}

export function fetchRecommendationsSuccess(recommendations) {
    return {
        type: FETCH_RECOMMENDATIONS_SUCCESS,
        payload: {
          recommendations: recommendations
        }
    }
}

export function fetchGroupRecommendationsSuccess(recommendations_current_group) {
    return {
        type: FETCH_GROUP_RECOMMENDATIONS_SUCCESS,
        payload: {
          recommendations_current_group: recommendations_current_group,
        }


    }
}

export function fetchRecommendationsFailure(error) {
    return {
        type: FETCH_RECOMMENDATIONS_FAILURE,
        error: error
    }
}
