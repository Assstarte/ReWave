import React, { Component } from "react";

import { Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";
import LoginGreeting from "./view/LoginGreeting";
import { connect } from "react-redux";

class Header extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">ReWave</Navbar.Brand>

          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/playlists">Playlists</Nav.Link>
            <Nav.Link href="/dash">Tracks</Nav.Link>
          </Nav>
          {this.props.loggedIn
            ?
            <div></div>
            :
            <Nav className="ml-auto">
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/register">Create Account</Nav.Link>
            </Nav>}

          <Form inline>
            <LoginGreeting />
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-info">Search</Button>
          </Form>
        </Navbar>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn,
  user_id: state.auth.user_id,
  user_name: state.auth.user_name
});


export default connect(
  mapStateToProps,
  {}
)(Header);
