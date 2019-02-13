import { fork, all } from "redux-saga/effects";
import auth_saga from "./auth_saga";
import file_saga from "./file_saga";

export default function* root() {
  yield all([fork(auth_saga), fork(file_saga)]);
}
