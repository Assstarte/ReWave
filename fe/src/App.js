import React, { Component } from "react";

//==============
//     RDX
//==============

import { Provider } from "react-redux";
import { connect } from "react-redux";
import { Router, Route, Link, Switch } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';
import store from "./rdx/store";

//==============
//  Components
//==============

import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Upload from "./components/Upload";
import Main from "./components/Main";
import PlaylistsPanel from "./components/PlaylistsPanel";

//==============
//Fetch Bar
//==============
import { progressBarFetch, setOriginalFetch } from "react-fetch-progressbar";
import { WHOAMI_REQUEST } from "./rdx/actions/types";
import TrackPanel from "./components/TrackPanel";
import Profile from "./components/pages/Profile";

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
          <BrowserRouter>
            <div>
              <Switch>
                <Route
                  path="/"
                  component={this.props.loggedIn ? Main : SignIn}
                  exact
                />
                <Route path="/login" component={SignIn} />
                <Route
                  path="/home"
                  component={this.props.loggedIn ? Main : SignIn}
                />
                <Route path="/register" component={SignUp} />
                <Route path="/profile" component={this.props.loggedIn ? Profile : SignIn} />
                <Route path="/upload" component={Upload} />
                <Route path="/dash" component={this.props.loggedIn ? Main : SignIn} />
                <Route path="/test" component={TrackPanel} />
                <Route path="/playlists" component={this.props.loggedIn ? PlaylistsPanel : SignIn} />
              </Switch>
            </div>
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}

//Persisting Redux State
store.subscribe(() => {
  let wholeState = store.getState();
  localStorage.setItem("reduxAuthState", JSON.stringify(wholeState.auth));
});

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn
});

export default connect(
  mapStateToProps,
  {}
)(App);
