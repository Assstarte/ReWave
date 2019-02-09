import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAILURE,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST
} from "../actions/types";
import { gql } from "../../constants";

//================
//GQL Queries
//================
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

export function* do_signup_saga(action) {
  console.log("IN DO SAGA");
  console.dir(action.payload);
  const GQL = `
  mutation{
    exec_signup(userInput: {
      login: "${action.payload.un}",
      password: "${action.payload.pw}",
      email: "${action.payload.em}",
      full_name: "${action.payload.fn}"
    }){
      done
    }
  }
`;

  console.dir(`==============> GQL_QUERY ====> ${GQL}`);
  try {
    const srv_payload = yield call([gql, gql.request], GQL);
    yield put({ type: SIGNUP_SUCCESS, payload: srv_payload });
  } catch (err) {
    yield put({ type: SIGNUP_FAILURE, payload: err.message });
  }
}

export default function* watch_auth_saga() {
  console.log("IN WATCHER SAGA");
  yield takeLatest(LOGIN_REQUEST, do_login_saga);
  yield takeEvery(SIGNUP_REQUEST, do_signup_saga);
}
