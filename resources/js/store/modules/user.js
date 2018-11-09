import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';
import { produce } from 'immer';

const USER_GET = 'user/USER_GET'
const USER_GET_SUCCESS = 'user/USER_GET_SUCCESS'
const USER_GET_FAILURE = 'user/USER_GET_FAILURE'
const USER_EDIT = 'user/USER_EDIT'
const USER_EDIT_SUCCESS = 'user/USER_EDIT_SUCCESS'
const USER_EDIT_FAILURE = 'user/USER_EDIT_FAILURE'

export const user = createAction(USER_GET)
export const userSuccess = createAction(USER_GET_SUCCESS, user => user)
export const userFailure = createAction(USER_GET_FAILURE)
export const edit = createAction(USER_EDIT)
export const editSuccess = createAction(USER_EDIT_SUCCESS)
export const editFailure = createAction(USER_EDIT_FAILURE)

export const userRequest = id => (
  dispatch => {
    dispatch(user());
    return axios.get(`/api/users/${id}`)
      .then((res) => {
        dispatch(userSuccess(res.data))
      }).catch(() => {
        dispatch(postFailure())
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
      })
  },
  initialState
);