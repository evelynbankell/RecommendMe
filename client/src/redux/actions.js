import { ADD_RECOMMENDATION,
  GET_RECOMMENDATIONS,
  FETCH_RECOMMENDATIONS_BEGIN, FETCH_RECOMMENDATIONS_SUCCESS, FETCH_RECOMMENDATIONS_FAILURE } from "./actionTypes";




export function getRecommendations(recommendations) {
  console.log("hejGET", recommendations);
  return {
      type: GET_RECOMMENDATIONS,
      payload: {
        recommendations: recommendations
      }

  }
}


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
