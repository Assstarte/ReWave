import { fork, all } from "redux-saga/effects";
import auth_saga from "./auth_saga";

export default function* root() {
  yield all([fork(auth_saga)]);
}
