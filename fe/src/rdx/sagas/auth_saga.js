import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAILURE,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  WHOAMI,
  WHOAMI_REQUEST,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE
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
    mutation signup($userInput: UserInput){
      exec_signup(userInput: $userInput){
        done
      }
    }
  `;

  const variables = {
    userInput: {
      login: action.payload.un,
      password: action.payload.pw,
      email: action.payload.em,
      full_name: action.payload.fn
    }
  };

  console.dir(`==============> GQL_QUERY ====> ${GQL}`);
  try {
    const srv_payload = yield call([gql, gql.request], GQL, variables);
    yield put({ type: SIGNUP_SUCCESS, payload: srv_payload });
  } catch (err) {
    yield put({ type: SIGNUP_FAILURE, payload: err.message });
  }
}

export function* do_whoami_saga() {
  const raw_payload = yield call(fetch, "/whoami", {
    credentials: `include`,
    mode: `cors`
  });

  console.dir(raw_payload);

  const srv_payload = yield call([raw_payload, raw_payload.json]);
  yield put({ type: WHOAMI, payload: srv_payload });
}

export function* do_logout_saga() {
  const GQL = `
    query{
      exec_logout{
        erased
      }
    }
  `;
  let raw_payload;
  try {
    raw_payload = yield call([gql, gql.request], GQL);
    yield put({ type: LOGOUT_SUCCESS });
  } catch (err) {
    yield put({ type: LOGOUT_FAILURE });
    return;
  }

  yield put({
    type: raw_payload.exec_logout.erased ? LOGOUT_SUCCESS : LOGOUT_FAILURE
  });
}

export default function* watch_auth_saga() {
  console.log("IN WATCHER SAGA");
  yield takeLatest(LOGIN_REQUEST, do_login_saga);
  yield takeEvery(SIGNUP_REQUEST, do_signup_saga);
  yield takeLatest(WHOAMI_REQUEST, do_whoami_saga);
  yield takeEvery(LOGOUT_REQUEST, do_logout_saga);
}
