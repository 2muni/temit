import { combineReducers } from 'redux';

import authentication from './modules/authentication';
import article from './modules/article';
import comment from './modules/comment';
import snapshot from './modules/snapshot';
import user from './modules/user';

export default combineReducers({
  authentication,
  article,
  comment,
  snapshot,
  user
});