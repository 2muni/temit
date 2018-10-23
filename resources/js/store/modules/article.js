import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';
import { produce } from 'immer';

const POST = 'article/POST';
const POST_SUCCESS = 'article/POST_SUCCESS';
const POST_FAILURE = 'article/POST_FAILURE';

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