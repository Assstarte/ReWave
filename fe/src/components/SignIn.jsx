import React, { Component } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { connect } from "react-redux";

import { LOGIN_REQUEST } from "../rdx/actions/types";
import { SIGNUP_REQUEST } from "../rdx/actions/types";

class SignIn extends Component {
  componentDidMount() {
    this.props.dispatch({ type: SIGNUP_REQUEST });
    console.log("DID MOUNT");
  }

  render() {
    return (
      <div className="bg-blurred-1 cover">
        <Header />
        <main className="pa4 black-80 mainpage">
          <form className="measure center">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f4 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="login">
                  Login
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="login"
                  id="login"
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                />
              </div>
              <label className="pa0 ma0 lh-copy f6 pointer">
                <input type="checkbox" /> Remember me
              </label>
            </fieldset>

            <div className="">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
              />
            </div>
            <div className="lh-copy mt3">
              <a href="#0" className="f6 link dim black db">
                Sign up
              </a>
              <a href="#0" className="f6 link dim black db">
                Forgot your password?
              </a>
            </div>
          </form>
        </main>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn,
  pending: state.auth.request_pending,
  done: state.auth.request_done,
  error: state.auth.request_error,
  user_id: state.auth.user_id,
  user_name: state.auth.user_name
});

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
