import {
  ARTICLE_POST,
  ARTICLE_POST_SUCCESS,
  ARTICLE_POST_FAILURE,
  ARTICLE_POST_VALUE
} from './ActionTypes';
import axios from 'axios';

const POST_URL = '';

export function articlePostRequest(data) {
  return (dispatch) => {
    dispatch(articlePost());

    return axios.post(POST_URL, data)
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
export function articlePostValue(value) {
  return {
    type: ARTICLE_POST_VALUE,
    value
  }
}