import React, { Component } from "react";
import { Button } from "react-bootstrap";

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
  render() {
    return (
      <>
       <div className="track-item gradient-border">
       <button className="offset play-track-btn"><i class="fas fa-play"></i></button>
        <span>Aikko</span>
        <span>-</span>
        <span>Name of The Track (Prod. by composer)</span>
        <img className="track-cover" src="http://localhost:3030/covers/581164__NOW%20EASY%20FT.%20AIKKO_RIPLOVE.png" alt=""/>
       </div>
      </>
    );
  }
}

export default Track;
