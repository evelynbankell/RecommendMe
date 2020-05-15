import { configureStore } from '@reduxjs/toolkit';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import counterReducer from '../features/counter/counterSlice';
import recommendations from './reducers/recommendations';
import {getRecommendations} from './actions';
import rootReducers from './reducers/index';
const axios = require('axios');

let initial_state = {
    current_group: {id: 0, title: "", imageURL: "", createdDate: null, createdBy: ""},
    groups: [{id: 0, title: "", imageURL: "", createdDate: null, createdBy: ""}],
    active_groups: [{id:0}],
    chatPosts_current_group: [{id: 0, content: "", createdDate: null, createdBy: ""}],
    recommendations_current_group: [{id: 0, category: "", createdDate: null, createdBy: "", description: "", imageUrl: "", rate: "", source: "", title: "", who: "", year: ""}],
    users: [{id: 0, email: "", name: "", active: false, imageURL: ""}],
    user: {id: 0, email: "", name: "", imageURL: ""},
    active_users: [{id: 0, email: ""}],
    show_login: false,
  }

const middlewares = [thunk];

const store = createStore(rootReducers, applyMiddleware(...middlewares));





store.subscribe(() => console.log(store.getState()));

//store.dispatch(fetchProductsSuccess());

export default store;
