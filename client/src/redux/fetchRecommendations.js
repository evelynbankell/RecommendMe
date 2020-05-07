import {fetchRecommendationsBegin, fetchRecommendationsSuccess, fetchGroupRecommendationsSuccess,
  addRecommendation, fetchRecommendationsFailure} from './actions';

import axios from 'axios';

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

export function fetchAddRecommendation(id, category, title, description, rate, source, who, year) {
    const createdDate = new Date();

    return dispatch => {

        const res = axios.post('http://localhost:8080/groups/' + parseInt(id) + '/recommendations', {
            category,
            title,
            description,
            rate,
            source,
            who,
            year,
            createdDate
        })
        .then((res) => {
          dispatch(addRecommendation(res));
          return res;
        })
      }
}
