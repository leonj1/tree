import { all, call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios';
import {
  SUCCESS_GET_INITIAL_PATH,
  FAILED_GET_INITIAL_PATH,
  START_GET_INITIAL_PATH
} from '../redux/actions';

// worker Saga: will be fired on START_GET_INITIAL_PATH actions
function* fetchInitialPath(action) {
  let payload = action.payload,
      bri = payload.bri,
      path = payload.path;

  try {
    const contents = yield call(
      axios.get,
      "http://zkui-local.bloomberg.com/api/" + bri + "?path=" + path,
      {headers: {'username': 'jleon43'}}
    );
    let value = "";
    if (contents) {
      value = contents.data;
    }
    yield put({
      type: SUCCESS_GET_INITIAL_PATH,
      payload: {
        contents: value
      }
    });
  } catch (e) {
    yield put({
      type: FAILED_GET_INITIAL_PATH,
      request: {
        status: e.response.status,
        reason: e.response.data
      }
    });
  }
}

// register Sagas to state
// const createSecretSaga = takeLatest(START_CREATE_SECRET, createSecret);
// const fetchTokenSaga = takeLatest(START_FETCH_SECRET, fetchSecret);
const fetchGetInitialPathSaga = takeLatest(START_GET_INITIAL_PATH, fetchInitialPath);

function* rootSaga() {
    yield all([
      fetchGetInitialPathSaga
    ])
}

export default rootSaga;
