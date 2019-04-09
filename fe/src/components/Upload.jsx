import React, { Component } from "react";
import UploadAvatar from "./UploadAvatar";
//import { ProgressBar } from "react-fetch-progressbar";
import FileInput from "./FileInput";
import FileInfo from "./FileInfo";
import Dashboard from "./Dashboard";
import Header from "./Header";
import { Container, Row, Col } from "react-bootstrap";

class Upload extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="tc no-canvas">
          <Header />
          <Container className="mainpage" fluid style={{ margin: 0, padding: 0 }}>
            <Row noGutters>
              <Col xs={2}>
                <Dashboard />
              </Col>
              <Col xs={10}>
                <FileInput />
              </Col>
            </Row>
          </Container>

        </div>
      </React.Fragment>
    );
  }
}

export default Upload;
