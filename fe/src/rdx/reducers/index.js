import auth_reducer from "./auth_reducer";
import { combineReducers } from "redux";
import file_reducer from "./file_reducer";

export default combineReducers({
  auth: auth_reducer,
  file: file_reducer
});
