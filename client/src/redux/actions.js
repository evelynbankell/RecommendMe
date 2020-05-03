import { FETCH_RECOMMENDATIONS_BEGIN, FETCH_RECOMMENDATIONS_SUCCESS,
  FETCH_GROUP_RECOMMENDATIONS_SUCCESS, FETCH_RECOMMENDATIONS_FAILURE }
  from "./actionTypes";


export function fetchRecommendationsBegin() {
    return {
        type: FETCH_RECOMMENDATIONS_BEGIN
    }
}

export function fetchRecommendationsSuccess(recommendations) {
    console.log("hej", recommendations);
    return {
        type: FETCH_RECOMMENDATIONS_SUCCESS,
        payload: {
          recommendations: recommendations
        }


    }
}

export function fetchGroupRecommendationsSuccess(recommendations_current_group) {
    console.log("hej", recommendations_current_group);
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


/*
export function recomendationAdded(name) {
  type: FETCH_PRODUCTS_SUCCESS,
  payload: {
    name: "test"
  }
}
*/
