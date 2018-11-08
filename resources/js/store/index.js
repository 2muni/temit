import { combineReducers } from 'redux';

import authentication from './modules/authentication';
import article from './modules/article';
import comment from './modules/comment';
import snapshot from './modules/snapshot';

export default combineReducers({
  authentication,
  article,
  comment,
  snapshot,
});