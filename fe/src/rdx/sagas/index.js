import { fork, all } from "redux-saga/effects";
import auth_saga from "./auth_saga";
import file_saga from "./file_saga";
import data_saga from "./data_saga";

export default function* root() {
  yield all([fork(auth_saga), fork(file_saga), fork(data_saga)]);
}
