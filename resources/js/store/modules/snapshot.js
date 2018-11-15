import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';
import { produce } from 'immer';
    
const POST = 'snapshot/POST';
const POST_SUCCESS = 'snapshot/POST_SUCCESS';
const POST_FAILURE = 'snapshot/POST_FAILURE';
const GET = 'snapshot/GET';
const GET_SUCCESS = 'snapshot/GET_SUCCESS';
const GET_FAILURE = 'snapshot/GET_FAILURE';
const REMOVE = 'snapshot/REMOVE';
const REMOVE_SUCCESS = 'snapshot/REMOVE_SUCCESS';
const REMOVE_FAILURE = 'snapshot/REMOVE_FAILURE';
const LIKE = 'snapshot/LIKE';
const LIKE_SUCCESS = 'snapshot/LIKE_SUCCESS';
const LIKE_FAILURE = 'snapshot/LIKE_FAILURE';

export const post = createAction(POST);
export const postSuccess = createAction(POST_SUCCESS);
export const postFailure = createAction(POST_FAILURE, err => err);
export const get = createAction(GET);
export const getSuccess = createAction(GET_SUCCESS, res => res);
export const getFailure = createAction(GET_FAILURE);
export const remove = createAction(REMOVE);
export const removeSuccess = createAction(REMOVE_SUCCESS);
export const removeFailure = createAction(REMOVE_FAILURE, err => err);
export const like = createAction(LIKE);
export const likeSuccess = createAction(LIKE_SUCCESS);
export const likeFailure = createAction(LIKE_FAILURE, err => err);

export const postRequest = data => (
  dispatch => {
    console.log('post');
    dispatch(post());
    return axios.post('/api/snapshots', data)
      .then((res) => {
        dispatch(postSuccess());
      }).catch((err) => {
        dispatch(postFailure(err));
      })
  }
);
export const getRequest = snapshot => (
  dispatch => {
    dispatch(get());
    return axios.get(`/api/snapshots/${snapshot}`)
      .then((res) => {
        dispatch(getSuccess(res));
      }).catch((err) => {
        dispatch(getFailure());
      })
  }
);
export const removeRequest = id => (
  dispatch => {
    dispatch(remove());
    return axios.delete(`/api/snapshots/${id}`)
      .then((res) => {
        dispatch(removeSuccess());
      }).catch((err) => {
        dispatch(removeFailure(err));
      })
  }
)

const initialState = {
  post: {
    status: 'INIT',
    error: -1
  },
  get: {
    status: 'INIT',
    data: null,
  },
  remove: {
    status: 'INIT',
    error: -1
  },
}

export default handleActions(
  {
    /* POST ACTIONS */
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
          error: action.payload.error
        }
      }),

    /* GET ACTIONS */
    [GET]: (state) => 
      produce(state, draft => {
        draft.get = {
          status: 'WAITING',
        }
      }),
    [GET_SUCCESS]: (state, action) =>
      produce(state, draft => {
        draft.get = {
          status:'SUCCESS',
          data: action.payload.data
        }
      }),
    [GET_FAILURE]: (state) =>
      produce(state, draft => {
        draft.get = {
          status:'FAILURE',
        }
      }),

    /* REMOVE ACTIONS */
    [REMOVE]: (state) => 
      produce(state, draft => {
        draft.remove = {
          status: 'WAITING',
          error: -1
        }
      }),
    [REMOVE_SUCCESS]: (state) =>
      produce(state, draft => {
        draft.remove = {
          status:'SUCCESS',
        }
      }),
    [REMOVE_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.remove = {
          status:'FAILURE',
          error: action.payload.error
        }
      }),
  },
  initialState
);