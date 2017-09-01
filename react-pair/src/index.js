/* eslint-disable import/default */

import 'babel-polyfill' ;
import React from 'react';  
import { render } from 'react-dom';  
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

import HomePage from './components/HomePage.js';

const store = configureStore()

render(  
  <Provider store={store}>
    <HomePage />
  </Provider>,
 document.getElementById('main')
);