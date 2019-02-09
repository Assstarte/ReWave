import { SIGNUP_REQUEST } from "./types";

export const AC_SIGNUP = ({ un, pw, em, fn }) => ({
  type: SIGNUP_REQUEST,
  payload: {
    un,
    pw,
    em,
    fn
  }
});
