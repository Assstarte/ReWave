import React, { Component } from "react";
import ReactAudioPlayer from "react-audio-player";
import Track from "./Track";
import { REQUEST_ALL_UPLOADED_TRACKS } from "../rdx/actions/types";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
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
          <div className="tc">
            <Alert dismissible variant="dark">
              <Alert.Heading>No tracks were found ;(</Alert.Heading>
              <p>
                Why not <Link to="/upload"><strong>UPLOAD</strong></Link> some?
            </p>
            </Alert>
          </div>



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