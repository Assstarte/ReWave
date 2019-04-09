import React, { Component } from "react";
import ReactAudioPlayer from "react-audio-player";
import Track from "./Track";
import { REQUEST_ALL_UPLOADED_TRACKS } from "../rdx/actions/types";
import { connect } from "react-redux";
import AlertSuccessForwardTo from "./bootstrap/AlertSuccessForwardTo";

class TrackPanel extends Component {
  constructor(props) {
    super(props);
    this.player = React.createRef();
  }

  componentDidMount() {
    this.props.dispatch({ type: REQUEST_ALL_UPLOADED_TRACKS });
  }

  render() {
    return (
      <>
        {this.props.tracks.length
          ?
          <div className="dash-panel">
            {this.props.tracks.map(track => (
              <Track data={track} />
            ))}
          </div>
          :
          <AlertSuccessForwardTo
            type="warning"
            heading="Looks like there is no content!"
            message="Why not upload a few tracks to begin with?"
            btnText="Sure! >"
            redirect
            path="/upload"
            display={this.props.tracks.length === 0}
            history={this.props.history}
          />


        }

      </>
    );
  }
}

const mapStateToProps = state => ({
  tracks: state.data.tracks,
  currentTrackPlayBack: state.player.currentTrackPlayBack
});

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrackPanel);