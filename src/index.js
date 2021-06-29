import React from "react";
import ReactDOM from "react-dom";
import './index.css';
import App from "./App";

import { createStore, applyMiddleware } from 'redux';

import { Provider } from 'react-redux';

import { logsReducer as reducer} from './reducer/logsReducer';

import thunk from 'redux-thunk'

const store = createStore(reducer, applyMiddleware(thunk));

store.subscribe(() => {
  console.log(store.getState());
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);