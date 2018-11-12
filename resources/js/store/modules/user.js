import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';
import { produce } from 'immer';

const USER_GET = 'user/USER_GET'
const USER_GET_SUCCESS = 'user/USER_GET_SUCCESS'
const USER_GET_FAILURE = 'user/USER_GET_FAILURE'
const USER_EDIT = 'user/USER_EDIT'
const USER_EDIT_SUCCESS = 'user/USER_EDIT_SUCCESS'
const USER_EDIT_FAILURE = 'user/USER_EDIT_FAILURE'
const USER_FOLLOW = 'user/USER_FOLLOW'
const USER_FOLLOW_SUCCESS = 'user/USER_FOLLOW_SUCCESS'
const USER_FOLLOW_FAILURE = 'user/USER_FOLLOW_FAILURE'

export const user = createAction(USER_GET)
export const userSuccess = createAction(USER_GET_SUCCESS, user => user)
export const userFailure = createAction(USER_GET_FAILURE)
export const edit = createAction(USER_EDIT)
export const editSuccess = createAction(USER_EDIT_SUCCESS)
export const editFailure = createAction(USER_EDIT_FAILURE)
export const follow = createAction(USER_FOLLOW)
export const followSuccess = createAction(USER_FOLLOW_SUCCESS)
export const followFailure = createAction(USER_FOLLOW_FAILURE)

export const userRequest = id => (
  dispatch => {
    dispatch(user());
    return axios.get(`/api/users/${id}`)
      .then((res) => {
        dispatch(userSuccess(res.data))
      }).catch(() => {
        dispatch(userFailure())
      })
  }
)

export const editRequest = (id, data) => (
  dispatch => {
    dispatch(edit());
    data.append('_method', 'PUT');
    return axios.post(`/api/users/${id}`, data)
      .then(() => {
        dispatch(editSuccess())
      }).catch((err) => {
        dispatch(editFailure(err))
      })
  }
)

export const followRequest = (data) => (
  dispatch => {
    dispatch(follow());
    return axios.post('/api/follow', data)
      .then(() => {
        dispatch(followSuccess())
      }).catch((err) => {
        dispatch(followFailure(err))
      })
  }
)

const initialState = {
  get: {
    status: 'INIT',
    user: null
  },
  edit: {
    status: 'INIT'
  },
  follow: {
    status: 'INIT'
  }
}

export default handleActions(
  {
    /* GET ACTIONS */
    [USER_GET]: (state) => 
      produce(state, draft => {
        draft.get = {
          status: 'WAITING'
        }
    }),
    [USER_GET_SUCCESS]: (state, action) =>
      produce(state, draft => {
        draft.get = {
          status: 'SUCCESS',
          user: action.payload
        }
      }),
    [USER_GET_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.get = {
          status: 'FAILURE',
        }
      }),

    /* EDIT ACTIONS */
    [USER_EDIT]: (state) => 
      produce(state, draft => {
        draft.edit = {
          status: 'WAITING'
        }
    }),
    [USER_EDIT_SUCCESS]: (state) =>
      produce(state, draft => {
        draft.edit = {
          status: 'SUCCESS',
        }
      }),
    [USER_EDIT_FAILURE]: (state) =>
      produce(state, draft => {
        draft.edit = {
          status: 'FAILURE',
        }
      }),
      
    /* FOLLOW ACTIONS */
    [USER_FOLLOW]: (state) => 
      produce(state, draft => {
        draft.follow = {
          status: 'WAITING'
        }
    }),
    [USER_FOLLOW_SUCCESS]: (state) =>
      produce(state, draft => {
        draft.follow = {
          status: 'SUCCESS',
        }
      }),
    [USER_FOLLOW_FAILURE]: (state) =>
      produce(state, draft => {
        draft.follow = {
          status: 'FAILURE',
        }
      })
  },
  initialState
);