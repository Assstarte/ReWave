import React from "react";
import { PURE_BACKEND_HOST } from "../../constants/index";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Dashboard from "../Dashboard";
import Header from "../Header";

const UploadTypeSelection = (props) => {
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
                            <div className="tc">
                                <Link to="/upload/single">
                                    <button className="file-input-label pulse">Single Track</button>
                                </Link>

                                <Link to="/upload/multi">
                                    <button className="file-input-label pulse">Multiple Tracks</button>
                                </Link>
                            </div>
                        </Col>
                    </Row>
                </Container>

            </div>
        </React.Fragment>
    )
}

export default UploadTypeSelection;