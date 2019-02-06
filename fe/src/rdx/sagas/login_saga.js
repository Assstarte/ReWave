import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAILURE
} from "../actions/types";
import { gql } from "../../constants";

//================
//GQL Queries
//================
const GQL_LOGIN = ``;
//================

export function* do_login_saga() {
  try {
    const srv_payload = yield call(gql.request, "QUERY");
    const srv_payload_json = yield call(srv_payload.json());
    yield put({ type: LOGIN_REQUEST_SUCCESS, payload: srv_payload_json });
  } catch (err) {
    yield put({ type: LOGIN_REQUEST_FAILURE, payload: err.message });
  }
}

export default function* watch_login_saga() {
  yield takeLatest(LOGIN_REQUEST, do_login_saga);
}
