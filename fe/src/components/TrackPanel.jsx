import React, { Component } from "react";
import ReactAudioPlayer from "react-audio-player";
import Track from "./Track";
import {REQUEST_ALL_UPLOADED_TRACKS} from "../rdx/actions/types";
import {connect} from "react-redux";

class TrackPanel extends Component {
  constructor(props) {
    super(props);
    this.player = React.createRef();
  }

  componentDidMount(){
    this.props.dispatch({type: REQUEST_ALL_UPLOADED_TRACKS});
  }

  render() {
    return (
      <>
        <div className="dash-panel">
          {this.props.tracks.map(track => (
            <Track data={track} />
          ))}
        </div>
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