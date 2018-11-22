import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';
import { produce } from 'immer';
    
const POST = 'comment/POST';
const POST_SUCCESS = 'comment/POST_SUCCESS';
const POST_FAILURE = 'comment/POST_FAILURE';
const LIST = 'comment/LIST';
const LIST_SUCCESS = 'comment/LIST_SUCCESS';
const LIST_FAILURE = 'comment/LIST_FAILURE';
const GET = 'comment/GET';
const GET_SUCCESS = 'comment/GET_SUCCESS';
const GET_FAILURE = 'comment/GET_FAILURE';
const EDIT = 'comment/EDIT';
const EDIT_SUCCESS = 'comment/EDIT_SUCCESS';
const EDIT_FAILURE = 'comment/EDIT_FAILURE';
const REMOVE = 'comment/REMOVE';
const REMOVE_SUCCESS = 'comment/REMOVE_SUCCESS';
const REMOVE_FAILURE = 'comment/REMOVE_FAILURE';
const LIKE = 'comment/LIKE';
const LIKE_SUCCESS = 'comment/LIKE_SUCCESS';
const LIKE_FAILURE = 'comment/LIKE_FAILURE';

export const post = createAction(POST);
export const postSuccess = createAction(POST_SUCCESS);
export const postFailure = createAction(POST_FAILURE, err => err);
export const list = createAction(LIST);
export const listSuccess = createAction(LIST_SUCCESS, res => res);
export const listFailure = createAction(LIST_FAILURE);
export const get = createAction(GET);
export const getSuccess = createAction(GET_SUCCESS, res => res);
export const getFailure = createAction(GET_FAILURE);
export const edit = createAction(EDIT);
export const editSuccess = createAction(EDIT_SUCCESS);
export const editFailure = createAction(EDIT_FAILURE, err => err);
export const remove = createAction(REMOVE);
export const removeSuccess = createAction(REMOVE_SUCCESS);
export const removeFailure = createAction(REMOVE_FAILURE, err => err);
export const like = createAction(LIKE);
export const likeSuccess = createAction(LIKE_SUCCESS);
export const likeFailure = createAction(LIKE_FAILURE, err => err);

export const postRequest = data => (
  dispatch => {
    dispatch(post());
    return axios.post('/api/articles/comments', data)
      .then((res) => {
        dispatch(postSuccess());
      }).catch((err) => {
        dispatch(postFailure(err));
      })
  }
);
export const listRequest = article => (
  dispatch => {
    dispatch(list());

    return axios.get(`/api/articles/comments/${article}`)
      .then((res) => {
        dispatch(listSuccess(res));
      }).catch((err) => {
        dispatch(listFailure());
      })
  }
)
export const getRequest = (article, reply_to) => (
  dispatch => {
    dispatch(get());

    return axios.get(`/api/articles/comments/${article}`, reply_to)
      .then((res) => {
        dispatch(getSuccess(res));
      }).catch((err) => {
        dispatch(getFailure());
      })
  }
)
export const editRequest = (comments, data) => (
  dispatch => {
    dispatch(edit());
    data.append('_method', 'PUT');
    return axios.post(`/api/articles/comments/${comments}`, data)
      .then((res) => {
        dispatch(editSuccess());
      }).catch((err) => {
        dispatch(editFailure(err));
      })
  }
);
export const removeRequest = id => (
  dispatch => {
    dispatch(remove());
    return axios.delete(`/api/articles/comments/${id}`)
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
  list: {
    status: 'INIT',
    data: null,
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
          error: action.payload.error
        }
      }),
    [LIST]: (state) => 
      produce(state, draft => {
        draft.list = {
          status: 'WAITING',
        }
      }),
    [LIST_SUCCESS]: (state, action) =>
      produce(state, draft => {
        draft.list = {
          status:'SUCCESS',
          data: action.payload.data
        }
      }),
    [LIST_FAILURE]: (state) =>
      produce(state, draft => {
        draft.list = {
          status:'FAILURE',
        }
      }),
    [EDIT]: (state) => 
      produce(state, draft => {
        draft.edit = {
          status: 'WAITING',
          error: -1
        }
      }),
    [EDIT_SUCCESS]: (state) =>
      produce(state, draft => {
        draft.edit = {
          status:'SUCCESS',
        }
      }),
    [EDIT_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.edit = {
          status:'FAILURE',
          error: action.payload.error
        }
      }),
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