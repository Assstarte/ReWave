import React from "react";
import { Link } from "react-router-dom";
import Dropzone from "./Dropzone";
import MyDropzone from "./MyDropzone";
import { Container, Row, Col } from "react-bootstrap";
import Dashboard from "./Dashboard";
import Header from "./Header";

const UploadMultiple = (props) => {
    return (
        <React.Fragment>
            <div className="tc">
                <Header />
                <Container className="mainpage" fluid style={{ margin: 0, padding: 0 }}>
                    <Row noGutters>
                        <Col xs={2}>
                            <Dashboard />
                        </Col>
                        <Col xs={10}>
                            <MyDropzone />
                        </Col>
                    </Row>
                </Container>

            </div>
        </React.Fragment>
    )
}

export default UploadMultiple;