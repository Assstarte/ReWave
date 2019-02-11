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

export function* do_login_saga(action) {
  console.dir(action.payload);
  const GQL = `
  query login($loginInput: LoginInput){
    exec_login(loginInput: $loginInput){
      success{
        done
      }
      userdata{
        id
        login
        email
        full_name
        account_type
      }
    }
  }
`;

  const variables = {
    loginInput: {
      login: action.payload.un,
      password: action.payload.pw
    }
  };
  try {
    const srv_payload = yield call([gql, gql.request], GQL, variables);
    yield put({ type: LOGIN_REQUEST_SUCCESS, payload: srv_payload.exec_login });
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
