import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";

const persistedState = localStorage.getItem("reduxState")
  ? JSON.parse(localStorage.getItem("reduxState"))
  : {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(...middleware)
);

export default store;
