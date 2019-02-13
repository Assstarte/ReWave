import React, { Component } from "react";

//==============
//     RDX
//==============

import { Provider } from "react-redux";
import { connect } from "react-redux";
import { Router, Route, Link, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import store from "./rdx/store";

//==============
//  Components
//==============

import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Upload from "./components/Upload";
import Main from "./components/Main";

//==============
//Fetch Bar
//==============
import { progressBarFetch, setOriginalFetch } from "react-fetch-progressbar";
import { WHOAMI_REQUEST } from "./rdx/actions/types";

// Let react-fetch-progressbar know what the original fetch is.
setOriginalFetch(window.fetch);

/*
  Now override the fetch with progressBarFetch, so the ProgressBar
  knows how many requests are currently active.
*/
window.fetch = progressBarFetch;

class App extends Component {
  componentDidMount() {
    store.dispatch({ type: WHOAMI_REQUEST });
  }

  render() {
    return (
      <Provider store={store}>
        <div id="app">
          <Router history={createHistory()}>
            <div>
              <Switch>
                <Route
                  path="/"
                  component={store.getState().auth.loggedIn ? Main : SignIn}
                  exact
                />
                <Route path="/login" component={SignIn} />
                <Route path="/home" component={SignIn} />
                <Route path="/register" component={SignUp} />
                <Route path="/upload" component={Upload} />
                <Route path="/dash" component={Main} />
              </Switch>
            </div>
          </Router>
        </div>
      </Provider>
    );
  }
}

//Persisting Redux State
store.subscribe(() => {
  localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});

export default App;
