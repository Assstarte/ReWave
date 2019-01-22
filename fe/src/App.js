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

import Home from "./components/Home";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div id="app">
          <Router history={createHistory()}>
            <div>
              <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/home" component={Home} />
              </Switch>
            </div>
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
