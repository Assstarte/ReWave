import React, { Component } from "react";
import ReactAudioPlayer from "react-audio-player";
import Track from "./Track";

class Player extends Component {
  constructor(props) {
    super(props);
    this.player = React.createRef();
  }

  render() {
    return (
      <>
        <div className="player-info">
          <img
            src="http://localhost:3030/covers/376062__NOW%20EASY%20FT.%20AIKKO_RIPLOVE.png"
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
          src="http://localhost:3030/1ba347c346f16a512e239d8b80259191"
          autoPlay
          controls
          ref={element => {
            this.player = element;
          }}
        />
      </>
    );
  }
}

export default Player;
