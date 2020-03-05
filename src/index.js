import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { takeEvery, put } from 'redux-saga/effects';
import Axios from 'axios';

const searchReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_GIFS':
        return [ action.payload ]
      default:
        return state;
    }
  };

function* getSearch() {
    const gifsResponse = yield Axios.get('/api/search');
    yield put({ type: 'SET_GIFS', payload: gifsResponse.data });
}  

// function* postPlants(action) {
//     try{
//       yield Axios.post('/api/plant', action.payload);
//       yield put({type: 'FETCH_PLANTS'}) 
//   } catch (error){
//       console.log(error);
//   }
//   }
  // this is the saga that will watch for actions
function* watcherSaga() {
    yield takeEvery('GET_SEARCH', getSearch);
  }

const sagaMiddleware = createSagaMiddleware();

// This is creating the store
// the store is the big JavaScript Object that holds all of the information for our application
const storeInstance = createStore(
    // This function is our first reducer
    // reducer is a function that runs every time an action is dispatched
    combineReducers({
        searchReducer
    }),
    applyMiddleware(sagaMiddleware, logger)
);
sagaMiddleware.run(watcherSaga);
ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, document.getElementById('react-root'));
