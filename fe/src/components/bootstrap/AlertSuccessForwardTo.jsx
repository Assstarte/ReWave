import React, { Component } from "react";
import { Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import store from "../../rdx/store";

import { DISMISS_SUCCESS } from "../../rdx/actions/types";

class AlertSuccessForwardTo extends React.Component {
  constructor(props) {
    super(props);
    //this.state = props.displayOnce ? { show: true } : { show: false };
  }

  render() {
    return (
      <>
        <Alert
          show={this.props.display}
          variant={this.props.type}
          style={{
            position: "fixed"
          }}
        >
          <Alert.Heading
            style={{
              color: "#000",
              fontSize: "12px",
              height: "10px"
            }}
          >
            {this.props.heading}
          </Alert.Heading>
          <p>{this.props.message}</p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button
              onClick={e => this.forwardTo(this.props.path || "/login")}
              variant="outline-success"
            >
              {this.props.btnText}
            </Button>
          </div>
        </Alert>
      </>
    );
  }

  forwardTo(path) {
    store.dispatch({ type: DISMISS_SUCCESS });
    if (this.props.redirect) this.props.history.push(path);
  }
}

export default AlertSuccessForwardTo;
