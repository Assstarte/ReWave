import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";

const persistedState = localStorage.getItem("reduxState")
  ? JSON.parse(localStorage.getItem("reduxState"))
  : {};

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(sagaMiddleware)
);

export default store;
