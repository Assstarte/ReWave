import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { PURE_BACKEND_HOST } from "../constants";
import { SET_PLAYER_TRACK_PLAYBACK, STOP_PLAYER, PLAY_PLAYER } from "../rdx/actions/types";

import {connect} from "react-redux";

/*
============@PROPS=============

IN data:
@title | Self-descriptive
@artist | Self-descriptive
@composer | Self-descriptive
@fileName | The actual file on the server
@tags | ID3 Tags Object
@cover | The actual cover file on the server
@public | Self-descriptive

===============================
*/

class Track extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <>
       <div className="track-item gradient-border">
       <button onClick={(e) => this.playClickHandler(e)} className="offset play-track-btn">{
          this.isThisTrackPlaying() ? <i class="fas fa-pause"></i> : <i class="fas fa-play"></i>
       }</button>
        <span>{this.props.data.artist}</span>
        <span>-</span>
        <span>{this.props.data.title} {this.props.data.composer ? ` (Prod. by ${this.props.data.composer}` : ``}</span>
        <img className="track-cover" src={`${PURE_BACKEND_HOST}/covers/${this.props.data.cover_name}` } alt=""/>
       </div>
      </>
    );
  }

  playClickHandler(e){
    if(!this.isThisTrackPlaying()){
      //Check if curr track is *not* set to the player. If not ---> SET
        this.props.dispatch({
          type: SET_PLAYER_TRACK_PLAYBACK,
          payload: {
            playback: `${PURE_BACKEND_HOST}/${this.props.data.file_name}`,
            cover: this.props.data.cover_name,
            id: this.props.data.id
          }
        });
      } 
      else{
        this.props.dispatch({
          type: STOP_PLAYER
        })
      }
      
    
  }

  isThisTrackPlaying(){
    return (this.props.isPlaying && this.isThisTrackSet());
  }

  isThisTrackSet(){
    return this.props.currentTrackId === this.props.data.id;
  }
}

const mapStateToProps = state => ({
  currentTrackPlayBack: state.player.currentTrackPlayBack,
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
)(Track);