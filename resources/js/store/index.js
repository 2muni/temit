import { combineReducers } from 'redux';

import authentication from './modules/authentication';
import article from './modules/article';
import comment from './modules/comment';

export default combineReducers({
  authentication,
  article,
  comment,
});