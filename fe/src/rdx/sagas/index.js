import { fork, all } from "redux-saga/effects";
import login_saga from "./login_saga";

export default function* root() {
  yield all([fork(login_saga)]);
}
