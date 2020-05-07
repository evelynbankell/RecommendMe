import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './redux/store';
//provider -> makes the store available
import { Provider } from 'react-redux';
//import { recomendationAdded } from '.redux/actions'
import * as serviceWorker from './serviceWorker';

/*
const unsubscribe = store.subscribe(() => {
  console.log("store changed", store.getState());
})

store.dispatch(recomendationAdded("Test"));
*/

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

//serviceWorker.unregister();
