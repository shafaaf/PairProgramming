import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers'
// import ReduxPromise from 'redux-promise';
import thunk from 'redux-thunk';

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk)
  );
}