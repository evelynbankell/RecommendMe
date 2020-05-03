import { ADD_RECOMMENDATION, GET_RECOMMENDATIONS } from "../actionTypes";
import {
  FETCH_RECOMMENDATIONS_BEGIN,
  FETCH_RECOMMENDATIONS_SUCCESS,
  FETCH_RECOMMENDATIONS_FAILURE
} from "../actionTypes";


const initialState = {
  pending: false,
  recommendations: [],
  error: null
}


export default function recommendationsReducer(state = initialState, action) {
  switch (action.type) {

      case GET_RECOMMENDATIONS:
        console.log("hejGET", action.payload);
        return {
          ...state,
          recommendations: action.payload.recommendations
        }



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




export const getRecommendations = state => state.recommendations.recommendations;
export const getProductsPending = state => state.pending;
export const getProductsError = state => state.error;
