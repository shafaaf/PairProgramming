import {combineReducers} from 'redux';
import currentUser from './currentUserReducer';
import challenges from './challengesReducer';

const rootReducer = combineReducers({
  currentUser,
  challenges
})

export default rootReducer;
