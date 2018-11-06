import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';
import { produce } from 'immer';
import { createCookie, getCookie } from '../../lib/cookie'

const AUTH_REGISTER = "AUTH_REGISTER"
const AUTH_REGISTER_SUCCESS = "AUTH_REGISTER_SUCCESS"
const AUTH_REGISTER_FAILURE = "AUTH_REGISTER_FAILURE"
const AUTH_LOGIN = "AUTH_LOGIN"
const AUTH_LOGIN_SUCCESS = "AUTH_LOGIN_SUCCESS"
const AUTH_LOGIN_FAILURE = "AUTH_LOGIN_FAILURE"
const AUTH_USER = "AUTH_USER"
const AUTH_USER_SUCCESS = "AUTH_USER_SUCCESS"
const AUTH_USER_FAILURE = "AUTH_USER_FAILURE"
const AUTH_LOGOUT = "AUTH_LOGOUT"

export const register = createAction(AUTH_REGISTER);
export const registerSuccess = createAction(AUTH_REGISTER_SUCCESS);
export const registerFailure = createAction(AUTH_REGISTER_FAILURE);
export const login = createAction(AUTH_LOGIN);
export const loginSuccess = createAction(AUTH_LOGIN_SUCCESS);
export const loginFailure = createAction(AUTH_LOGIN_FAILURE);
export const user = createAction(AUTH_USER);
export const userSuccess = createAction(AUTH_USER_SUCCESS);
export const userFailure = createAction(AUTH_USER_FAILURE);
export const logout = createAction(AUTH_LOGOUT);

export const registerRequest = data => (
  dispatch => {
    dispatch(register())
    return axios.post('/api/auth/signup', data, {
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }})
    .then(() => {
      dispatch(registerSuccess())
    })
    .catch((err) => {
      dispatch(registerFailure(err))
    })
  }
)

export const loginRequest = data => (
  dispatch => {
    dispatch(register())
    return axios.post('/api/auth/login', data, {
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }})
    .then((res) => {
      dispatch(loginSuccess())
      createCookie('token', res.data)
      userRequest()
    })
    .catch((err) => {
      dispatch(loginFailure(err))
    })
  }
)

export const userRequest = () => (
  dispatch => {
    dispatch(user())
    return axios.get('/api/auth/user', {
      headers: {
        'Authorization': getCookie('token').token_type+' '+getCookie('token').access_token
      }})
    .then((res) => {
      dispatch(userSuccess(res))
      createCookie('user', {
        isLoggedIn: true,
        currentUser: res.data.name
      })
    })
    .catch((err) => {
      dispatch(userFailure(err))
      createCookie('user', {
        isLoggedIn: false,
        currentUser: ''
      })
    })
  }
)

export const logoutRequest = () => (
  dispatch => {
    return axios.get('/api/auth/logout', {
      headers: {
        'Authorization': getCookie('token').token_type+' '+getCookie('token').access_token
      }})
    .then(() => {
      dispatch(logout())
    })
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
    /* REGISTER ACTIONS */
    [AUTH_REGISTER]: (state) =>
      produce(state, draft => {
        draft.register['status'] = 'WAITING'
      }),
    [AUTH_REGISTER_SUCCESS]: (state) =>
      produce(state, draft => {
        draft.register['status'] = 'SUCCESS'
      }),
    [AUTH_REGISTER_FAILURE]: (state) =>
      produce(state, draft => {
        draft.register['status'] = 'FAILURE'
      }),

    /* LOGIN ACTIONS */
    [AUTH_LOGIN]: (state) =>
      produce(state, draft => {
        draft.login['status'] = 'WAITING'
      }),
    [AUTH_LOGIN_SUCCESS]: (state) =>
      produce(state, draft => {
        draft.login['status'] = 'SUCCESS'
      }),
    [AUTH_LOGIN_FAILURE]: (state) =>
      produce(state, draft => {
        draft.login['status'] = 'FAILURE'
      }),
    
    /* USER ACTIONS */
    [AUTH_USER]: (state) =>
      produce(state, draft => {
        draft.status['isLoggedIn'] = true
      }),
    [AUTH_USER_SUCCESS]: (state, action) =>
      produce(state, draft => {
        draft.status['valid'] = true
        draft.status['currentUser'] = action.payload.data
      }),
    [AUTH_USER_FAILURE]: (state) =>
      produce(state, draft => {
        draft.status['valid'] = false
        draft.status['isLoggedIn'] = false
      }),

    /* LOGOUT ACTIONS */
    [AUTH_LOGOUT]: (state) =>
      produce(state, draft => {
        draft.status['isLoggedIn'] = false
        draft.status['currentUser'] = ''
      }),
  },
  initialState
);