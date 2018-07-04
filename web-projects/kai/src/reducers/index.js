import {combineReducers} from 'redux';
import userPage from './userPage';
import customerPage from './customerPage';

const rootReducers = combineReducers({
  userPage,
  customerPage,
  // doctorPage,
});

export default rootReducers;