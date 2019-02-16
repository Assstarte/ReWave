import {
  LOGIN_REQUEST,
  SIGNUP_REQUEST,
  WHOAMI,
  PRELOAD_INFO_INIT
} from "./types";

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

export const AC_PRELOAD_FILE_INFO = (tags, cover_path) => ({
  type: PRELOAD_INFO_INIT,
  payload: tags,
  cover: cover_path
});
