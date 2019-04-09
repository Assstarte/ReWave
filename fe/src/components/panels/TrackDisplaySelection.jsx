import React, { Component } from "react";

import { connect } from "react-redux";

class TrackDisplaySelection extends Component {
  render() {
    return (
      <div className="tracks-selector tc pv2 mv2 d-flex">
        <button class="f6 dim ba ph3 pv2 mb2 dib black" href="#0">Button Text</button>
        <button class="f6 dim ba ph3 pv2 mb2 dib black" href="#0">Button Text</button>
        <button class="f6 dim ba ph3 pv2 mb2 dib black" href="#0">Button Text</button>
        <button class="f6 dim ba ph3 pv2 mb2 dib black" href="#0">Button Text</button>
        <button class="f6 dim ba ph3 pv2 mb2 dib black" href="#0">Button Text</button>
        <button class="f6 dim ba ph3 pv2 mb2 dib black" href="#0">Button Text</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn,
  user_id: state.auth.user_id,
  user_name: state.auth.user_name,

});


export default connect(
  mapStateToProps,
  {}
)(TrackDisplaySelection);
