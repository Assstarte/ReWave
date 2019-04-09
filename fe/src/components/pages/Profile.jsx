import React, { Component } from 'react'
import Header from '../Header';
import { Container, Row, Col } from "react-bootstrap";
import Dashboard from "../Dashboard";
import ProfilePanel from "../panels/ProfilePanel"

class Profile extends Component {

    render() {
        return (
            <React.Fragment>
                <Header />
                <Container className="mainpage" fluid style={{ margin: 0, padding: 0 }}>
                    <Row noGutters>
                        <Col xs={2}>
                            <Dashboard />
                        </Col>
                        <Col xs={10}>
                            <ProfilePanel />
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        )
    }


}

export default Profile;