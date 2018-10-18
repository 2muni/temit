import {
  ARTICLE_POST,
  ARTICLE_POST_SUCCESS,
  ARTICLE_POST_FAILURE,
} from './ActionTypes';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8000/api"

export function articlePostRequest(data) {
  return (dispatch) => {
    dispatch(articlePost());

    return axios.post('/articles', data)
    .then((res) => {
      dispatch(articlePostSuccess());
    }).catch((err) => {
      dispatch(articlePostFailure(err));
    })
  }
}

export function articlePost() {
  return {
    type: ARTICLE_POST
  };
}
export function articlePostSuccess() {
  return {
    type: ARTICLE_POST_SUCCESS
  };
}
export function articlePostFailure(error) {
  return {
    type: ARTICLE_POST_FAILURE,
    error
  };
}