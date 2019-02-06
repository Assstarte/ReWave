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
const GQL_LOGIN = ``;
const GQL_SIGNUP = `
  mutation{
    exec_signup(userInput: {
      login: "SAGA RABOTAET!",
      password: "1234",
      email: "igorlox111@lox.ru",
      full_name: "Sobaka Pidar"
    }){
      done
    }
  }
`;
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

export function* do_signup_function() {
  console.log("IN DO SAGA");
  try {
    const srv_payload = yield call([gql, gql.request], GQL_SIGNUP);
    yield put({ type: SIGNUP_SUCCESS, payload: srv_payload });
  } catch (err) {
    yield put({ type: SIGNUP_FAILURE, payload: err.message });
  }
}

export default function* watch_login_saga() {
  console.log("IN WATCHER SAGA");
  yield takeLatest(LOGIN_REQUEST, do_login_saga);
  yield takeEvery(SIGNUP_REQUEST, do_signup_function);
}
