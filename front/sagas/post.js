import { all, delay, fork, put, takeLatest } from 'redux-saga/effects';
import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
} from '../reducers/post';
import axios from 'axios';

function addPostApi(data) {
  return axios.post('/api/post/', data);
}

function addCommentApi(data) {
  return axios.post('/api/post/${data.postId}/comment', data);
}

function* addPost(action) {
  try {
    yield delay(1000);
    // const result = yield call(loginApi, action.data);
    yield put({
      type: ADD_POST_SUCCESS,
      // data: result.data,
    });
  } catch (err) {
    yield put({
      type: ADD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function* addComment(action) {
  try {
    yield delay(1000);
    // const result = yield call(loginApi, action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      // data: result.data,
    });
  } catch (err) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
  yield all([fork(watchAddPost), fork(watchAddComment)]);
}