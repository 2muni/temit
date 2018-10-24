import { combineReducers } from 'redux';

import user from './modules/user';
import article from './modules/article';

export default combineReducers({
  user,
  article
});