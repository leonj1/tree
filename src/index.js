import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/apiSaga';
import { createStore, compose, applyMiddleware } from 'redux';
import {
  FAILED_GET_INITIAL_PATH,
  START_GET_INITIAL_PATH,
  SUCCESS_GET_INITIAL_PATH,
  START_GET_PATH,
  FAILED_GET_PATH,
  SUCCESS_GET_PATH
} from "./redux/actions";
import { Provider } from 'react-redux';

const initialState = {
  resource: {
    bri: "",
    path: ""
  },
  status: {
    fetched: false,
    responseStatus: 0,
    message: ""
  },
  contents: ""
};

function mergeJsonContents(action) {

  return action.token;
}


// Actions the store should perform when an action is received
const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_GET_INITIAL_PATH:
      return {
        ...state,
        resource: action.payload,
      };
    case FAILED_GET_INITIAL_PATH:
      return {
        ...state,
        status: {
          fetched: true,
          responseStatus: action.request.status,
          message: action.request.reason
        },
        contents: {}
      };
    case SUCCESS_GET_INITIAL_PATH:
      return {
        ...state,
        status: {
          fetched: true,
          responseStatus: 200,
          message: ""
        },
        contents: action.payload.contents
      };
    case START_GET_PATH:
      return {
        ...state,
        resource: action.payload,
      };
    case FAILED_GET_PATH:
      return {
        ...state,
        status: {
          fetched: true,
          responseStatus: action.request.status,
          message: action.request.reason
        },
        contents: {}
      };
    case SUCCESS_GET_PATH:
      return {
        ...state,
        status: {
          fetched: true,
          responseStatus: 200,
          message: ""
        },
        contents: action.payload.contents
      };
    default:
      return state;
  }
};

const sagaMiddleware = createSagaMiddleware();
const middleware = [
  sagaMiddleware
];

const composeEnhancers = (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const enhancer = composeEnhancers(
  applyMiddleware(...middleware)
);

const store = createStore(
  myReducer,
  enhancer
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
