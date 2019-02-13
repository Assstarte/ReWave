import React, { Component } from "react";

import { Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";
import LoginGreeting from "./view/LoginGreeting";

class Header extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">ReWave</Navbar.Brand>

          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Playlists</Nav.Link>
            <Nav.Link href="#pricing">Tracks</Nav.Link>
          </Nav>
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

export default Header;
