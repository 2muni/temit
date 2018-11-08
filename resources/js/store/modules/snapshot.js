import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';
import { produce } from 'immer';
    
const POST = 'snapshot/POST';
const POST_SUCCESS = 'snapshot/POST_SUCCESS';
const POST_FAILURE = 'snapshot/POST_FAILURE';
const LIST = 'snapshot/LIST';
const LIST_SUCCESS = 'snapshot/LIST_SUCCESS';
const LIST_FAILURE = 'snapshot/LIST_FAILURE';
const GET = 'snapshot/GET';
const GET_SUCCESS = 'snapshot/GET_SUCCESS';
const GET_FAILURE = 'snapshot/GET_FAILURE';
const EDIT = 'snapshot/EDIT';
const EDIT_SUCCESS = 'snapshot/EDIT_SUCCESS';
const EDIT_FAILURE = 'snapshot/EDIT_FAILURE';
const REMOVE = 'snapshot/REMOVE';
const REMOVE_SUCCESS = 'snapshot/REMOVE_SUCCESS';
const REMOVE_FAILURE = 'snapshot/REMOVE_FAILURE';
const LIKE = 'snapshot/LIKE';
const LIKE_SUCCESS = 'snapshot/LIKE_SUCCESS';
const LIKE_FAILURE = 'snapshot/LIKE_FAILURE';

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
    return axios.post('/api/snapshots', data)
      .then((res) => {
        dispatch(postSuccess());
      }).catch((err) => {
        dispatch(postFailure(err));
      })
  }
);
export const listRequest = page => (
  dispatch => {
    dispatch(list());

    return axios.get(`/api/snapshots?page=${page}`)
      .then((res) => {
        dispatch(listSuccess(res));
      }).catch((err) => {
        dispatch(listFailure());
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
export const editRequest = (snapshot, data) => (
  dispatch => {
    dispatch(edit());
    data.append('_method', 'PUT');
    return axios.post(`/api/snapshots/${snapshot}`, data)
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
  list: {
    status: 'INIT',
    data: null,
  },
  get: {
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
    
    /* LIST ACTIONS */
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
          data: action.payload.data.data
        }
      }),
    [LIST_FAILURE]: (state) =>
      produce(state, draft => {
        draft.list = {
          status:'FAILURE',
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

    /* EDIT ACTIONS */
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