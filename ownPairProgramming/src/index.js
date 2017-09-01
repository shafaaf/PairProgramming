import React from 'react';  
import { render } from 'react-dom';  
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { Router, browserHistory } from 'react-router';
import routes from './routes';

import HomePage from './components/HomePage.js';

const store = configureStore()
render(  
	<Provider store={store}>
		<Router routes={routes} history={browserHistory} />
	</Provider>,
	document.getElementById('root')
);
