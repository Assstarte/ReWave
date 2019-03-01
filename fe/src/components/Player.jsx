import React, { Component } from "react";
import ReactAudioPlayer from "react-audio-player";
import Track from "./Track";
import { PURE_BACKEND_HOST } from "../constants";
import {connect} from "react-redux";
import { STOP_PLAYER, PLAY_PLAYER } from "../rdx/actions/types";

class Player extends Component {
  constructor(props) {
    super(props);
    this.player = React.createRef();

    this.state = {
      isSeeking: false
    }

    //Bind
    this.handlePause.bind(this);
    this.handlePlay.bind(this);
    this.handleSeek.bind(this);
    this.handleEndSeek.bind(this);
  }

  componentDidMount(){
    console.dir(this.player.audioEl);
    this.player.audioEl.onpause = () => this.handlePause();
    this.player.audioEl.onplay = () => this.handlePlay();
    this.player.audioEl.onseeking = () => this.handleSeek();
    this.player.audioEl.onseeked= () => this.handleEndSeek();
  }

  componentDidUpdate(){
    //If player is seeking through track - do nothing, cause it can cause infinite loops breakdown
    if(!this.state.isSeeking){
      try{
        this.props.isPlaying && this.props.currentTrackId ? this.player.audioEl.play() : this.player.audioEl.pause();
      } catch(e){
        console.error(e.message);
      }
    }
    
    
  }

  render() {
    return (
      <>
        <div className="player-info">
          <img
            src="http://localhost:3030/covers/581164__NOW%20EASY%20FT.%20AIKKO_RIPLOVE.png"
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
          autoPlay
          controls
          ref={element => {
            this.player = element;
          }}
        />
      </>
    );
  }

  handlePause(){
    //Additional check to avoid infinite loops w/ high requests
    if(this.props.isPlaying) this.props.dispatch({
      type: STOP_PLAYER
    })
  }

  handlePlay(){
    //Additional check to avoid infinite loops w/ high requests
    if(!this.props.isPlaying) this.props.dispatch({
      type: PLAY_PLAYER
    });
  }

  handleSeek(){
    //This is handled to avoid infinite loops w/ high requests as well
    this.setState({
      isSeeking: true
    })
  }

  handleEndSeek(){
    this.setState({
      isSeeking: false
    })
  }
}

const mapStateToProps = state => ({
  tracks: state.data.tracks,
  currentTrackPlayback: state.player.currentTrackPlayback,
  currentTrackId: state.player.currentTrackId,
  isPlaying: state.player.isPlaying
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