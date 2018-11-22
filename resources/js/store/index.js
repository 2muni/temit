import { combineReducers } from 'redux';

import authentication from './modules/authentication';
import article from './modules/article';
import article_comment from './modules/article_comment';
import snapshot from './modules/snapshot';
import user from './modules/user';

export default combineReducers({
  authentication,
  article,
  article_comment,
  snapshot,
  user
});