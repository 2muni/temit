import { combineReducers } from 'redux';

import user from './modules/user';
import article from './modules/article';
import comment from './modules/comment';

export default combineReducers({
  user,
  article,
  comment,
});