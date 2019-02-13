import React, { Component } from "react";
import { connect } from "react-redux";

const LoginGreeting = props => (
  <div
    className="login-greeting tc"
    style={{ color: props.loggedIn ? `#4bff44` : `#000` }}
  >
    <h4>
      {props.loggedIn
        ? `Logged in as >   ${props.user_name}`
        : "Not Authenticated"}
    </h4>
  </div>
);

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn,
  user_id: state.auth.user_id,
  user_name: state.auth.user_name
});

export default connect(
  mapStateToProps,
  {}
)(LoginGreeting);
