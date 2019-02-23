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
          src="http://localhost:3030/05225cb34524fc29c83d85782ca1e4d8"
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
