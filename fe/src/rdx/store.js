import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";

const persistedAuthState = localStorage.getItem("reduxAuthState")
  ? JSON.parse(localStorage.getItem("reduxAuthState"))
  : {};

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  persistedAuthState,
  applyMiddleware(sagaMiddleware)
);

store.runSaga = sagaMiddleware.run;

store.subscribe(() => console.log(store.getState()));

export default store;
