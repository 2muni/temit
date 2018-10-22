import { combineReducers } from 'redux';

import authentication from './modules/authentication';
import article from './modules/article';

export default combineReducers({
  authentication,
  article,
});