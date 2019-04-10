import React, { Component } from "react";

import { Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";
import LoginGreeting from "./view/LoginGreeting";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { AC_INIT_SEARCH } from "../rdx/actions"

class Header extends Component {

  constructor(props) {
    super(props);
    this.searchRef = React.createRef();
  }

  render() {
    return (
      <React.Fragment>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">ReWave</Navbar.Brand>

          <Nav className="mr-auto">

            <Nav.Link>
              <Link to="/">
                Home
                </Link>
            </Nav.Link>

            <Nav.Link>
              <Link to="/dash">Tracks
              </Link>
            </Nav.Link>

            <Nav.Link>
              <Link to="/playlists">
                Playlists
              </Link>
            </Nav.Link>

          </Nav>
          {this.props.loggedIn
            ?
            <div></div>
            :
            <Nav className="ml-auto">
              <Nav.Link>
                <Link to="/login">
                  <span className="f6 link dim black db" style={{color: "#fff"}}>
                    Login
                  </span>
                </Link>

              </Nav.Link>
              <Nav.Link>
                <Link to="/register">
                  <span className="f6 link dim black db cw" style={{color: "#fff"}}>
                    Create Account
                  </span>
                </Link>
              </Nav.Link>
            </Nav>}

          <Form inline onSubmit={(e) => this.onSearch(e)}>
            <LoginGreeting />
            <FormControl type="text" placeholder="Search" className="mr-sm-2" ref={this.searchRef} />
            <Button type="submit" variant="outline-info">Search</Button>
          </Form>
        </Navbar>
      </React.Fragment>
    );
  }

  onSearch(e) {
    e.preventDefault();
    this.props.dispatch(
      this.props.AC_INIT_SEARCH({
        query: this.searchRef.current.value
      })
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn,
  user_id: state.auth.user_id,
  user_name: state.auth.user_name
});

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    AC_INIT_SEARCH
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
