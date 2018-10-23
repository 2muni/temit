import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';
import { produce } from 'immer';

const POST = 'article/POST';
const POST_SUCCESS = 'article/POST_SUCCESS';
const POST_FAILURE = 'article/POST_FAILURE';
const LIST = 'article/LIST';
const LIST_SUCCESS = 'article/LIST_SUCCESS';
const LIST_FAILURE = 'article/LIST_FAILURE';
const VIEW = 'article/VIEW';
const VIEW_SUCCESS = 'article/VIEW_SUCCESS';
const VIEW_FAILURE = 'article/VIEW_FAILURE';
const EDIT = 'article/EDIT';
const EDIT_SUCCESS = 'article/EDIT_SUCCESS';
const EDIT_FAILURE = 'article/EDIT_FAILURE';
const REMOVE = 'article/REMOVE';
const REMOVE_SUCCESS = 'article/REMOVE_SUCCESS';
const REMOVE_FAILURE = 'article/REMOVE_FAILURE';
const LIKE = 'article/LIKE';
const LIKE_SUCCESS = 'article/LIKE_SUCCESS';
const LIKE_FAILURE = 'article/LIKE_FAILURE';

export const post = createAction(POST);
export const postSuccess = createAction(POST_SUCCESS);
export const postFailure = createAction(POST_FAILURE, err => err);

export const postRequest = data => (
  dispatch => {
    dispatch(post());

    return axios.post('/api/articles', data)
      .then((res) => {
        console.log(res);
        dispatch(postSuccess());
      }).catch((err) => {
        dispatch(postFailure(err));
      })
  }
);

const initialState = {
  post: {
    status: 'INIT',
    error: -1
  },
  list: {
    status: 'INIT',
    data: [],
    isLast: false
  },
  article: {
    status: 'INIT',
    data: [],
  },
  edit: {
    status: 'INIT',
    error: -1,
  },
  remove: {
    status: 'INIT',
    error: -1
  },
}

export default handleActions(
  {
    [POST]: (state) => 
      produce(state, draft => {
        draft.post = {
          status: 'WAITING',
          error: -1
        }
      }),
    [POST_SUCCESS]: (state) =>
      produce(state, draft => {
        draft.post = {
          status:'SUCCESS',
        }
      }),
    [POST_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.post = {
          status:'FAILURE',
          error: action.error
        }
      }),
  },
  initialState
);