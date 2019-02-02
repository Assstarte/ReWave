import React, { Component } from "react";
import Header from "./Header";
import Dashboard from "./Dashboard";

import { Container, Row, Col } from "react-bootstrap";

class Main extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Container fluid style={{ margin: 0, padding: 0 }}>
          <Row noGutters>
            <Col xs={3}>
              <Dashboard />
            </Col>
            <Col />
          </Row>
        </Container>
        ;
      </React.Fragment>
    );
  }
}

export default Main;
