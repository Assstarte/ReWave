import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  PRELOAD_INFO_INIT,
  PRELOAD_INFO_SUCCESS,
  PRELOAD_INFO_FAILURE
} from "../actions/types";

export function* do_file_info_saga() {
  //   try {
  //     const srv_payload = yield call(fetch, "/login");
  //     const srv_payload_json = yield call(srv_payload.json());
  //     yield put({ type: LOGIN_REQUEST_SUCCESS, payload: srv_payload_json });
  //   } catch (err) {
  //     yield put({ type: LOGIN_REQUEST_FAILURE, payload: err.message });
  //   }
}

export default function* watch_file_info() {
  yield takeEvery(PRELOAD_INFO_INIT, do_file_info_saga);
}
