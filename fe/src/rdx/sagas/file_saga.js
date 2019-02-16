import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  PRELOAD_INFO_INIT,
  PRELOAD_INFO_SUCCESS,
  PRELOAD_INFO_FAILURE
} from "../actions/types";

export function* do_file_info_saga(action) {
  yield put({
    type: PRELOAD_INFO_SUCCESS,
    payload: action.payload,
    cover: action.cover
  });
}

export default function* watch_file_info() {
  yield takeEvery(PRELOAD_INFO_INIT, do_file_info_saga);
}
