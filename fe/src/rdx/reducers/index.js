import auth_reducer from "./auth_reducer";
import { combineReducers } from "redux";
import file_reducer from "./file_reducer";
import data_reducer from "./data_reducer"
import player_reducer from "./player_reducer";

export default combineReducers({
  auth: auth_reducer,
  file: file_reducer,
  data: data_reducer,
  player: player_reducer
});
