import {fetchRecommendationsBegin, fetchRecommendationsSuccess, fetchGroupRecommendationsSuccess, fetchRecommendationsFailure} from './actions';

export function fetchRecommendations() {
    return dispatch => {
        dispatch(fetchRecommendationsBegin());
        fetch('http://localhost:8080/groups/5714489739575296/recommendations')
        .then(res => res.json())
        .then(res => {
            if(res.error) {
                throw(res.error);
            }
            dispatch(fetchRecommendationsSuccess(res));
            return res;
        })
        .catch(error => {
            dispatch(fetchRecommendationsFailure(error));
        })
    }
}

export function fetchGroupRecommendations(id) {
    return dispatch => {
        dispatch(fetchRecommendationsBegin());
        fetch('http://localhost:8080/groups/' + parseInt(id) + '/recommendations')
        .then(res => res.json())
        .then(res => {
            if(res.error) {
                throw(res.error);
            }
            dispatch(fetchGroupRecommendationsSuccess(res));
            return res;
        })
        .catch(error => {
            dispatch(fetchRecommendationsFailure(error));
        })
    }
}

/*
export function fetchOffers() {
  return function action(dispatch) {
    dispatch({ type: FETCH_OFFERS })

    const request = axios({
      method: 'GET',
      url: `${BASE_URL}/offers`,
      headers: []
    });

    return request.then(
      response => dispatch(fetchOffersSuccess(response)),
      err => dispatch(fetchOffersError(err))
    );
  }
}
*/
