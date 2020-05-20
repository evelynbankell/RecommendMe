import AsyncStorage from '@react-native-community/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import counterReducer from '../features/counter/counterSlice';
import { persistStore, autoRehydrate, persistReducer} from 'redux-persist';
import recommendations from './reducers/recommendations';
import {getRecommendations} from './actions';
import rootReducer from './reducers/index';
const axios = require('axios');


const middlewares = [thunk];

// Middleware: Redux Persist Config
const persistConfig = {
  // Root
  key: 'root',
  // Storage Method (React Native)
  storage: AsyncStorage,
  // Whitelist (Save Specific Reducers)
  whitelist: [
    'recommendations', 'groups', 'user', 'chat_posts',
  ],
  // Blacklist (Don't Save Specific Reducers)
  blacklist: [
    '',
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(...middlewares));

let persistor = persistStore(store);

// begin periodically persisting the store
//persistStore(store, {storage: localForage});

store.subscribe(() => console.log(store.getState()));

//store.dispatch(fetchProductsSuccess());

export {store, persistor,};
