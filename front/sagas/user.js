import { all, delay, fork, put, takeLatest } from 'redux-saga/effects';

// function loginApi(data) {
//   return axios.post('/api/login', data);
// }

function* logIn(action) {
  try {
    yield delay(2000);
    // const result = yield call(loginApi, action.data);
    yield put({
      type: 'LOG_IN_SUCCESS',
      data: { ...action.data, nickname: 'hanumoka' },
    });
  } catch (err) {
    yield put({
      type: 'LOG_IN_FAILURE',
      // data: err.response.data,
    });
  }
}

function* logout(action) {
  try {
    yield delay(2000);
    // const result = yield call(loginApi, action.data);
    yield put({
      type: 'LOG_OUT_SUCCESS',
      // data: result.data,
    });
  } catch (err) {
    yield put({
      type: 'LOG_OUT_FAILURE',
      // data: err.response.data,
    });
  }
}

function* watchLogin() {
  yield takeLatest('LOG_IN_REQUEST', logIn);
}

function* watchLogOut() {
  yield takeLatest('LOG_OUT_REQUEST', logout);
}

export default function* userSaga() {
  yield all([fork(watchLogin), fork(watchLogOut)]);
}
