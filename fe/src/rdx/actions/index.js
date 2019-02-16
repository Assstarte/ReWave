import {
  LOGIN_REQUEST,
  SIGNUP_REQUEST,
  WHOAMI,
  PRELOAD_INFO_INIT,
  PRELOAD_FILE_INFO_W_NAME
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

export const AC_PRELOAD_FILE_INFO = (tags, cover_path, renderName) => {
  if (tags && !renderName)
    return {
      type: PRELOAD_INFO_INIT,
      payload: tags,
      cover: cover_path
    };
  //If we have no info about track via ID3 tags, use actual name separating by "-"
  if (renderName)
    return {
      type: PRELOAD_INFO_INIT,
      payload: {
        artist: renderName.substr(0, renderName.indexOf("-")),
        title: renderName.substr(renderName.indexOf("-") + 1, renderName.length)
      }
    };
};
