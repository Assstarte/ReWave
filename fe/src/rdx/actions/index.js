import { LOGIN_REQUEST, SIGNUP_REQUEST } from "./types";

export const AC_SIGNUP = ({ un, pw, em, fn }) => ({
  type: SIGNUP_REQUEST,
  payload: {
    un,
    pw,
    em,
    fn
  }
});

export const AC_LOGIN = ({ un, pw }) => ({
  type: LOGIN_REQUEST,
  payload: {
    un,
    pw
  }
});
