import React, { Component } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { connect } from "react-redux";
import AlertSuccessForwardTo from "./bootstrap/AlertSuccessForwardTo";
import AlertErrorDismissable from "./bootstrap/AlertErrorDismissable";

//========
//Actions
//========
import { AC_LOGIN } from "../rdx/actions";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this._loginRef = React.createRef();
    this._passwordRef = React.createRef();

    //Bind context to handlers
    this.submitLoginRequest.bind(this);
  }

  render() {
    return (
      <div className="bg-blurred-1 cover">
        <Header />
        <main className="pa4 black-80 mainpage">
          <div className="tc">
            <AlertErrorDismissable
              type="danger"
              heading="Lamentably!"
              message="Invalid Credentials"
              display={this.props.error ? true : false}
            />

            <AlertSuccessForwardTo
              type="success"
              heading="Success!"
              message={`Welcome, ${this.props.user_name}`}
              btnText="Dashboard >"
              path="/dash"
              redirect
              display={this.props.done && !this.props.error ? true : false}
              history={this.props.history}
            />
          </div>
          <form
            className="measure center"
            onSubmit={e => this.submitLoginRequest(e)}
          >
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
                  ref={this._loginRef}
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
                  ref={this._passwordRef}
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

              <div
                className="spinner"
                style={{
                  display: this.props.pending ? "inline-block" : "none",
                  float: "right"
                }}
              >
                <span>LOADING...</span>
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
            </div>

            <div className="lh-copy mt3">
              <a href="#0" className="f6 link dim black db">
                Sign Up
              </a>
              <a href="#0" className="f6 link dim black db">
                Forgot your password?
              </a>
            </div>
          </form>
        </main>
        
      </div>
    );
  }

  submitLoginRequest(e) {
    e.preventDefault();
    this.props.dispatch(
      this.props.AC_LOGIN({
        un: this._loginRef.current.value,
        pw: this._passwordRef.current.value
      })
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
    dispatch,
    AC_LOGIN
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
