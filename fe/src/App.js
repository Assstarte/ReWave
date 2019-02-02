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

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div id="app">
          <Router history={createHistory()}>
            <div>
              <Switch>
                <Route path="/" component={SignIn} exact />
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

export default App;
