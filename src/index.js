import React from 'react';
import { render } from 'react-dom';

// import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
// import { Provide } from 'react-redux';

// import * as reducers from './reducers';

import App from './components/app.js';

import './styles/application.scss';

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSIONS_COMPOSE__ || compose;
// const middlewares = [];

// const store = createStore(
//   combineReducers({
//     ...reducers,
//   }),
//   window.__DEFAULT_STATE__ || {},
//   composeEnhancers(applyMiddleware(...middlewares))
// );

const root = document.getElementById('react-root');
const vdom = <App />;

// const reduxVdom = (
//   <Provider store={store}>
//     <App />
//   </Provider>
// );

render(vdom, root);

