import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { LOGOUT_REQUEST } from "../../rdx/actions/types";
import { Dropdown, DropdownButton } from "react-bootstrap";

const LoginGreeting = props => (
  <div
    className="login-greeting tc"
    style={{ color: props.loggedIn ? `#4bff44` : `#000` }}
  >
    {/* <h4>
      {props.loggedIn
        ? `Logged in as >   ${props.user_name}`
        : "Not Authenticated"}
    </h4>
    <Button
      variant="outline-danger"
      style={{ display: props.loggedIn ? "inline-block" : "none" }}
      onClick={e => {
        props.dispatch({ type: LOGOUT_REQUEST });
      }}
    >
      Logout
    </Button> */}
    <DropdownButton
      drop={"right"}
      variant="dark"
      title={` Menu `}
      style={{ display: props.loggedIn ? "inline-block" : "none" }}
      id={`dropdown-button-drop-right`}
      key={"drdwn-rght"}
    >
      <Dropdown.Item eventKey="1">Profile</Dropdown.Item>
      {/* <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
    <Dropdown.Item eventKey="3">Something else here</Dropdown.Item> */}
      <Dropdown.Divider />
      <Dropdown.Item eventKey="4" onClick={e => {
        props.dispatch({ type: LOGOUT_REQUEST });
      }} >Logout</Dropdown.Item>
    </DropdownButton>

  </div>
);

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn,
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
)(LoginGreeting);
