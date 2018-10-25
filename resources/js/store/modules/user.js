import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';
import { produce } from 'immer';

import { getMetaData } from '../../lib/auth'

const GET_STATUS = 'user/GET_STATUS';
const GET_USER = 'user/GET_USER';
const LOGOUT = 'user/LOGOUT';

export const getStatus = createAction(GET_STATUS, res => res);
export const getUser = createAction(GET_USER, res => res);
export const logout = createAction(LOGOUT);

export const getStatusRequest = user => (
  dispatch => {
    return axios.get(`/api/users/${user}`)
      .then((res) =>
        dispatch(getStatus(res))
      )
  }
)

export const getUserRequest = user => (
  dispatch => {
    return axios.get(`/api/users/${user}`)
      .then((res) =>
        dispatch(getUser(res))
      )
  }
)

export const logoutRequest = data => 
  dispatch => {
    data.append('_token', getMetaData('csrf-token'));
    return axios.post('/logout', data)
      .then((res) =>
        dispatch(logout())
      )
  }


const initialState = {
  status: {
    id: '',
    username: '',
  },
  target: {
    id: '',
    username: '',
  }
}

export default handleActions(
  {
    [GET_STATUS]: (state, action) =>
      produce(state, draft => {
        draft.status = {
          id: action.payload.data.id,
          username: action.payload.data.name
        }
      }),
    [GET_USER]: (state, action) =>
      produce(state, draft => {
        draft.target = {
          id: action.payload.data.id,
          username: action.payload.data.name
        }
      }),
    [LOGOUT]: (state) =>
      produce(state, draft => {
        draft.status = {
          id: '',
          username: ''
        }
      })
  },
  initialState
);