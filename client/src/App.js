import React from 'react';
import { Counter } from './features/counter/Counter';
import AddRecommendation from './components/addRecommendation';
import GetRecommendations from './components/getRecommendations';
import GetGroups from './components/getGroups';
import TopBar from './components/topBar';
import SideBar from './components/sideBar';
import { useSelector, useDispatch } from 'react-redux';
import { getRecommendations, fetchProductsSuccess } from './redux/actions'
import fetchRecommendations from './redux/fetchRecommendations';
import { fetchOneGroup } from './redux/fetchGroups';
import fetchProducts from './redux/fetchRecommendations';
import './App.css';


class App extends React.Component {
//  const showRecommendations = useSelector(state => state.recommendations);
  //const dispatch = useDispatch();

  render() {
    return (
      <div className="App">
        <TopBar/>
        <SideBar/>
        <GetGroups/>
      </div>
    )
  }
}

/*
<button onClick={() => dispatch(fetchRecommendations())}>GET RECOMMENDATION</button>
<GetRecommendations/>
*/

export default App;
