import auth_reducer from "./auth_reducer";
import { combineReducers } from "redux";

export default combineReducers({
  auth: auth_reducer
});
