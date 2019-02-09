import React, { Component } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { connect } from "react-redux";
import AlertDismissable from "./bootstrap/AlertDismissable";

//========
//Actions
//========
import { AC_SIGNUP } from "../rdx/actions";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this._loginRef = React.createRef();
    this._passwordRef = React.createRef();
    this._emailRef = React.createRef();
    this._fullNameRef = React.createRef();

    //Bind context to handlers
    this.submitSignupRequest.bind(this);
  }

  render() {
    return (
      <div className="bg-blurred-1 cover">
        <Header />
        <main className="pa4 black-80">
          <div className="tc">
            <AlertDismissable
              type="danger"
              heading="Oops! An error occurred :("
              message="Looks like such account already exists"
              display={this.props.error ? true : false}
            />
          </div>

          <form
            className="measure center"
            onSubmit={e => this.submitSignupRequest(e)}
          >
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f4 fw6 ph0 mh0">Sign Up</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" for="login">
                  Login
                </label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="login"
                  id="login"
                  ref={this._loginRef}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" for="password">
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
              <div className="mv3">
                <label className="db fw6 lh-copy f6" for="fullname">
                  Full Name
                </label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="fullname"
                  id="fullname"
                  ref={this._fullNameRef}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" for="email-address">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  ref={this._emailRef}
                />
              </div>
            </fieldset>

            <div className="">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign up"
              />
            </div>
            <div className="lh-copy mt3">
              <a href="#0" className="f6 link dim black db">
                Already have an account? Login >
              </a>
            </div>
          </form>
        </main>
        <Footer />
      </div>
    );
  }

  //=============
  //Handlers
  //=============
  submitSignupRequest(e) {
    e.preventDefault();
    this.props.dispatch(
      this.props.AC_SIGNUP({
        un: this._loginRef.current.value,
        pw: this._passwordRef.current.value,
        em: this._emailRef.current.value,
        fn: this._fullNameRef.current.value
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

const mapDispatchToProps = dispatch => ({
  dispatch,
  AC_SIGNUP
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
