import React, { Component } from "react";
import ReactAudioPlayer from "react-audio-player";
import Track from "./Track";
import { PURE_BACKEND_HOST } from "../constants";
import { connect } from "react-redux";
import { STOP_PLAYER, PLAY_PLAYER, INIT_QUEUE, SET_PLAYER_TRACK_PLAYBACK } from "../rdx/actions/types";

class Player extends Component {
  constructor(props) {
    super(props);
    this.player = React.createRef();

    this.state = {
      isSeeking: false,
      currentTrackInternalID: 0
    }

    //Bind
    this.handlePause.bind(this);
    this.handlePlay.bind(this);
    this.handleSeek.bind(this);
    this.handleEndSeek.bind(this);
  }

  componentDidMount() {
    console.dir(this.player.audioEl);
    this.player.audioEl.onpause = () => this.handlePause();
    this.player.audioEl.onplay = () => this.handlePlay();
    this.player.audioEl.onseeking = () => this.handleSeek();
    this.player.audioEl.onseeked = () => this.handleEndSeek();
    this.player.audioEl.onended = () => this.handleEnd();

    //SET AUTO QUEUE
    this.props.dispatch({
      type: INIT_QUEUE,
      payload: {
        tracksArray: this.props.tracks,
        currentId: 0
      }
    })

  }

  componentDidUpdate() {
    //If player is seeking through track - do nothing, cause it can cause infinite loops breakdown
    if (!this.state.isSeeking) {
      try {
        this.props.isPlaying && this.props.currentTrackId && !this.props.isPaused ? this.player.audioEl.play() : this.player.audioEl.pause();
      } catch (e) {
        console.error(e.message);
      }
    }

  }

  render() {
    return (
      <>
        <div className="player-info">
          <img
            src={`${PURE_BACKEND_HOST}covers/${this.props.currentTrackCover}`}
            alt=""
            style={{
              width: `105px`,
              height: `105px`,
              display: `inline`,
              position: `absolute`,
              bottom: 40
            }}
          />
        </div>
        <ReactAudioPlayer
          className="player"
          src={`${this.props.currentTrackPlayback}`}
          controls
          ref={element => {
            this.player = element;
          }}
        />
      </>
    );
  }

  handlePause() {
    //Additional check to avoid infinite loops w/ high requests
    if (this.props.isPlaying && !this.props.isPaused) this.props.dispatch({
      type: STOP_PLAYER
    })
  }

  handlePlay() {
    //Additional check to avoid infinite loops w/ high requests
    if (!this.props.isPlaying) this.props.dispatch({
      type: PLAY_PLAYER
    });

    //Obtain internal ID (in internal array) to reference next track items in queue
    let internalId = 0;
    for(const [i, item] of this.props.tracks.entries()) {
      if(item.id === this.props.currentTrackId) {
        internalId = i;
        break;
      }
    }

    this.setState({
      currentTrackInternalID: internalId
    })
  }

  handleSeek() {
    //This is handled to avoid infinite loops w/ high requests as well
    this.setState({
      isSeeking: true
    })
  }

  async handleEndSeek() {
    await this.setState({
      isSeeking: false
    })
    this.handlePlay();
  }

  handleEnd() {
    this.setState({
      currentTrackInternalID: this.state.currentTrackInternalID + 1
    })

    //Check if the next track actually exists
    if(this.state.currentTrackInternalID >= this.props.tracks.length) return false;
    this.props.dispatch({
      type: SET_PLAYER_TRACK_PLAYBACK,
      payload: {
        playback: `${PURE_BACKEND_HOST}/${this.props.tracks[this.state.currentTrackInternalID].file_name}`,
        cover: this.props.tracks[this.state.currentTrackInternalID].cover_name,
        id: this.props.tracks[this.state.currentTrackInternalID].id
      }
    });
  }
}

const mapStateToProps = state => ({
  tracks: state.data.tracks,
  currentTrackPlayback: state.player.currentTrackPlayback,
  currentTrackId: state.player.currentTrackId,
  currentTrackCover: state.player.currentTrackCover,
  isPlaying: state.player.isPlaying,
  isPaused: state.player.isPaused
});

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player);