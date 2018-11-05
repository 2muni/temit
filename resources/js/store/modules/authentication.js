import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';
import { produce } from 'immer';

const AUTH_REGISTER = "AUTH_REGISTER"
const AUTH_REGISTER_SUCCESS = "AUTH_REGISTER_SUCCESS"
const AUTH_REGISTER_FAILURE = "AUTH_REGISTER_FAILURE"

export const register = createAction(AUTH_REGISTER);
export const registerSuccess = createAction(AUTH_REGISTER_SUCCESS);
export const registerFailure = createAction(AUTH_REGISTER_FAILURE);

export const registerRequest = data => (
  dispatch => {
    dispatch(register())
    return axios.post('/api/auth/signup', data, {
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }})
    .then(() => dispatch(registerSuccess()))
    .catch((err) => dispatch(registerFailure(err)))
  }
)

const initialState = {
  login: {
    status: 'INIT'
  },
  register: {
    status: 'INIT'
  },
  status: {
    valid: false,
    isLoggedIn: false,
    currentUser: ''
  }
}

export default handleActions(
  {
    [AUTH_REGISTER]: (state, action) =>
      produce(state, draft => {
        draft.register = {
          status: 'WAITING'
        }
      }),
    [AUTH_REGISTER_SUCCESS]: (state, action) =>
      produce(state, draft => {
        draft.register = {
          status: 'SUCCESS'
        }
      }),
    [AUTH_REGISTER_FAILURE]: (state) =>
      produce(state, draft => {
        draft.register = {
          status: 'FAILURE'
        }
      })
  },
  initialState
);