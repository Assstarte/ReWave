import React, { Component } from "react";
import { Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import store from "../../rdx/store";

import { DISMISS_ERRORS } from "../../rdx/actions/types";

class AlertDismissable extends React.Component {
  constructor(props) {
    super(props);
    //this.state = props.displayOnce ? { show: true } : { show: false };
  }

  render() {
    const handleHide = () => {
      //this.setState({ show: false });
      store.dispatch({ type: DISMISS_ERRORS });
    };

    return (
      <>
        <Alert
          show={this.props.display}
          variant={this.props.type}
          style={{
            width: "200px",
            height: "100px",
            fontSize: "12px",
            position: "absolute",
            top: "10%",
            left: "10%",
            color: "#000"
          }}
        >
          <Alert.Heading
            style={{
              color: "#000",
              fontSize: "12px"
            }}
          >
            {this.props.heading}
          </Alert.Heading>
          <p>{this.props.message}</p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={handleHide} variant="outline-danger">
              Dismiss
            </Button>
          </div>
        </Alert>
      </>
    );
  }
}

export default AlertDismissable;
