import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { takeEvery, put } from 'redux-saga/effects';
import Axios from 'axios';

const searchReducer = (state = '', action) => {
    switch (action.type) {
      case 'SET_GIFS':
        console.log('ACTION PAYLOAD', action.payload);
        
        return action.payload
      default:
        return state;
    }
  };

function* getSearch(action) {
  console.log('sent payload queryString', action.payload);
  
    const gifsResponse = yield Axios.get('/api/search/' + action.payload);
    yield put({ type: 'SET_GIFS', payload: gifsResponse.data });
}  

function* addFavorite(action) {
  console.log('in the post addFavorite', action.payload);
  try {
    yield Axios.post('/api/favorite', action.payload)
  } catch (error) {
    console.log(error);
  }

}

  // this is the saga that will watch for actions
function* watcherSaga() {
    yield takeEvery('GET_SEARCH', getSearch);
    yield takeEvery('FAVORITE', addFavorite);
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
