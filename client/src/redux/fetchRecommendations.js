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

export function fetchAddRecommendation(id, category, title, description, rate, source, who, year, imageUrl) {
    console.log("bra");
    const createdDate = new Date();
    const formData = new FormData();
    formData.set('category', category);
    formData.set('title', title);
    formData.set('description', description);
    formData.set('rate', rate);
    formData.set('source', source);
    formData.set('who', who);
    formData.set('year', year);
    formData.set('createdDate', createdDate);
    formData.append('imageUrl', imageUrl);

    const config = {
      headers: {
      'Content-Type': 'multipart/form-data'
      }
    };

    return dispatch => {

      const res = axios({
        method: 'post',
        url: 'http://localhost:8080/groups/' + parseInt(id) + '/recommendations',
        data: formData
      })
      .then((res) => {
          dispatch(addRecommendation(res));
          return res;
        })
        .catch(error => {
            dispatch(fetchRecommendationsFailure(error));
        })
      }
}


/*
const res = axios({
  method: 'post',
  url: 'http://localhost:8080/groups/' + parseInt(id) + '/recommendations',
  data: formData,
  headers: {'Content-Type': "multipart/form-data" }
})



const res = axios.post('http://localhost:8080/groups/' + parseInt(id) + '/recommendations',
formData, {headers:headers})
*/
