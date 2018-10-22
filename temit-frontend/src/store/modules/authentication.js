import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';
import { produce } from 'immer';

const REGISTER = 'auth/REGISTER';
const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS';
const REGISTER_FAILURE = 'auth/REGISTER_FAILURE';
const LOGIN = 'auth/LOGIN';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'auth/LOGIN_FAILURE';
const LOGOUT = 'auth/LOGOUT';

export const register = createAction(REGISTER);
export const registerSuccess = createAction(REGISTER_SUCCESS);
export const registerFailure = createAction(REGISTER_FAILURE, err => err);
export const login = createAction(LOGIN);
export const loginSuccess = createAction(LOGIN_SUCCESS);
export const loginFailure = createAction(LOGIN_FAILURE);
export const logout = createAction(LOGOUT);

    // CSRF TOKEN 
    // window.axios.get('http://localhost:8000/').then(res=>console.log(res));


axios.defaults.baseURL = 'http://localhost:8000/api'

export const registerRequest = data => (
  dispatch => {
    dispatch(register);

    return axios.post('/register', data)
      .then((res) => {
        console.log(res);
        dispatch(registerSuccess());
      })
      .catch((err) => {
        console.log(err);
        dispatch(registerFailure(err));
      });
  }
);

export const loginRequest = data => (
  dispatch => {
    dispatch(login);

    return axios.post('/login', data)
      .then((res) => {
        console.log(res);
        dispatch(loginSuccess());
      })
      .catch((err) => {
        console.log(err);
        dispatch(loginFailure());
      });
  }
);

export const logoutRequest = data => (
  dispatch => {
    return axios.post('/logout', data)
      .then((res) => {
        console.log(res);
        dispatch(logout());
      })
  }
);

const initialState = {
  login: {
    stauts: 'INIT'
  },
  register: {
    status: 'INIT',
    error: -1
  },
  status: {
    isLoggedIn: false,
    currentUser: ''
  }
}

export default handleActions(
  {
    [REGISTER]: (state) => 
      produce(state, draft => {
        draft.register = {
          status: 'WAITING',
          error: -1
        }
      }),
    [REGISTER_SUCCESS]: (state) =>
      produce(state, draft => {
        draft.register = {
          status:'SUCCESS',
        }
      }),
    [REGISTER_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.register = {
          status:'FAILURE',
          error: action.error
        }
      }),
    [LOGIN]: (state) => 
      produce(state, draft => {
        draft.login = {
          status: 'WAITING',
        }
      }),
    [LOGIN_SUCCESS]: (state, action) =>
      produce(state, draft => {
        draft.login = {
          status:'SUCCESS',
        };
        draft.status = {
          isLoggedIn: true,
        }
      }),
    [LOGIN_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.login = {
          status:'FAILURE'
        }
      }),
    [LOGOUT]: (state) =>
      produce(state, draft => {
        draft.status = {
          isLoggedIn: false,
          currentUser: ''
        }
      }),
  },
  initialState
);

